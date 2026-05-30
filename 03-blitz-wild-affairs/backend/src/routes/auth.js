// routes/auth.js
import { Router } from 'express';
import { upload, uploadToSupabase } from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';
import supabase from '../database/supabase.js';
import bcrypt from 'bcryptjs';
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

// ── Public ─────────────────────────────────────────────────────
router.post('/register', upload.single('avatar'), register);
router.post('/login',    login);
router.post('/logout',   logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',  resetPassword);

// ── Authenticated ───────────────────────────────────────────────
router.get('/me', protect, getMe);

// ── Update profile (name / avatar) ────────────────────────────
router.put('/profile', protect, upload.single('avatar'), async (req, res) => {
  try {
    const { name } = req.body;
    const updates = {};

    if (name?.trim()) updates.name = name.trim();

    if (req.file) {
      const { url } = await uploadToSupabase(req.file, 'avatars');
      updates.avatar = url;
    }

    if (!Object.keys(updates).length)
      return res.status(400).json({ message: 'Nothing to update.' });

    const { data, error } = await supabase
      .from('02_users')
      .update(updates)
      .eq('id', req.user.id)
      .select('id, name, email, avatar, role, created_at')
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Change password ───────────────────────────────────────────
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields are required.' });

    const { data: user, error } = await supabase
      .from('02_users').select('password').eq('id', req.user.id).single();

    if (error || !user) return res.status(404).json({ message: 'User not found.' });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(401).json({ message: 'Current password is incorrect.' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await supabase.from('02_users').update({ password: hashed }).eq('id', req.user.id);

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Get my bookmarks ─────────────────────────────────────────
router.get('/bookmarks', protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('02_bookmarks')
      .select(`blog:02_blogs(id, title, slug, excerpt, cover_image, category, created_at, author:02_users(name, avatar))`)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, bookmarks: data.map((b) => b.blog).filter(Boolean) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
