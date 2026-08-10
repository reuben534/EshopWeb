import { products } from '../data/products.js';

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

export function getCategories() {
  return [...new Set(products.map((product) => product.category))];
}

export function getInventorySummary() {
  const totalStock = products.reduce((total, product) => total + product.stock, 0);
  return {
    revenue: 'R128,400',
    orders: 184,
    customers: 932,
    inventory: totalStock > 0 ? 86 : 0,
    salesTrend: '+24% this month'
  };
}
