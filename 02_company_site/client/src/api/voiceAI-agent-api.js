import apiClient from './apiClient.js';

export const getAgentStatus = async () => {
  try {
    const response = await apiClient.get('/api/agent/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching ElevenLabs agent status:', error);
    throw error;
  }
};

export const createOrGetAgent = async () => {
  try {
    const response = await apiClient.post('/api/agent');
    return response.data;
  } catch (error) {
    console.error('Error creating or getting AI agent:', error);
    throw error;
  }
};

export const createConversationSession = async ({ participantName = 'Website Visitor', agentId } = {}) => {
  try {
    const response = await apiClient.post('/api/agent/session', {
      participantName,
      ...(agentId ? { agentId } : {}),
    });

    return response.data;
  } catch (error) {
    console.error('Error creating ElevenLabs conversation token:', error);
    throw error;
  }
};