import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const isAuthenticated = !!token;

  const login = (newToken) => setToken(newToken); // token login er por set korbe
  const logout = () => setToken(null);

  const value = useMemo(() => ({ token, isAuthenticated, login, logout }), [token, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
