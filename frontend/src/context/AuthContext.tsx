import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authApi } from '../services/api';

interface AuthContextType {
  token: string | null;
  admin: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await authApi.getMe();
        const userData = res.user || res.admin;
        if (res.success && userData) {
          setToken(storedToken);
          setAdmin(userData);
        } else {
          localStorage.removeItem('token');
          setToken(null);
          setAdmin(null);
        }
      } catch (err: any) {
        console.error('Token verification failed – clearing stale token:', err.message);
        localStorage.removeItem('token');
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const userData = res.user || res.admin;
    if (res.success && res.token && userData) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setAdmin(userData);
      return res;
    }
    throw new Error(res.message || 'Login failed.');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token && !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
