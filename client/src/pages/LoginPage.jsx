import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <div className="form-wrapper">
        <h3>Login</h3>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input value={form.email} placeholder="Email" onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input type="password" value={form.password} placeholder="Password" onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(event) => setForm({ ...form, rememberMe: event.target.checked })}
            />
            Remember me
          </label>
          <button type="submit" className="btn primary-btn">🔐 Login</button>
          <Link to="/forgot-password" className="link-button">Forgot password?</Link>
          {error && <p className="message">{error}</p>}
        </form>
      </div>
    </section>
  );
}
