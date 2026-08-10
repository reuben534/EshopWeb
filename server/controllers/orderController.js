import { createOrder, getOrderById, getOrders } from '../services/orderService.js';

export function placeOrder(req, res) {
  const order = createOrder(req.body, req.user?.id);
  if (!order) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }
  return res.status(201).json({ success: true, order });
}

export function fetchOrders(req, res) {
  res.json(getOrders(req.user));
}

export function fetchOrderById(req, res) {
  const order = getOrderById(req.params.id, req.user);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
}
