import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>
        <h1>ElectroHub</h1>
        <p>Premium electronics marketplace</p>
      </div>
      <nav>
        <Link to="/">🏠 Home</Link>
        <Link to="/products">🛍 Products</Link>
        <Link to="/search">🔎 Search</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/wishlist">🤍 Wishlist</Link>
        <Link to="/orders">📦 Orders</Link>
        {user?.role === 'admin' && <Link to="/admin">⚙️ Admin</Link>}
        {user ? (
          <>
            <Link to="/profile">👤 {user.firstName}</Link>
            <button type="button" className="link-button" onClick={logout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
