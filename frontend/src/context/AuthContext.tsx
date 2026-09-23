import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "../api/axios";
import { User } from "../types/index";

import { AuthCtx } from "../types/index";

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const save = (data: { user: User; token: string }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    save(data.data);
  };

  const register = async (payload: any) => {
    const { data } = await api.post("/auth/register", payload);
    save(data.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
