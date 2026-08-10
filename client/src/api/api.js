function getStoredToken() {
  return window.localStorage.getItem('eshop-token') || window.sessionStorage.getItem('eshop-token');
}

function getStoredRefreshToken() {
  return window.localStorage.getItem('eshop-refresh') || window.sessionStorage.getItem('eshop-refresh');
}

function authHeaders() {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getRememberMe() {
  return Boolean(window.localStorage.getItem('eshop-refresh'));
}

function clearAuthStorage() {
  window.localStorage.removeItem('eshop-token');
  window.localStorage.removeItem('eshop-refresh');
  window.localStorage.removeItem('eshop-user');
  window.sessionStorage.removeItem('eshop-token');
  window.sessionStorage.removeItem('eshop-refresh');
  window.sessionStorage.removeItem('eshop-user');
}

function setTokens({ token, refreshToken, user }, rememberMe = true) {
  const storage = rememberMe ? window.localStorage : window.sessionStorage;
  const other = rememberMe ? window.sessionStorage : window.localStorage;

  storage.setItem('eshop-token', token);
  storage.setItem('eshop-refresh', refreshToken);
  storage.setItem('eshop-user', JSON.stringify(user));

  other.removeItem('eshop-token');
  other.removeItem('eshop-refresh');
  other.removeItem('eshop-user');
}

async function refreshAuthToken() {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) return null;
  const data = await response.json();
  const rememberMe = getRememberMe();
  setTokens({ token: data.token, refreshToken: refreshToken, user: JSON.parse(window.localStorage.getItem('eshop-user') || window.sessionStorage.getItem('eshop-user') || '{}') }, rememberMe);
  return data.token;
}

async function request(url, options = {}, retry = true) {
  const headers = { 'Content-Type': 'application/json', ...authHeaders(), ...(options.headers || {}) };
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401 && retry) {
    const refreshedToken = await refreshAuthToken();
    if (refreshedToken) {
      const newHeaders = { ...headers, Authorization: `Bearer ${refreshedToken}` };
      return fetch(url, { ...options, headers: newHeaders });
    }
  }
  return response;
}

export async function login(payload) {
  const { rememberMe = true, ...credentials } = payload;
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (response.ok) {
    setTokens({ token: data.token, refreshToken: data.refreshToken, user: data.user }, rememberMe);
  }
  return { ok: response.ok, ...data };
}

export async function register(payload) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (response.ok) {
    setTokens({ token: data.token, refreshToken: data.refreshToken, user: data.user }, true);
  }
  return { ok: response.ok, ...data };
}

export async function forgotPassword(payload) {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function resetPassword(payload) {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function getCurrentUser() {
  const response = await request('/api/auth/me');
  return await response.json();
}

export async function refreshToken() {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: getStoredRefreshToken() })
  });
  return await response.json();
}

export async function logout() {
  const refreshToken = getStoredRefreshToken();
  clearAuthStorage();
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
}

export async function getProducts() {
  const response = await fetch('/api/products');
  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`/api/products/${id}`);
  return await response.json();
}

export async function getCategories() {
  const response = await fetch('/api/categories');
  return await response.json();
}

export async function getAdminSummary() {
  const response = await request('/api/admin/summary');
  return await response.json();
}

export async function placeOrder(payload) {
  const response = await request('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function getCart() {
  const response = await request('/api/cart');
  return await response.json();
}

export async function addToCart(payload) {
  const response = await request('/api/cart/add', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function updateCart(payload) {
  const response = await request('/api/cart/update', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function removeFromCart(payload) {
  const response = await request('/api/cart/remove', {
    method: 'DELETE',
    body: JSON.stringify(payload)
  });
  return await response.json();
}

export async function updateCurrentUser(payload) {
  const response = await request('/api/auth/me', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return await response.json();
}
