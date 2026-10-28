// backend/src/utils/encryption.js
//
// AES-256-GCM encrypt/decrypt for secrets we persist in Supabase:
// Google Calendar refresh tokens, Gmail refresh tokens, ElevenLabs API key.
//
// v2: adds key versioning so ENCRYPTION_KEY can be rotated without a
// big-bang re-encryption migration. New writes always use the "current"
// key version; decryption looks up whichever version the ciphertext says
// it was encrypted under, so old data keeps working after rotation.
//
// ─── Setup ───────────────────────────────────────────────────────────────
// ENCRYPTION_KEYS       JSON map of version -> base64 32-byte key, e.g.
//                       '{"1":"<base64>","2":"<base64>"}'
// ENCRYPTION_KEY_VERSION which version new encryptions should use, e.g. "2"
//
// Generate a new key with:
//   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
//
// ─── Rotating a key ─────────────────────────────────────────────────────
// 1. Generate a new key, add it to ENCRYPTION_KEYS under the next version
//    number (don't remove the old one).
// 2. Bump ENCRYPTION_KEY_VERSION to the new version number.
// 3. Deploy. New writes use the new key immediately; existing rows still
//    decrypt fine using their original key version.
// 4. (Optional) Run a background job that reads + re-encrypts old rows to
//    migrate them onto the new key, then remove the old key once nothing
//    references it anymore.
//
// ─── Backward compatibility ─────────────────────────────────────────────
// If ENCRYPTION_KEYS/ENCRYPTION_KEY_VERSION aren't set, this falls back to
// the legacy single ENCRYPTION_KEY env var, treated as version "1" — so
// nothing already encrypted under the original (pre-versioning) format
// breaks.

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // recommended for GCM
const LEGACY_VERSION = '1';

let cachedKeyring = null;
let cachedCurrentVersion = null;

const decodeKey = (base64Key, versionLabel) => {
  const key = Buffer.from(base64Key, 'base64');

  if (key.length !== 32) {
    throw new Error(
      `Encryption key for version "${versionLabel}" must decode to exactly ` +
      `32 bytes, got ${key.length}. Generate one with: ` +
      `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
    );
  }

  return key;
};

/**
 * Builds { keyring: Map<version, Buffer>, currentVersion: string }
 * from env vars, with legacy single-key fallback. Cached after first call.
 */
const loadKeyConfig = () => {
  if (cachedKeyring) {
    return { keyring: cachedKeyring, currentVersion: cachedCurrentVersion };
  }

  const keyring = new Map();

  if (process.env.ENCRYPTION_KEYS) {
    let parsed;
    try {
      parsed = JSON.parse(process.env.ENCRYPTION_KEYS);
    } catch {
      throw new Error('ENCRYPTION_KEYS is not valid JSON. Expected e.g. \'{"1":"<base64>"}\'');
    }

    for (const [version, base64Key] of Object.entries(parsed)) {
      keyring.set(String(version), decodeKey(base64Key, version));
    }

    cachedCurrentVersion = process.env.ENCRYPTION_KEY_VERSION;
    if (!cachedCurrentVersion) {
      throw new Error(
        'ENCRYPTION_KEY_VERSION must be set (which key version new writes should use) ' +
        'when ENCRYPTION_KEYS is configured.'
      );
    }
    if (!keyring.has(cachedCurrentVersion)) {
      throw new Error(
        `ENCRYPTION_KEY_VERSION="${cachedCurrentVersion}" has no matching entry in ENCRYPTION_KEYS.`
      );
    }
  } else if (process.env.ENCRYPTION_KEY) {
    // Legacy single-key mode — treated as version "1".
    keyring.set(LEGACY_VERSION, decodeKey(process.env.ENCRYPTION_KEY, LEGACY_VERSION));
    cachedCurrentVersion = LEGACY_VERSION;
  } else {
    throw new Error(
      'No encryption key configured. Set either ENCRYPTION_KEYS + ' +
      'ENCRYPTION_KEY_VERSION (recommended, supports rotation), or the ' +
      'legacy single ENCRYPTION_KEY.'
    );
  }

  cachedKeyring = keyring;
  return { keyring: cachedKeyring, currentVersion: cachedCurrentVersion };
};

/**
 * Encrypts a plaintext string (e.g. an OAuth refresh token) for storage.
 * Always encrypts under the "current" key version.
 * @param {string} plaintext
 * @returns {string} "v<version>:<ivBase64>:<authTagBase64>:<ciphertextBase64>"
 */
export const encrypt = (plaintext) => {
  if (plaintext === null || plaintext === undefined) return null;

  const { keyring, currentVersion } = loadKeyConfig();
  const key = keyring.get(currentVersion);

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const ciphertext = Buffer.concat([
    cipher.update(String(plaintext), 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    `v${currentVersion}`,
    iv.toString('base64'),
    authTag.toString('base64'),
    ciphertext.toString('base64'),
  ].join(':');
};

/**
 * Decrypts a string produced by encrypt() — or by the pre-versioning
 * legacy format ("iv:authTag:ciphertext", implicitly version 1).
 * @param {string} payload
 * @returns {string} plaintext
 */
export const decrypt = (payload) => {
  if (payload === null || payload === undefined) return null;

  const { keyring } = loadKeyConfig();
  const parts = String(payload).split(':');

  let version, ivB64, authTagB64, ciphertextB64;

  if (parts.length === 4) {
    // versioned format: v<version>:iv:authTag:ciphertext
    const versionTag = parts[0];
    if (!versionTag.startsWith('v')) {
      throw new Error(`Malformed encrypted payload — unexpected version tag "${versionTag}"`);
    }
    version = versionTag.slice(1);
    [, ivB64, authTagB64, ciphertextB64] = parts;
  } else if (parts.length === 3) {
    // legacy unversioned format, implicitly version 1
    version = LEGACY_VERSION;
    [ivB64, authTagB64, ciphertextB64] = parts;
  } else {
    throw new Error('Malformed encrypted payload — expected "v<version>:iv:authTag:ciphertext"');
  }

  const key = keyring.get(version);
  if (!key) {
    throw new Error(
      `No encryption key available for version "${version}". This value was ` +
      `encrypted with a key that is no longer configured in ENCRYPTION_KEYS — ` +
      `add it back (even as a rotated-out old key) to decrypt this value.`
    );
  }

  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(authTagB64, 'base64');
  const ciphertext = Buffer.from(ciphertextB64, 'base64');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return plaintext.toString('utf8');
};

// Exposed for tests / ops tooling only — not used in normal request flow.
export const _resetKeyCacheForTests = () => {
  cachedKeyring = null;
  cachedCurrentVersion = null;
};