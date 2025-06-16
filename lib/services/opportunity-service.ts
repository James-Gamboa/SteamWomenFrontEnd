/**
 * Opportunity Service
 * 
 * Este servicio maneja todas las operaciones relacionadas con oportunidades usando la API REST de Django.
 * 
 * Ejemplo de uso en componentes:
 * ```typescript
 *  En un componente
 import { opportunityService } from '@/lib/services/opportunity-service';
 * 
 * // Obtener oportunidades
 * const opportunities = await opportunityService.getOpportunities();
 * 
 * // Obtener una oportunidad específica
 * const opportunity = await opportunityService.getOpportunity(id);
 * 
 * // Crear oportunidad
 * const newOpportunity = await opportunityService.createOpportunity({
 *   title: 'Desarrollador Frontend',
 *   description: 'Buscamos desarrollador React',
 *   date: '2024-03-20',
 *   time: '09:00',
 *   location: 'San José',
 *   category: 'tiempo completo',
 *   organizer: 'Empresa XYZ',
 *   website: 'https://google.com',
 *   slug: 'desarrollador-frontend',
 *   image: 'dummy.jpg',
 *   fullDescription: 'Descripción detallada...',
 *   requirements: ['2 años de experiencia en React'],
 *   benefits: ['Salario competitivo'],
 *   applicationProcess: 'Enviar CV y portafolio'
 * });
 * 
 * // Actualizar oportunidad
 * const updatedOpportunity = await opportunityService.updateOpportunity(id, {
 *   title: 'Nuevo título',
 *   description: 'Nueva descripción'
 * });
 * 
 * // Eliminar oportunidad
 * await opportunityService.deleteOpportunity(id);
 * ```
 */

/**
 * Opportunity Service
 * 
 * Este servicio maneja todas las operaciones relacionadas con oportunidades usando la API REST de Django.
 */
import { Opportunity, CreateOpportunityInput, UpdateOpportunityInput } from '@/backend-integration/types';


const API_BASE_URL = 'http://127.0.0.1:8000/api/oportunidades/';

// Obtener todas las oportunidades
export const getOpportunities = async (): Promise<Opportunity[]> => {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) throw new Error('Error al obtener oportunidades');
  
  return await response.json();
};

// Obtener una oportunidad por ID
export const getOpportunity = async (id: number): Promise<Opportunity> => {
  const response = await fetch(`${API_BASE_URL}${id}/`);
  
  if (!response.ok) throw new Error('Error al obtener oportunidad');
  
  return await response.json();
};

// Crear nueva oportunidad
export const createOpportunity = async (input: CreateOpportunityInput): Promise<Opportunity> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error('Error al crear oportunidad');
  
  return await response.json();
};

// Actualizar oportunidad existente
export const updateOpportunity = async (id: number, input: UpdateOpportunityInput): Promise<Opportunity> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error('Error al actualizar oportunidad');
  
  return await response.json();
};

// Eliminar una oportunidad
export const deleteOpportunity = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error al eliminar oportunidad');

  return true;
};
getOpportunities().then(data => console.log("Oportunidades:", data));
getOpportunity(1).then(data => console.log("Oportunidad específica:", data));
