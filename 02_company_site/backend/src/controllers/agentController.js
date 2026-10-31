import { createConversationToken, getOrCreateAgent, getAgentStatus } from '../services/elevenlabsService.js';

const parseAgentError = (err) => {
  const status = err?.statusCode || err?.status || 500;
  const code = err?.code || 'ELEVENLABS_REQUEST_FAILED';
  const message = err?.message || 'ElevenLabs is unavailable.';

  if (code === 'ELEVENLABS_API_KEY_MISSING') {
    return {
      status: 500,
      payload: {
        success: false,
        code,
        error: 'ELEVENLABS_API_KEY is missing from the backend environment.',
      },
    };
  }

  if (code === 'ELEVENLABS_AUTH_FAILED') {
    return {
      status: 401,
      payload: {
        success: false,
        code,
        error: 'The ElevenLabs API key is invalid or missing the required ElevenAgents Write permission.',
      },
    };
  }

  if (code === 'ELEVENLABS_RATE_LIMITED') {
    return {
      status: 429,
      payload: {
        success: false,
        code,
        error: 'ElevenLabs is rate limiting requests. Please try again in a moment.',
      },
    };
  }

  if (code === 'ELEVENLABS_AGENT_NOT_CONFIGURED') {
    return {
      status: 503,
      payload: {
        success: false,
        code,
        error: 'No ElevenLabs agent is configured yet. Set ELEVENLABS_AGENT_ID or enable agent creation.',
      },
    };
  }

  if (code === 'ELEVENLABS_AGENT_ID_INVALID') {
    return {
      status: 400,
      payload: {
        success: false,
        code,
        error: 'The configured ElevenLabs agent ID is invalid. Use a real agent ID like agent_..., not an API key.',
      },
    };
  }

  return {
    status,
    payload: {
      success: false,
      code,
      error: message,
    },
  };
};

export const getAgentConfig = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      ...getAgentStatus(),
    });
  } catch (err) {
    const { status, payload } = parseAgentError(err);
    res.status(status).json(payload);
  }
};

export const createOrGetAgent = async (req, res) => {
  try {
    const result = await getOrCreateAgent();
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    const { status, payload } = parseAgentError(err);
    console.error('Failed to create/get ElevenLabs agent:', {
      code: payload.code,
      message: payload.error,
      status,
    });
    res.status(status).json(payload);
  }
};

export const getConversationToken = async (req, res) => {
  try {
    const { agentId, participantName } = req.body || {};
    const result = await createConversationToken({ agentId, participantName });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    const { status, payload } = parseAgentError(err);
    console.error('Failed to generate ElevenLabs conversation token:', {
      code: payload.code,
      message: payload.error,
      status,
    });
    res.status(status).json(payload);
  }
};
