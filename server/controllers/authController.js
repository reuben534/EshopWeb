import { authenticateUser, createToken, findUserById, registerUser } from '../services/authService.js';

export function handleRegister(req, res) {
  const user = registerUser(req.body);
  if (!user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const token = createToken(user);
  return res.json({ user, token });
}

export function handleLogin(req, res) {
  const user = authenticateUser(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user);
  return res.json({ user, token });
}

export function handleCurrentUser(req, res) {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { passwordHash, ...safeUser } = user;
  return res.json(safeUser);
}
