import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updateCurrentUser as apiUpdateCurrentUser
} from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem('eshop-user') || window.sessionStorage.getItem('eshop-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const token = window.localStorage.getItem('eshop-token') || window.sessionStorage.getItem('eshop-token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((data) => {
        if (data?.id) {
          setUser(data);
          const storage = window.localStorage.getItem('eshop-token') ? window.localStorage : window.sessionStorage;
          storage.setItem('eshop-user', JSON.stringify(data));
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
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await apiRegister(payload);
    if (!data.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const updateProfile = async (payload) => {
    const data = await apiUpdateCurrentUser(payload);
    if (!data.ok) {
      throw new Error(data.message || 'Update failed');
    }
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: Boolean(user) }}>
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
