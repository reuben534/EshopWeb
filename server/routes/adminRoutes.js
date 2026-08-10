import express from 'express';
import { fetchAdminSummary } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', requireAdmin, fetchAdminSummary);

export default router;
