import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import { fetchCategories } from './controllers/productController.js';
import adminRoutes from './routes/adminRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import connectDatabase from './config/db.js';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

if (process.env.MONGO_URI) {
  connectDatabase();
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'ElectroHub API is alive' });
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', tokenRoutes);
app.use('/api/products', productRoutes);
// expose categories at /api/categories for the client
app.get('/api/categories', fetchCategories);
app.use('/api/admin', adminRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`ElectroHub server running on http://localhost:${port}`);
});
