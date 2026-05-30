// routes/blogs.js
import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogMedia,
  toggleLike,
  toggleBookmark,
  getDashboardStats,
  adminGetBlogs,
} from '../controllers/blogController.js';

const router = Router();

// ── Authenticated users ────────────────────────────────────────
router.post('/:blogId/like', protect, toggleLike);
router.post('/:blogId/bookmark', protect, toggleBookmark);

// ── Admin only ─────────────────────────────────────────────────
router.get('/admin/all', protect, adminOnly, adminGetBlogs);
router.get('/admin/stats', protect, adminOnly, getDashboardStats);
router.post('/', protect, adminOnly, upload.single('cover_image'), createBlog);
router.put('/:id', protect, adminOnly, upload.single('cover_image'), updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);
router.post('/media/upload', protect, adminOnly, upload.single('file'), uploadBlogMedia);

// ── Public (Catch-all slug must be last) ──────────────────────
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

export default router;
