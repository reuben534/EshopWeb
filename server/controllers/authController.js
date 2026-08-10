import {
  authenticateUser,
  createToken,
  createRefreshToken,
  findUserById,
  registerUser,
  resetUserPassword,
  updateUser,
  createPasswordResetToken
} from '../services/authService.js';

export function handleRegister(req, res) {
  const user = registerUser(req.body);
  if (!user) {
    return res.status(400).json({ message: 'Invalid or existing user data' });
  }
  const token = createToken(user);
  const refreshToken = createRefreshToken(user.id);
  return res.json({ user, token, refreshToken });
}

export function handleLogin(req, res) {
  const user = authenticateUser(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user);
  const refreshToken = createRefreshToken(user.id);
  return res.json({ user, token, refreshToken });
}

export function handleForgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const resetToken = createPasswordResetToken(email);
  if (!resetToken) {
    return res.status(404).json({ message: 'Email not found' });
  }
  return res.json({ ok: true, resetToken, message: 'Use this token to reset your password' });
}

export function handleResetPassword(req, res) {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }
  const user = resetUserPassword(token, password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid token or password' });
  }
  return res.json({ ok: true, user });
}

export function handleCurrentUser(req, res) {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { passwordHash, ...safeUser } = user;
  return res.json(safeUser);
}

export function handleUpdateCurrentUser(req, res) {
  const user = updateUser(req.user.id, req.body);
  if (!user) {
    return res.status(404).json({ message: 'User not found or invalid credentials' });
  }
  return res.json({ ok: true, user });
}
