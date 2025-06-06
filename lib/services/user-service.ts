// TODO: Reemplazar con conexión a Django

import { client } from '@/backend-integration/api';
import { User, SignUpInput, UpdateUserInput } from '@/backend-integration/types';
import { GET_USERS, GET_USER } from '@/backend-integration/graphql/queries';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '@/backend-integration/graphql/mutations';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await client.query({
    query: GET_USERS,
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.users;
};

export const getUser = async (id: string): Promise<User> => {
  const { data } = await client.query({
    query: GET_USER,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.user;
};

export const createUser = async (input: SignUpInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.signUp.user;
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: UPDATE_USER,
    variables: { id, input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.updateUser;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: DELETE_USER,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.deleteUser;
}; 