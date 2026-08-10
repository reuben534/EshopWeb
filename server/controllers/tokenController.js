import { createToken, createRefreshToken, revokeRefreshToken, verifyRefreshToken } from '../services/authService.js';

export function handleRefreshToken(req, res) {
  const { refreshToken } = req.body;
  const user = verifyRefreshToken(refreshToken);
  if (!user) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const token = createToken(user);
  return res.json({ token });
}

export function handleLogout(req, res) {
  const { refreshToken } = req.body;
  if (refreshToken) {
    revokeRefreshToken(refreshToken);
  }
  return res.json({ ok: true });
}
