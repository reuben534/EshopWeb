import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

const JWT_SECRET = process.env.JWT_SECRET || 'electrohub_secret';
const refreshTokens = new Map();
const passwordResetTokens = new Map();

export function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  return users.find((user) => user.id === Number(id));
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

export function registerUser({ firstName, lastName, email, password }) {
  if (!firstName || !lastName || !email || !password) return null;
  if (!isValidEmail(email) || !isStrongPassword(password)) return null;
  const existing = findUserByEmail(email);
  if (existing) return null;

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    passwordHash,
    role: 'customer',
    addresses: [],
    wishlist: [],
    avatarUrl: '',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return sanitizeUser(user);
}

export function authenticateUser(email, password) {
  if (!email || !password || !isValidEmail(email)) return null;
  const user = findUserByEmail(email);
  if (!user) return null;
  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) return null;
  return sanitizeUser(user);
}

export function updateUser(userId, updates) {
  const user = findUserById(userId);
  if (!user) return null;

  if (updates.firstName) user.firstName = updates.firstName;
  if (updates.lastName) user.lastName = updates.lastName;
  if (updates.avatarUrl) user.avatarUrl = updates.avatarUrl;
  if (updates.address) {
    user.addresses = [...user.addresses, updates.address];
  }

  if (updates.password && updates.currentPassword) {
    const isValid = bcrypt.compareSync(updates.currentPassword, user.passwordHash);
    if (!isValid) return null;
    user.passwordHash = bcrypt.hashSync(updates.password, 10);
  }

  return sanitizeUser(user);
}

export function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export function createRefreshToken(userId) {
  const token = crypto.randomBytes(48).toString('hex');
  refreshTokens.set(token, { userId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return token;
}

export function verifyRefreshToken(token) {
  const stored = refreshTokens.get(token);
  if (!stored || stored.expiresAt < Date.now()) return null;
  return findUserById(stored.userId);
}

export function revokeRefreshToken(token) {
  refreshTokens.delete(token);
}

export function createPasswordResetToken(email) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const token = crypto.randomBytes(48).toString('hex');
  passwordResetTokens.set(token, { userId: user.id, expiresAt: Date.now() + 60 * 60 * 1000 });
  return token;
}

export function verifyPasswordResetToken(token) {
  const stored = passwordResetTokens.get(token);
  if (!stored || stored.expiresAt < Date.now()) return null;
  return findUserById(stored.userId);
}

export function resetUserPassword(token, password) {
  const user = verifyPasswordResetToken(token);
  if (!user || !isStrongPassword(password)) return null;
  user.passwordHash = bcrypt.hashSync(password, 10);
  passwordResetTokens.delete(token);
  return sanitizeUser(user);
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}
