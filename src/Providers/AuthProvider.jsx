// src/Providers/AuthProvider.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Token check (persist after refresh)
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const isAuthenticated = !!token; // true if token exists

  // Sync localStorage with state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);   // save token to state
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({ token, isAuthenticated, login, logout }),
    [token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
