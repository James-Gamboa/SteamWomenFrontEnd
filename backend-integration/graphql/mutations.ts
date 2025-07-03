/**
 * GraphQL Mutations
 *
 * Flujo de operaciones:
 * 1. Los componentes llaman a los servicios (lib/services/*)
 * 2. Los servicios usan estas mutations para modificar datos
 * 3. Las mutations se ejecutan a través del cliente Apollo (backend-integration/api.ts)
 *
 * Tipos de operaciones:
 * - CREATE_*: Crear nuevos registros
 * - UPDATE_*: Modificar registros existentes
 * - DELETE_*: Eliminar registros
 *
 *
 * Ejemplo de uso en servicios:
 * ```typescript
 * const createUser = async (input: SignUpInput) => {
 *   const { data } = await client.mutate({
 *     mutation: CREATE_USER,
 *     variables: { input }
 *   });
 *   return data.createUser;
 * };
 * ```
 */

import { gql } from "@apollo/client";

export const UPDATE_EVENT_MUTATION = `
  mutation UpdateEvent($id: ID!, $input: EventInput!) {
    updateEvent(id: $id, input: $input) {
      event {
        id
        title
      }
    }
  }
`;

export const DELETE_EVENT_MUTATION = `
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      ok
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        role
        firstName
        lastName
        organizationName
        isPrimaryAdmin
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        email
        role
        firstName
        lastName
        organizationName
        isPrimaryAdmin
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      fullDescription
      date
      time
      location
      category
      organizer
      website
      image
      requirements
      benefits
      applicationProcess
      createdAt
      createdBy {
        id
        firstName
        lastName
        organizationName
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      title
      description
      fullDescription
      date
      time
      location
      category
      organizer
      website
      image
      requirements
      benefits
      applicationProcess
      createdAt
      createdBy {
        id
        firstName
        lastName
        organizationName
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const CREATE_OPPORTUNITY = gql`
  mutation CreateOpportunity($input: CreateOpportunityInput!) {
    createOpportunity(input: $input) {
      id
      title
      description
      fullDescription
      date
      time
      location
      category
      organizer
      website
      slug
      image
      requirements
      benefits
      applicationProcess
      createdAt
      company {
        id
        organizationName
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_OPPORTUNITY = gql`
  mutation UpdateOpportunity($id: ID!, $input: UpdateOpportunityInput!) {
    updateOpportunity(id: $id, input: $input) {
      id
      title
      description
      fullDescription
      date
      time
      location
      category
      organizer
      website
      slug
      image
      requirements
      benefits
      applicationProcess
      createdAt
      company {
        id
        organizationName
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_OPPORTUNITY = gql`
  mutation DeleteOpportunity($id: ID!) {
    deleteOpportunity(id: $id)
  }
`;

export const UPDATE_COMPANY_PROFILE = gql`
  mutation UpdateCompanyProfile($input: UpdateCompanyProfileInput!) {
    updateCompanyProfile(input: $input) {
      id
      organizationName
      description
      website
      location
      industry
      size
      founded
      logo
    }
  }
`;

export const UPDATE_STUDENT_PROFILE = gql`
  mutation UpdateStudentProfile($input: UpdateStudentProfileInput!) {
    updateStudentProfile(input: $input) {
      id
      firstName
      lastName
      email
      phone
      location
      education
      skills
      experience
      interests
      resume
      portfolio
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      id
      status
      createdAt
      opportunity {
        id
        title
        company {
          organizationName
        }
      }
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation UpdateApplication($id: ID!, $input: UpdateApplicationInput!) {
    updateApplication(id: $id, input: $input) {
      id
      status
      createdAt
      student {
        id
        firstName
        lastName
        email
        resume
      }
      opportunity {
        id
        title
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      role
      firstName
      lastName
      organizationName
      isPrimaryAdmin
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      role
      firstName
      lastName
      organizationName
      isPrimaryAdmin
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
