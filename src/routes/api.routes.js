import { Router } from 'express';
import { getRoutePage } from '../controllers/api.controllers.js';

const router = Router();

router.get('/', getRoutePage);

export default router;
