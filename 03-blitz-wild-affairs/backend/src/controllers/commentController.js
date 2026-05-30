// controllers/commentController.js
import supabase from '../database/supabase.js';

// ── GET COMMENTS FOR A BLOG ───────────────────────────────────
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const { data, error } = await supabase
      .from('02_comments')
      .select('id, comment, created_at, user:02_users(id, name, avatar)')
      .eq('blog_id', blogId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, comments: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── ADD COMMENT ────────────────────────────────────────────────
export const addComment = async (req, res) => {
  try {
    const { blogId, comment } = req.body;
    if (!blogId || !comment?.trim())
      return res.status(400).json({ message: 'Blog ID and comment are required.' });

    const { data, error } = await supabase
      .from('02_comments')
      .insert({ blog_id: blogId, user_id: req.user.id, comment: comment.trim() })
      .select('id, comment, created_at, user:02_users(id, name, avatar)')
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, comment: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE COMMENT ─────────────────────────────────────────────
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Only the comment author or an admin can delete
    const { data: existing } = await supabase
      .from('02_comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing) return res.status(404).json({ message: 'Comment not found.' });

    if (existing.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorised.' });
    }

    const { error } = await supabase.from('02_comments').delete().eq('id', id);
    if (error) throw error;

    res.json({ success: true, message: 'Comment deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
