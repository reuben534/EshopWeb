import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

const JWT_SECRET = process.env.JWT_SECRET || 'electrohub_secret';

export function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

export function findUserById(id) {
  return users.find((user) => user.id === Number(id));
}

export function registerUser({ firstName, lastName, email, password }) {
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
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return sanitizeUser(user);
}

export function authenticateUser(email, password) {
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
  if (updates.address) {
    user.addresses = [...user.addresses, updates.address];
  }

  return sanitizeUser(user);
}

export function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
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
