import { Router } from 'express';
import {
  getPosts,
  getSinglePost,
  createComment,
  createPost,
  editPost,
  deletePost,
} from '../controllers/posts.controllers.js';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getPosts);
router.post('/', requireAuth, requireAdmin, createPost);

router.get('/:id', getSinglePost);
router.put('/:id', requireAuth, requireAdmin, editPost);
router.delete('/:id', requireAuth, requireAdmin, deletePost);

router.post('/:id/comments', requireAuth, createComment);

export default router;
