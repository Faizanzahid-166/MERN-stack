// src/api/Client.js
// Fixed: wrapped window.location access in typeof window check for SSR safety.
// process.env.NODE_ENV is already correct for Next.js (no import.meta.env).
import axios from 'axios';
import ENV from '@/api/ENV';

const isDev = process.env.NODE_ENV === 'development';

const Client = axios.create({
  baseURL: isDev ? ENV.nodeURL : ENV.backendURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

Client.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || '';
    const isSafeRoute =
      url.includes('/auth/me') ||
      url.includes('/admin/')  ||
      url.includes('/health');

    if (
      err.response?.status === 401 &&
      !isSafeRoute &&
      typeof window !== 'undefined' &&           // ← SSR guard
      !window.location.pathname.startsWith('/login')
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default Client;
