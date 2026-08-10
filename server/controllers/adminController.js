import { getInventorySummary } from '../services/productService.js';

export function fetchAdminSummary(_req, res) {
  res.json(getInventorySummary());
}
