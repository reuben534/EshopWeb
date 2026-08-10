import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', avatarUrl: user?.avatarUrl || '', currentPassword: '', password: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return (
      <section className="section">
        <h3>Profile</h3>
        <p>Please log in to view your profile.</p>
      </section>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');
    try {
      const updates = {
        firstName: form.firstName,
        lastName: form.lastName,
        avatarUrl: form.avatarUrl
      };
      if (form.password) {
        updates.password = form.password;
        updates.currentPassword = form.currentPassword;
      }
      await updateProfile(updates);
      setStatus('Profile updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="section form-wrapper">
      <h3>My Profile</h3>
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input value={form.firstName} placeholder="First Name" onChange={(event) => setForm({ ...form, firstName: event.target.value })} required />
        <input value={form.lastName} placeholder="Last Name" onChange={(event) => setForm({ ...form, lastName: event.target.value })} required />
        <input value={form.avatarUrl} placeholder="Avatar URL" onChange={(event) => setForm({ ...form, avatarUrl: event.target.value })} />
        <input type="password" value={form.currentPassword} placeholder="Current Password" onChange={(event) => setForm({ ...form, currentPassword: event.target.value })} />
        <input type="password" value={form.password} placeholder="New Password" onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <button type="submit" className="btn primary-btn">Update profile</button>
        {status && <p className="message">{status}</p>}
        {error && <p className="message" style={{ color: '#b91c1c' }}>{error}</p>}
      </form>
    </section>
  );
}
