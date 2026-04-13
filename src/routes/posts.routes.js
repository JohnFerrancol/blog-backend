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

// HTTP GET and POST Requests for /posts to get all posts and to create a post
router.get('/', getPosts);
router.post('/', requireAuth, requireAdmin, createPost);

// HTTP GET, PUT and DELETE Requests for /posts/:id to get all post information and to update or delete a post
router.get('/:id', getSinglePost);
router.put('/:id', requireAuth, requireAdmin, editPost);
router.delete('/:id', requireAuth, requireAdmin, deletePost);

// HTTP POST Request for /posts/:id/comments to create a comment on the post
router.post('/:id/comments', requireAuth, createComment);

export default router;
