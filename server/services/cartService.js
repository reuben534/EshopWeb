const carts = {};

function initializeCart(userId) {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  return carts[userId];
}

function calculateCart(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.15).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return { items, subtotal, tax, total };
}

export function getCart(userId) {
  const items = initializeCart(userId);
  return calculateCart(items);
}

export function addCartItem(userId, product, quantity = 1) {
  const cartItems = initializeCart(userId);
  const existing = cartItems.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
    return existing;
  }

  const item = {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
    category: product.category
  };
  cartItems.push(item);
  return item;
}

export function updateCartItem(userId, productId, quantity) {
  const cartItems = initializeCart(userId);
  const item = cartItems.find((item) => item.productId === Number(productId));
  if (!item) return null;
  item.quantity = Number(quantity);
  if (item.quantity <= 0) {
    return removeCartItem(userId, productId);
  }
  return item;
}

export function removeCartItem(userId, productId) {
  const cartItems = initializeCart(userId);
  const index = cartItems.findIndex((item) => item.productId === Number(productId));
  if (index === -1) return null;
  return cartItems.splice(index, 1)[0];
}

export function clearCart(userId) {
  carts[userId] = [];
}
