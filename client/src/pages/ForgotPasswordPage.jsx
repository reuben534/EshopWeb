import { useState } from 'react';
import { forgotPassword } from '../api/api.js';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await forgotPassword({ email });
    setStatus(result.message || (result.ok ? 'Reset token issued.' : 'Unable to send reset token.'));
  };

  return (
    <section className="section form-wrapper">
      <h3>Forgot Password</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button type="submit" className="btn primary-btn">✉️ Send Reset Link</button>
        {status && <p className="message">{status}</p>}
      </form>
    </section>
  );
}
