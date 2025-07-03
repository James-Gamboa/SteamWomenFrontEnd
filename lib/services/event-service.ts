/**
 * Event Service
 *
 * Este servicio maneja todas las operaciones relacionadas con eventos usando GraphQL.
 *
 * Ejemplo de uso en componentes:
 * ```typescript
 * // En un componente
 * import { eventService } from '@/lib/services/event-service';
 *
 * // Obtener eventos
 * const events = await eventService.getEvents();
 *
 * // Obtener un evento específico
 * const event = await eventService.getEvent(id);
 *
 * // Crear evento
 * const newEvent = await eventService.createEvent({
 *   title: 'Taller de React',
 *   description: 'Aprende React desde cero',
 *   date: '2024-03-20',
 *   time: '15:00',
 *   location: 'San José',
 *   category: 'taller',
 *   organizer: 'SteamWomen',
 *   website: 'https://google.com',
 *   image: 'dummy.jpg',
 *   fullDescription: 'Descripción detallada...',
 *   requirements: ['Conocimientos básicos de JavaScript'],
 *   benefits: ['Certificado de participación'],
 *   applicationProcess: 'Enviar CV'
 * });
 *
 * // Actualizar evento
 * const updatedEvent = await eventService.updateEvent(id, {
 *   title: 'Nuevo título',
 *   description: 'Nueva descripción'
 * });
 *
 * // Eliminar evento
 * await eventService.deleteEvent(id);
 * ```
 */

import { client } from "@/backend-integration/api";
import {
  Event,
  CreateEventInput,
  UpdateEventInput,
} from "@/backend-integration/types";
import { GET_EVENTS_QUERY } from "@/backend-integration/graphql/queries";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "@/backend-integration/graphql/mutations";

export const getEvents = async (filter?: any): Promise<Event[]> => {
  const { data } = await client.query({
    query: GET_EVENTS_QUERY,
    variables: { filter },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.events;
};

export const getEvent = async (id: string): Promise<Event> => {
  const { data } = await client.query({
    query: GET_EVENTS_QUERY,
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

export const updateEvent = async (
  id: string,
  input: UpdateEventInput,
): Promise<Event> => {
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
