import { createContext, useState, useEffect } from "react";
import { logoutUser } from "../api"; // import logout API

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutUser(); // hit backend logout (clears cookie)
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("token"); // clear frontend storage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
