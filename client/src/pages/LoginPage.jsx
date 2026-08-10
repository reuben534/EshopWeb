import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
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
          <button type="submit">Login</button>
          {error && <p className="message">{error}</p>}
        </form>
      </div>
    </section>
  );
}
