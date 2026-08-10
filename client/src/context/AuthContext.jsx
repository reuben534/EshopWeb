import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, login as apiLogin, register as apiRegister } from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem('eshop-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const token = window.localStorage.getItem('eshop-token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((data) => {
        if (data?.id) {
          setUser(data);
          window.localStorage.setItem('eshop-user', JSON.stringify(data));
        } else {
          logout();
        }
      })
      .catch(logout)
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const data = await apiLogin(payload);
    if (!data.ok) {
      throw new Error(data.message || 'Login failed');
    }
    window.localStorage.setItem('eshop-token', data.token);
    window.localStorage.setItem('eshop-user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await apiRegister(payload);
    if (!data.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    window.localStorage.setItem('eshop-token', data.token);
    window.localStorage.setItem('eshop-user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    window.localStorage.removeItem('eshop-token');
    window.localStorage.removeItem('eshop-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
