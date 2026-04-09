import { Router } from 'express';
import { getIndexPage } from '../controllers/index.controllers.js';

const router = Router();

router.get('/', getIndexPage);

export default router;
