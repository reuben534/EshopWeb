import { getAllProducts, getProductById, getCategories } from '../services/productService.js';

export function fetchProducts(_req, res) {
  res.json(getAllProducts());
}

export function fetchProductById(req, res) {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
}

export function fetchCategories(_req, res) {
  res.json(getCategories());
}
