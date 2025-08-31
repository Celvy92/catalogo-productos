import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("celba:token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("celba:user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("celba:token", token);
    else localStorage.removeItem("celba:token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("celba:user", JSON.stringify(user));
    else localStorage.removeItem("celba:user");
  }, [user]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, isAuth: !!token, login, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
