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

import { Event, CreateEventInput, UpdateEventInput } from "@/backend-integration/types";

const API_BASE_URL = "http://127.0.0.1:8000/api/eventos/";

// Obtener todos los eventos
export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) throw new Error("Error al obtener eventos");

  return await response.json();
};

// Obtener un evento por ID
export const getEvent = async (id: string): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}${id}/`);

  if (!response.ok) throw new Error("Error al obtener evento");

  return await response.json();
};

// Crear un nuevo evento
export const createEvent = async (input: CreateEventInput): Promise<Event> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Error al crear evento");

  return await response.json();
};

// Actualizar un evento existente
export const updateEvent = async (id: string, input: UpdateEventInput): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Error al actualizar evento");

  return await response.json();
};

// Eliminar un evento
export const deleteEvent = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar evento");

  return true;
};
