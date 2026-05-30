// src/api/contactApi.js
// ✅ No changes needed — already clean, uses apiClient which is now fixed.

import apiClient from './apiClient.js';

export const sendContactForm = async (data) => {
  try {
    const res = await apiClient.post('/api/contacts', data);

    return {
      success: res.data?.success || false,
      msg:     res.data?.msg    || 'Something happened',
    };
  } catch (error) {
    console.error('sendContactForm error:', error.response?.data || error.message);

    return {
      success: false,
      msg: error.response?.data?.msg || '❌ Failed to send message',
    };
  }
};
