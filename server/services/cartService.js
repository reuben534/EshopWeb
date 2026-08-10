const cartItems = [];

export function getCart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.15).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return { items: cartItems, subtotal, tax, total };
}

export function addCartItem(product, quantity = 1) {
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

export function updateCartItem(productId, quantity) {
  const item = cartItems.find((item) => item.productId === Number(productId));
  if (!item) return null;
  item.quantity = Number(quantity);
  if (item.quantity <= 0) {
    return removeCartItem(productId);
  }
  return item;
}

export function removeCartItem(productId) {
  const index = cartItems.findIndex((item) => item.productId === Number(productId));
  if (index === -1) return null;
  return cartItems.splice(index, 1)[0];
}
