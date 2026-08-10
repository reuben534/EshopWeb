import { orders } from '../data/orders.js';
import { getCart } from './cartService.js';

export function createOrder({ customer, shippingAddress, paymentMethod }, userId) {
  const cart = getCart();
  if (!cart.items.length) {
    return null;
  }

  const order = {
    id: `ORD-${Date.now()}`,
    userId: Number(userId) || null,
    customer,
    shippingAddress,
    paymentMethod,
    items: cart.items,
    subtotal: cart.subtotal,
    tax: cart.tax,
    total: cart.total,
    paymentStatus: 'Pending',
    shippingStatus: 'Pending',
    orderStatus: 'Processing',
    trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  return order;
}

export function getOrderById(id, user) {
  const order = orders.find((order) => order.id === id);
  if (!order) return null;
  if (user?.role === 'admin' || order.userId === Number(user?.id)) {
    return order;
  }
  return null;
}

export function getOrders(user) {
  if (user?.role === 'admin') {
    return orders;
  }
  return orders.filter((order) => order.userId === Number(user?.id));
}
