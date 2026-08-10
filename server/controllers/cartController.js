import { addCartItem, getCart, removeCartItem, updateCartItem } from '../services/cartService.js';
import { getProductById } from '../services/productService.js';

export function fetchCart(req, res) {
  res.json(getCart(req.user.id));
}

export function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const product = getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const item = addCartItem(req.user.id, product, Number(quantity));
  return res.json({ success: true, item, cart: getCart(req.user.id) });
}

export function updateCart(req, res) {
  const { productId, quantity } = req.body;
  const item = updateCartItem(req.user.id, productId, quantity);
  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  return res.json({ success: true, item, cart: getCart(req.user.id) });
}

export function removeFromCart(req, res) {
  const { productId } = req.body;
  const item = removeCartItem(req.user.id, productId);
  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  return res.json({ success: true, item, cart: getCart(req.user.id) });
}
