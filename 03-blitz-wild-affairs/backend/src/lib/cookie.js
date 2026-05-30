// src/lib/cookie.js

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const setTokenCookie = (res, token) => {
  res.cookie('token', token, cookieOptions);
};

export const clearTokenCookie = (res) => {
  res.clearCookie('token', {
    path: '/',
  });
};