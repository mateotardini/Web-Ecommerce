import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Inicio de sesión exitoso.');
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove the token from local storage upon logout
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token found in local storage, set authentication to true
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const tokenExpiration = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
      const expirationDate = new Date().getTime() + tokenExpiration;
      localStorage.setItem('token', expirationDate); // Store the expiration date in local storage
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};