import { createContext, useContext, useState, ReactNode } from "react";

export interface Scheme {
  id: string;
  name: string;
  monthlyAmount: number;
  totalMonths: number;
  bonusMonths: number;
  enrolledDate: string;
  paidMonths: number;
}

interface User {
  phone: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  enrolledSchemes: Scheme[];
  login: (phone: string) => void;
  logout: () => void;
  enrollScheme: (scheme: Omit<Scheme, "id" | "enrolledDate" | "paidMonths">) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [enrolledSchemes, setEnrolledSchemes] = useState<Scheme[]>([]);

  const login = (phone: string) => {
    setUser({ phone, name: "Lakshmi Devi" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setEnrolledSchemes([]);
  };

  const enrollScheme = (scheme: Omit<Scheme, "id" | "enrolledDate" | "paidMonths">) => {
    const exists = enrolledSchemes.find((s) => s.name === scheme.name);
    if (exists) return;
    setEnrolledSchemes((prev) => [
      ...prev,
      {
        ...scheme,
        id: crypto.randomUUID(),
        enrolledDate: new Date().toISOString(),
        paidMonths: Math.floor(Math.random() * 5) + 1,
      },
    ]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, enrolledSchemes, login, logout, enrollScheme }}>
      {children}
    </AuthContext.Provider>
  );
};
