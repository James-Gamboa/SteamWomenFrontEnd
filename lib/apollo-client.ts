"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_URL environment variable is not set');
}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default client; 