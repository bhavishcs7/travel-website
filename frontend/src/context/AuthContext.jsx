import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('wanderlust_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          // Backend now returns { success: true, user: {...} }
          setUser(res.data.user || res.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    // Backend now returns { success: true, token, user: {...} }
    const { token: jwtToken, user: userData } = res.data;
    localStorage.setItem('wanderlust_token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('wanderlust_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data) => {
    const res = await api.put('/auth/profile', data);
    // Backend now returns { success: true, user: {...} }
    const updatedUser = res.data.user || res.data;
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    // isAuthenticated is derived from verified user object, not raw token string
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

