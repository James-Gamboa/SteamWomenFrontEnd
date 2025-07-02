import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  isAuthenticated as checkAuthStatus,
  getToken,
  client,
} from "./api";
import { GET_CURRENT_USER } from "./graphql/queries";

interface User {
  id: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  role: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  createdAt: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const { data } = await client.query({
        query: GET_CURRENT_USER,
      });
      return data.me;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getToken();

      if (storedToken && checkAuthStatus()) {
        setToken(storedToken);

        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            apiLogout();
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Error getting current user:", error);
          apiLogout();
          setToken(null);
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (input: LoginInput) => {
    try {
      const response = await apiLogin(input);
      setToken(response.access);

      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      } else {
        throw new Error("Failed to get user data after login");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth() {
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isLoading, isAuthenticated]);

  return { user, isLoading };
}

export function useRequireRole(requiredRole: string) {
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    } else if (!isLoading && user && user.role !== requiredRole) {
      window.location.href = "/unauthorized";
    }
  }, [isLoading, isAuthenticated, user, requiredRole]);

  return { user, isLoading };
}
