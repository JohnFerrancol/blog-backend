import { Router } from 'express';
import { deleteComment } from '../controllers/comments.controllers.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.delete('/:id', requireAuth, deleteComment);

export default router;
