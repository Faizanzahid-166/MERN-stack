// src/lib/auth.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setTokenCookie, clearTokenCookie } from './cookie.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in .env');
}

/* ───────────────── PASSWORD ───────────────── */

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

/* ───────────────── JWT ───────────────── */

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('JWT verify error:', err.message);
    return null;
  }
};6

/* ───────────────── RESPONSE ───────────────── */

export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user);

  setTokenCookie(res, token);

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    created_at: user.created_at,
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: safeUser,
  });
};

export const logoutUser = (res) => {
  clearTokenCookie(res)

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};