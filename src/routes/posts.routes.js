import { Router } from 'express';
import { getPosts, getSinglePost } from '../controllers/posts.controllers.js';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getSinglePost);

export default router;
