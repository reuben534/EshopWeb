import { useState } from 'react';
import { resetPassword } from '../api/api.js';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const token = searchParams.get('token') || '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await resetPassword({ token, password });
    if (result.ok) {
      setStatus('Password reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    setStatus(result.message || 'Failed to reset password.');
  };

  return (
    <section className="section form-wrapper">
      <h3>Reset Password</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="password" placeholder="New password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <button type="submit" className="btn primary-btn">🔑 Reset Password</button>
        {status && <p className="message">{status}</p>}
      </form>
    </section>
  );
}
