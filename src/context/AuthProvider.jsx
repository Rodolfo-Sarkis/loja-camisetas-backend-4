import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

function getStoredAuth() {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
    };
  } catch {
    return {
      user: null,
      token: null,
    };
  }
}

function normalizeUser(userData) {
  return {
    ...userData,
    name:
      userData?.name ||
      userData?.nome ||
      userData?.username ||
      userData?.email?.split("@")[0] ||
      "Usuário",
    isAdmin: Boolean(userData?.isAdmin || userData?.role === "admin"),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuth().user);
  const [token, setToken] = useState(() => getStoredAuth().token);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = (userData, authToken) => {
    setUser(normalizeUser(userData));
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}