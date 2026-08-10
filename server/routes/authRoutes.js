import express from 'express';
import { handleLogin, handleRegister, handleCurrentUser } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/me', requireAuth, handleCurrentUser);

export default router;
