import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="section">
        <h3>Profile</h3>
        <p>Please log in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="section">
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
    </section>
  );
}
