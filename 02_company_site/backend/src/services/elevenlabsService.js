import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const AGENT_NAME = 'Blitz AI — Your Digital Solutions Assistant';
const SYSTEM_PROMPT =
  'You are Blitz AI, the voice assistant for Blitz Tech Hub. ' +
  'Speak warmly, professionally, and naturally in short spoken answers. ' +
  'Explain our services clearly in plain language, ask a focused follow-up question only when useful, ' +
  'help visitors choose the right service, and guide them to the website contact form or quote request when they are ready. ' +
  'Never invent company information, prices, guarantees, or completed projects.';
const FIRST_MESSAGE = "Hi! I'm Blitz AI, your digital solutions assistant. I can help you explore our services, plan your next project, and connect you with the team.";

const elevenlabs = process.env.ELEVENLABS_API_KEY
  ? new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })
  : null;

const isValidAgentId = (value) => typeof value === 'string' && /^agent_[A-Za-z0-9]+$/.test(value.trim());

const getConfiguredAgentId = () => {
  const value = process.env.ELEVENLABS_AGENT_ID?.trim();

  if (!value) {
    return null;
  }

  if (!isValidAgentId(value)) {
    console.warn('Ignoring invalid ELEVENLABS_AGENT_ID. Expected a real ElevenLabs agent ID like agent_..., not an API key.');
    return null;
  }

  return value;
};

let cachedAgent = getConfiguredAgentId()
  ? { agentId: getConfiguredAgentId(), name: AGENT_NAME }
  : null;

let createAgentPromise = null;

const buildError = (message, { code, statusCode = 500, details = null } = {}) => {
  const error = new Error(message);
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

const getPermissionMessage = (detail = '') => {
  const normalized = typeof detail === 'string' ? detail : detail?.message || '';
  if (normalized.toLowerCase().includes('convai_write') || normalized.toLowerCase().includes('permission')) {
    return 'The ElevenLabs API key is missing the required ElevenAgents Write permission for agent creation.';
  }

  if (normalized.toLowerCase().includes('invalid api key') || normalized.toLowerCase().includes('unauthorized')) {
    return 'The ElevenLabs API key is missing or invalid. Check ELEVENLABS_API_KEY in the backend environment.';
  }

  return 'ElevenLabs rejected the request. Check the API key permissions and agent configuration.';
};

const normalizeElevenLabsError = (err) => {
  const rawDetail = err?.body?.detail || err?.response?.body?.detail || err?.detail || null;
  const message = rawDetail?.message || err?.message || 'ElevenLabs request failed';
  const statusCode = err?.statusCode || err?.status || err?.response?.status || 500;
  const code = rawDetail?.code || err?.code || 'ELEVENLABS_REQUEST_FAILED';

  if (statusCode === 401 || code === 'unauthorized') {
    return buildError(getPermissionMessage(rawDetail), {
      code: 'ELEVENLABS_AUTH_FAILED',
      statusCode: 401,
      details: { rawDetail, statusCode },
    });
  }

  if (statusCode === 429) {
    return buildError('ElevenLabs rate limited this request. Please retry in a moment.', {
      code: 'ELEVENLABS_RATE_LIMITED',
      statusCode: 429,
      details: { rawDetail, statusCode },
    });
  }

  if (statusCode >= 500) {
    return buildError('ElevenLabs is temporarily unavailable. Please try again later.', {
      code: 'ELEVENLABS_UPSTREAM_ERROR',
      statusCode: 502,
      details: { rawDetail, statusCode },
    });
  }

  return buildError(message, { code, statusCode, details: { rawDetail, statusCode } });
};

export const assertElevenLabsConfigured = () => {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw buildError('Missing ELEVENLABS_API_KEY in the backend environment.', {
      code: 'ELEVENLABS_API_KEY_MISSING',
      statusCode: 500,
    });
  }

  return true;
};

export const getAgentStatus = () => ({
  apiKeyConfigured: Boolean(process.env.ELEVENLABS_API_KEY),
  agentIdConfigured: Boolean(getConfiguredAgentId()),
  agentId: cachedAgent?.agentId || getConfiguredAgentId() || null,
  agentName: AGENT_NAME,
});

async function createAgentOnce() {
  if (!elevenlabs) {
    throw buildError('ElevenLabs client is not configured.', {
      code: 'ELEVENLABS_API_KEY_MISSING',
      statusCode: 500,
    });
  }

  const existingAgents = await elevenlabs.conversationalAi.agents.list({ pageSize: 50 });
  const existingMatch = existingAgents?.agents?.find((agent) => agent.name === AGENT_NAME);

  if (existingMatch?.agentId) {
    cachedAgent = { agentId: existingMatch.agentId, name: AGENT_NAME };
    return { ...cachedAgent, source: 'existing', cached: true };
  }

  const created = await elevenlabs.conversationalAi.agents.create({
    name: AGENT_NAME,
    conversationConfig: {
      agent: {
        prompt: {
          prompt: SYSTEM_PROMPT,
        },
        firstMessage: FIRST_MESSAGE,
      },
    },
  });

  cachedAgent = { agentId: created.agentId, name: AGENT_NAME };
  return { ...cachedAgent, source: 'created', cached: false };
}

export const getOrCreateAgent = async () => {
  assertElevenLabsConfigured();

  const configuredAgentId = getConfiguredAgentId();

  if (configuredAgentId) {
    cachedAgent = { agentId: configuredAgentId, name: AGENT_NAME };
    return { ...cachedAgent, source: 'configured', cached: true };
  }

  if (cachedAgent) {
    return { ...cachedAgent, source: 'cached', cached: true };
  }

  if (createAgentPromise) {
    return createAgentPromise;
  }

  createAgentPromise = (async () => {
    try {
      return await createAgentOnce();
    } catch (error) {
      const normalized = normalizeElevenLabsError(error);
      console.error('ElevenLabs agent creation failed:', {
        code: normalized.code,
        statusCode: normalized.statusCode,
        message: normalized.message,
      });
      throw normalized;
    }
  })();

  try {
    return await createAgentPromise;
  } finally {
    createAgentPromise = null;
  }
};

export const createConversationToken = async ({ agentId, participantName = 'Blitz visitor' } = {}) => {
  assertElevenLabsConfigured();

  const rawAgentId = agentId || getConfiguredAgentId() || cachedAgent?.agentId;

  if (rawAgentId && !isValidAgentId(rawAgentId)) {
    throw buildError('The provided ElevenLabs agent ID is invalid. Use a real agent ID like agent_..., not an API key.', {
      code: 'ELEVENLABS_AGENT_ID_INVALID',
      statusCode: 400,
    });
  }

  const activeAgentId = rawAgentId;

  if (!activeAgentId) {
    throw buildError('No ElevenLabs agent ID is configured. Set ELEVENLABS_AGENT_ID or create the agent via the backend.', {
      code: 'ELEVENLABS_AGENT_NOT_CONFIGURED',
      statusCode: 503,
    });
  }

  try {
    const result = await elevenlabs.conversationalAi.conversations.getWebrtcToken({
      agentId: activeAgentId,
      participantName,
    });

    return {
      token: result?.token,
      conversationId: result?.conversationId,
      agentId: activeAgentId,
    };
  } catch (error) {
    const normalized = normalizeElevenLabsError(error);
    console.error('ElevenLabs token request failed:', {
      code: normalized.code,
      statusCode: normalized.statusCode,
      message: normalized.message,
      agentId: activeAgentId,
    });
    throw normalized;
  }
};

export const initializeAgent = async () => {
  try {
    const configuredAgentId = getConfiguredAgentId();

    if (configuredAgentId) {
      cachedAgent = { agentId: configuredAgentId, name: AGENT_NAME };
      return { ...cachedAgent, source: 'configured', cached: true };
    }

    return await getOrCreateAgent();
  } catch (error) {
    console.warn('ElevenLabs initialization skipped:', error.message);
    return {
      success: false,
      error: error.message,
      code: error.code || 'ELEVENLABS_INITIALIZATION_FAILED',
      source: 'unavailable',
    };
  }
};
