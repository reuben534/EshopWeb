import express from 'express';
import { addToCart, fetchCart, removeFromCart, updateCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', fetchCart);
router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/remove', removeFromCart);

export default router;
