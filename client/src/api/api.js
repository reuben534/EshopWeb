export async function login(payload) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return { ok: response.ok, ...data };
}

export async function register(payload) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return { ok: response.ok, ...data };
}

export async function getCurrentUser() {
  const response = await fetch('/api/auth/me', {
    headers: { ...authHeaders() }
  });
  const data = await response.json();
  return data;
}

export async function getProducts() {
  const response = await fetch('/api/products');
  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`/api/products/${id}`);
  return await response.json();
}

function authHeaders() {
  const token = window.localStorage.getItem('eshop-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCategories() {
  const response = await fetch('/api/categories');
  return await response.json();
}

export async function getAdminSummary() {
  const response = await fetch('/api/admin/summary', {
    headers: { ...authHeaders() }
  });
  return await response.json();
}

export async function placeOrder(payload) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function getCart() {
  const response = await fetch('/api/cart', {
    headers: { ...authHeaders() }
  });
  return await response.json();
}

export async function addToCart(payload) {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function updateCart(payload) {
  const response = await fetch('/api/cart/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function removeFromCart(payload) {
  const response = await fetch('/api/cart/remove', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return await response.json();
}
