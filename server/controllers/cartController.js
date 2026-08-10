import { addCartItem, getCart, removeCartItem, updateCartItem } from '../services/cartService.js';
import { getProductById } from '../services/productService.js';

export function fetchCart(_req, res) {
  res.json(getCart());
}

export function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const product = getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const item = addCartItem(product, Number(quantity));
  return res.json({ success: true, item, cart: getCart() });
}

export function updateCart(req, res) {
  const { productId, quantity } = req.body;
  const item = updateCartItem(productId, quantity);
  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  return res.json({ success: true, item, cart: getCart() });
}

export function removeFromCart(req, res) {
  const { productId } = req.body;
  const item = removeCartItem(productId);
  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  return res.json({ success: true, item, cart: getCart() });
}
