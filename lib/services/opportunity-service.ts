/**
 * Opportunity Service
 *
 * Este servicio maneja todas las operaciones relacionadas con oportunidades usando GraphQL.
 *
 * Ejemplo de uso en componentes:
 * ```typescript
 * // En un componente
 * import { opportunityService } from '@/lib/services/opportunity-service';
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

// TODO: Reemplazar con conexión a Django

import { client } from "@/backend-integration/api";
import {
  Opportunity,
  CreateOpportunityInput,
  UpdateOpportunityInput,
} from "@/backend-integration/types";
import {
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
} from "@/backend-integration/graphql/queries";
import {
  CREATE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
} from "@/backend-integration/graphql/mutations";

export const getOpportunities = async (
  filter?: any,
): Promise<Opportunity[]> => {
  const { data } = await client.query({
    query: GET_OPPORTUNITIES,
    variables: { filter },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.opportunities;
};

export const getOpportunity = async (id: string): Promise<Opportunity> => {
  const { data } = await client.query({
    query: GET_OPPORTUNITY,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.opportunity;
};

export const createOpportunity = async (
  input: CreateOpportunityInput,
): Promise<Opportunity> => {
  const { data } = await client.mutate({
    mutation: CREATE_OPPORTUNITY,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.createOpportunity;
};

export const updateOpportunity = async (
  id: string,
  input: UpdateOpportunityInput,
): Promise<Opportunity> => {
  const { data } = await client.mutate({
    mutation: UPDATE_OPPORTUNITY,
    variables: { id, input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.updateOpportunity;
};

export const deleteOpportunity = async (id: string): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: DELETE_OPPORTUNITY,
    variables: { id },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.deleteOpportunity;
};
