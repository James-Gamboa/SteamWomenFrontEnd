// TODO: Reemplazar con conexión a Django

import { client } from '@/backend-integration/api';
import { Event, CreateEventInput, UpdateEventInput } from '@/backend-integration/types';
import { GET_EVENTS, GET_EVENT } from '@/backend-integration/graphql/queries';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from '@/backend-integration/graphql/mutations';

export const getEvents = async (filter?: any): Promise<Event[]> => {
  const { data } = await client.query({
    query: GET_EVENTS,
    variables: { filter },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.events;
};

export const getEvent = async (id: string): Promise<Event> => {
  const { data } = await client.query({
    query: GET_EVENT,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.event;
};

export const createEvent = async (input: CreateEventInput): Promise<Event> => {
  const { data } = await client.mutate({
    mutation: CREATE_EVENT,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.createEvent;
};

export const updateEvent = async (id: string, input: UpdateEventInput): Promise<Event> => {
  const { data } = await client.mutate({
    mutation: UPDATE_EVENT,
    variables: { id, input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.updateEvent;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: DELETE_EVENT,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.deleteEvent;
}; 