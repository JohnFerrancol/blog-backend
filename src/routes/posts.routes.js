import { Router } from 'express';
import { getPosts } from '../controllers/posts.controllers.js';

const router = Router();

router.get('/', getPosts);

export default router;
