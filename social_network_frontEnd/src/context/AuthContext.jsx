import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = (userData) => {
    setUser(userData);
    console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (newChatId) => {
    setUser((prevUser) => ({
      ...prevUser, // Preserve existing properties like ID
      chats: [...prevUser.chats, newChatId], // Update the chats array
    }));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
