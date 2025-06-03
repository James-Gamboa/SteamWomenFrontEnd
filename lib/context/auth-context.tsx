"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  role: "student" | "company" | "admin";
  firstName?: string;
  lastName?: string;
  organizationName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: "student" | "company" | "admin") => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  role: "student" | "company" | "admin";
  firstName?: string;
  lastName?: string;
  organizationName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    
    console.log("Checking stored auth:", { storedToken, storedUser });
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        Cookies.remove("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: "student" | "company" | "admin") => {
    try {
      console.log('Attempting login with:', { email, role });
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      Cookies.set("token", data.token, { expires: 7 });
      
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log("Attempting registration with:", userData);
      
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      const { token, user } = data;
      
      Cookies.set("token", token, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out user");
    Cookies.remove("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 