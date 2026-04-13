import { Router } from 'express';
import {
  updateComment,
  deleteComment,
} from '../controllers/comments.controllers.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// HTTP PUT and DELETE requests to edit and delete an existing comment
router.put('/:id', requireAuth, updateComment);
router.delete('/:id', requireAuth, deleteComment);

export default router;
