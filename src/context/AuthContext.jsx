import React, { createContext, useEffect, useState } from "react";

// Allow exporting context from this file alongside provider for simplicity in this project.
/* eslint-disable-next-line react-refresh/only-export-components */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem("user") || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", user);
      else localStorage.removeItem("user");
    } catch (err) {
  // Warn on storage errors (e.g., privacy mode)
  console.warn("AuthContext localStorage error:", err);
    }
  }, [user]);

  const login = (username) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
