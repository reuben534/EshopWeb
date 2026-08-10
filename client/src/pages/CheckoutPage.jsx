import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { placeOrder } from '../api/api.js';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'Card'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await placeOrder({
      customer: { name: form.name, email: form.email },
      shippingAddress: {
        fullName: form.name,
        addressLine1: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode
      },
      paymentMethod: form.paymentMethod
    });
    setMessage(response.success ? `Order placed: ${response.order.id}` : response.message || 'Unable to place order');
  };

  if (!cart.items.length) {
    return (
      <section className="section">
        <h3>Checkout</h3>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h3>Checkout</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input value={form.name} placeholder="Full Name" onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <input value={form.email} placeholder="Email" onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <input value={form.address} placeholder="Address Line 1" onChange={(event) => setForm({ ...form, address: event.target.value })} required />
        <input value={form.city} placeholder="City" onChange={(event) => setForm({ ...form, city: event.target.value })} required />
        <input value={form.province} placeholder="Province" onChange={(event) => setForm({ ...form, province: event.target.value })} required />
        <input value={form.postalCode} placeholder="Postal Code" onChange={(event) => setForm({ ...form, postalCode: event.target.value })} required />
        <label>
          Payment Method
          <select value={form.paymentMethod} onChange={(event) => setForm({ ...form, paymentMethod: event.target.value })}>
            <option>Card</option>
            <option>PayFast</option>
            <option>Ozow</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
      {message && <p className="message">{message}</p>}
    </section>
  );
}
