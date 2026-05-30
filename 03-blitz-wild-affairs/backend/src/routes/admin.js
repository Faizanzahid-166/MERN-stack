// routes/admin.js
// Admin-only routes for user management.
import { Router } from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import supabase from '../database/supabase.js';

const router = Router();

// Apply auth guards to all admin routes
router.use(protect, adminOnly);

// ── GET all users ──────────────────────────────────────────────
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('02_users')
      .select('id, name, email, avatar, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, users: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── UPDATE user role ───────────────────────────────────────────
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "admin" or "user".' });
    }

    // Prevent demoting yourself
    if (id === req.user.id && role !== 'admin') {
      return res.status(400).json({ message: 'You cannot demote yourself.' });
    }

    const { data, error } = await supabase
      .from('02_users')
      .update({ role })
      .eq('id', id)
      .select('id, name, email, role')
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE user ────────────────────────────────────────────────
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }

    const { error } = await supabase.from('02_users').delete().eq('id', id);
    if (error) throw error;

    res.json({ success: true, message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
