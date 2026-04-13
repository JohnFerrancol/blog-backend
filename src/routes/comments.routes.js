import { Router } from 'express';
import {
  updateComment,
  deleteComment,
} from '../controllers/comments.controllers.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.put('/:id', requireAuth, updateComment);
router.delete('/:id', requireAuth, deleteComment);

export default router;
