import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section">
      <h3>Register</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input value={form.firstName} placeholder="First Name" onChange={(event) => setForm({ ...form, firstName: event.target.value })} required />
        <input value={form.lastName} placeholder="Last Name" onChange={(event) => setForm({ ...form, lastName: event.target.value })} required />
        <input value={form.email} placeholder="Email" onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <input type="password" value={form.password} placeholder="Password" onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <button type="submit">Register</button>
        {error && <p className="message">{error}</p>}
      </form>
    </section>
  );
}
