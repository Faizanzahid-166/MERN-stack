// src/lib/getUserFromCookies.js

import { verifyToken } from './auth.js';

export const getUserFromCookies = async (req) => {
  try {
    let token = req.cookies?.token;

    // Bearer token fallback
    if (!token) {
      const authHeader = req.headers.authorization;

      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) return null;

    const decoded = verifyToken(token);

    if (!decoded?.id) return null;

    return decoded;
  } catch (err) {
    console.error('getUserFromCookies error:', err.message);
    return null;
  }
};