import express from 'express';
import {
  handleLogin,
  handleRegister,
  handleCurrentUser,
  handleForgotPassword,
  handleResetPassword,
  handleUpdateCurrentUser
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);
router.get('/me', requireAuth, handleCurrentUser);
router.put('/me', requireAuth, handleUpdateCurrentUser);

export default router;
