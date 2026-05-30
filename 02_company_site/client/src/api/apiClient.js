// src/api/apiClient.js
// ✅ Replaced import.meta.env.MODE  →  process.env.NODE_ENV
// ✅ Replaced import.meta.env.VITE_* via apiConfig  →  process.env.NEXT_PUBLIC_*

import axios from 'axios';
import apiConfig from './apiConfig.js';

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? apiConfig.nodeURL
      : apiConfig.backendURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
