// TODO: Reemplazar con conexión a Django

import { client } from '@/backend-integration/api';
import { Opportunity, CreateOpportunityInput, UpdateOpportunityInput } from '@/backend-integration/types';
import { GET_OPPORTUNITIES, GET_OPPORTUNITY } from '@/backend-integration/graphql/queries';
import { CREATE_OPPORTUNITY, UPDATE_OPPORTUNITY, DELETE_OPPORTUNITY } from '@/backend-integration/graphql/mutations';

export const getOpportunities = async (filter?: any): Promise<Opportunity[]> => {
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

export const createOpportunity = async (input: CreateOpportunityInput): Promise<Opportunity> => {
  const { data } = await client.mutate({
    mutation: CREATE_OPPORTUNITY,
    variables: { input },
  });

  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.createOpportunity;
};

export const updateOpportunity = async (id: string, input: UpdateOpportunityInput): Promise<Opportunity> => {
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