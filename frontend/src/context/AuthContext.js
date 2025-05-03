// frontend/src/context/authContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Validate token on mount
    const validateToken = async () => {
      if (isAuthenticated()) {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error('Invalid token');
          }

          const data = await res.json();
          setUser(data);
          setAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          logout(); // Clear invalid token
          setUser(null);
          setAuthenticated(false);
        }
      }
    };

    validateToken();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, authenticated, setUser, setAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};