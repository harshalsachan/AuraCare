import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // THE FIX: Synchronous Lazy Initialization. 
  // React reads this instantly before the router makes any decisions.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('vitaltrack_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('vitaltrack_user', JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vitaltrack_user'); 
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('vitaltrack_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};