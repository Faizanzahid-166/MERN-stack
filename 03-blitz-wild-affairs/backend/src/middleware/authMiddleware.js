// src/middleware/authMiddleware.js

import supabase from '../database/supabase.js';
import { getUserFromCookies } from '../lib/getUserFromCookies.js';

/* ───────────────── PROTECT ───────────────── */

export const protect = async (req, res, next) => {
  try {
    const decoded = await getUserFromCookies(req);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      });
    }

    // fetch fresh user from DB
    const { data: user, error } = await supabase
      .from('02_users')
      .select('id, name, email, role, avatar, created_at')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Protect middleware error:', err.message);

    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

/* ───────────────── ADMIN ───────────────── */

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required.',
    });
  }

  next();
};