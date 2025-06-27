/**
 * Apollo Client Configuration
 *
 * Este archivo configura el cliente GraphQL que se usa en toda la aplicación.
 *
 * Flujo de autenticación:
 * 1. El token se almacena en localStorage después del login
 * 2. Cada petición GraphQL incluye el token en el header
 * 3. El backend valida el token y autoriza la operación
 *
 * Uso en componentes:
 * ```typescript
 * import { client } from '@/backend-integration/api';
 *
 * // Query
 * const { data } = await client.query({
 *   query: GET_USERS
 * });
 *
 * // Mutation
 * const { data } = await client.mutate({
 *   mutation: CREATE_USER,
 *   variables: { input }
 * });
 * ```
 */

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthResponse, LoginInput, SignUpInput, DashboardStats } from "./types";
import { LOGIN, SIGN_UP } from "./graphql/mutations";
import { GET_DASHBOARD_STATS } from "./graphql/queries";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
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

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const { data } = await client.mutate({
    mutation: LOGIN,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.login;
};

export const signUp = async (input: SignUpInput): Promise<AuthResponse> => {
  const { data } = await client.mutate({
    mutation: SIGN_UP,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.signUp;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await client.query({
    query: GET_DASHBOARD_STATS,
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.dashboardStats;
};
