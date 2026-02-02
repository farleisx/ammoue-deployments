import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); // Store mock token
        toast.success(`Welcome back, ${data.user.name}!`, {
          icon: '👋',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        return { success: true, user: data.user };
      } else {
        toast.error(data.message || 'Login failed', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error during login.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return { success: false, message: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully!', {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};