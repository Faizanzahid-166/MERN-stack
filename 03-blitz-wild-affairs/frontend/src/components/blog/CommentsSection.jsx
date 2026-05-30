// src/components/blog/CommentsSection.jsx
// Self-contained comments section: list + add + delete.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { commentAPI } from '../../api/APIs.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import { timeAgo } from '../../utils/helpers.js';

export default function CommentsSection({ blogId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;
    commentAPI
      .get(blogId)
      .then(({ data }) => setComments(data.comments))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await commentAPI.add({ blogId, comment: text.trim() });
      setComments((prev) => [data.comment, ...prev]);
      setText('');
      toast.success('Comment posted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await commentAPI.delete(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success('Comment deleted');
    } catch {
      toast.error('Could not delete comment');
    }
  };

  return (
    <section className="mt-16">
      <h3 className="font-display font-bold text-2xl mb-8">
        Comments{' '}
        <span className="text-gray-400 font-sans text-lg font-normal">({comments.length})</span>
      </h3>

      {/* Composer */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
          <Avatar src={user.avatar} name={user.name} size="sm" className="flex-shrink-0 mt-1" />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment…"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500
                text-sm resize-none mb-2"
            />
            <Button type="submit" size="sm" loading={submitting}>
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <p className="mb-10 text-sm text-gray-500">
          <Link to="/login" className="text-brand-600 font-medium hover:underline">Log in</Link>{' '}
          to leave a comment.
        </p>
      )}

      {/* Comment list */}
      {loading ? (
        <div className="space-y-5">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full skeleton flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 skeleton rounded w-32" />
                <div className="h-4 skeleton rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No comments yet. Be the first!</p>
      ) : (
        <ul className="space-y-7">
          <AnimatePresence>
            {comments.map((c) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-3"
              >
                <Avatar src={c.user?.avatar} name={c.user?.name} size="sm" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-semibold text-sm">{c.user?.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
                      {(user?.id === c.user?.id || user?.role === 'admin') && (
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                    {c.comment}
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
