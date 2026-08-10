import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, placeOrder);

export default router;
