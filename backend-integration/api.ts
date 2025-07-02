import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CUSTOM_LOGIN } from "./graphql/mutations";
import { GET_DASHBOARD_STATS } from "./graphql/queries";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// ============================================================================
// TIPOS CORREGIDOS
// ============================================================================

export interface AuthResponse {
  refresh: string;
  access: string;
  roles: string[];
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface User {
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

export interface DashboardStats {
  totalUsers: number;
  activeEvents: number;
  totalOpportunities: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  website?: string;
  image?: string;
  requirements: string[];
  benefits: string[];
  applicationProcess?: string;
  createdAt: string;
  company: {
    id: string;
    nameCompany: string;
  };
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  website?: string;
  slug: string;
  image?: string;
  requirements: string[];
  benefits: string[];
  applicationProcess?: string;
  createdAt: string;
  company: {
    id: string;
    nameCompany: string;
  };
}

export interface Company {
  id: string;
  nameCompany: string;
  email: string;
  phone?: string;
  website?: string;
  slug: string;
}

export interface Application {
  id: string;
  status: string;
  createdAt: string;
  student: {
    id: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
  };
  event?: {
    id: string;
    title: string;
    company: {
      nameCompany: string;
    };
  };
  opportunity?: {
    id: string;
    title: string;
    company: {
      nameCompany: string;
    };
  };
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN CORREGIDAS
// ============================================================================

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const { data } = await client.mutate({
    mutation: CUSTOM_LOGIN,
    variables: input,
  });

  if (data.errors) throw new Error(data.errors[0].message);

  localStorage.setItem("access_token", data.customLogin.access);
  localStorage.setItem("refresh_token", data.customLogin.refresh);

  return data.customLogin;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await client.query({
    query: GET_DASHBOARD_STATS,
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.dashboardStats;
};

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  client.clearStore();
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("access_token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};
