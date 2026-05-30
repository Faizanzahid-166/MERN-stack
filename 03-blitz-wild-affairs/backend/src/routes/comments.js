// routes/comments.js
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getComments, addComment, deleteComment } from '../controllers/commentController.js';

const router = Router();

router.get('/:blogId', getComments);
router.post('/', protect, addComment);
router.delete('/:id', protect, deleteComment);

export default router;
