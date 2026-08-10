import express from 'express';
import { fetchOrderById, fetchOrders, placeOrder } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.get('/', fetchOrders);
router.get('/:id', fetchOrderById);
router.post('/', placeOrder);

export default router;
