import { useEffect, useState } from 'react';
import { getAdminSummary, placeOrder } from '../api/api.js';

export default function AdminPage() {
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAdminSummary().then(setSummary);
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const response = await placeOrder(form);
    setMessage(response.message);
  };

  return (
    <section className="section">
      <h3>Admin dashboard</h3>
      {summary ? (
        <div className="summary-grid">
          <div className="summary-card">Revenue<br /><strong>{summary.revenue}</strong></div>
          <div className="summary-card">Orders<br /><strong>{summary.orders}</strong></div>
          <div className="summary-card">Customers<br /><strong>{summary.customers}</strong></div>
          <div className="summary-card">Inventory<br /><strong>{summary.inventory}%</strong></div>
        </div>
      ) : null}

      <form className="checkout-form" onSubmit={handleCheckout}>
        <h4>Checkout demo</h4>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <button type="submit" className="btn primary-btn">⚡ Place order</button>
        {message ? <p className="message">{message}</p> : null}
      </form>
    </section>
  );
}
