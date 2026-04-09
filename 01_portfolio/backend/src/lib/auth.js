// src/lib/auth.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setTokenCookie, clearTokenCookie } from "./cookie.js";

// -------------------- JWT config --------------------
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const JWT_SECRET = process.env.JWT_SECRET;

// console.log("JWT_EXPIRES_IN:", JWT_EXPIRES_IN);
// console.log("JWT_SECRET loaded:", Boolean(JWT_SECRET));

// console.log("JWT_EXPIRES_IN:", JWT_EXPIRES_IN);
// console.log("JWT_SECRET loaded:", Boolean(JWT_SECRET));

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not set in environment variables");
}

// -------------------- Password hashing --------------------
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// -------------------- JWT --------------------
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: "HS256",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}

// -------------------- Cookie helpers --------------------
export function getAuthCookieHeader(token) {
  return setTokenCookie(token);
}

export function clearAuthCookieHeader() {
  return clearTokenCookie();
}
