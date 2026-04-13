import { Router } from 'express';
import {
  getUser,
  registerUser,
  loginUser,
} from '../controllers/auth.controllers.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// HTTP GET request to fetch the user information
router.get('/me', requireAuth, getUser);

// HTTP POST Requests to register or login a user
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
