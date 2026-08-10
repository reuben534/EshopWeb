import express from 'express';
import { fetchProducts, fetchProductById, fetchCategories } from '../controllers/productController.js';

const router = express.Router();

router.get('/', fetchProducts);
router.get('/:id', fetchProductById);
router.get('/categories', fetchCategories);

export default router;
