// src/lib/cookie.js

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setTokenCookie = (res, token) => {
  res.cookie('token', token, cookieOptions);
};

export const clearTokenCookie = (res) => {
  res.clearCookie('token', {
    path: '/',
  });
};