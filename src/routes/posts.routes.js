import { Router } from 'express';
import {
  getPosts,
  getSinglePost,
  createComment,
} from '../controllers/posts.controllers.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getSinglePost);

router.post('/:id/comments', requireAuth, createComment);

export default router;
