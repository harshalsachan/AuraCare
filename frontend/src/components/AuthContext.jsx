import React, { createContext, useState, useEffect } from 'react';

// Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // When the app loads, check if we saved a user in the browser's memory
  useEffect(() => {
    const storedUser = localStorage.getItem('vitaltrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('vitaltrack_user', JSON.stringify(userData)); // Save to browser
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vitaltrack_user'); // Clear from browser
  };

  // Function to update user profile (like adding a photo)
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