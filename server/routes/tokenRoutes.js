import express from 'express';
import { handleRefreshToken, handleLogout } from '../controllers/tokenController.js';

const router = express.Router();

router.post('/refresh', handleRefreshToken);
router.post('/logout', handleLogout);

export default router;
