/**
 * GraphQL Queries
 *
 * Flujo de datos:
 * 1. Los componentes llaman a los servicios (lib/services/*)
 * 2. Los servicios usan estas queries para obtener datos del backend
 * 3. Las queries se ejecutan a través del cliente Apollo (backend-integration/api.ts)
 *
 * Estructura de archivos:
 * - backend-integration/
 *   ├── api.ts (Configuración del cliente Apollo)
 *   ├── graphql/
 *   │   ├── queries.ts (Este archivo - Queries para obtener datos)
 *   │   └── mutations.ts (Operaciones de escritura)
 *   └── types.ts (Tipos compartidos)
 *
 * - lib/services/
 *   ├── user-service.ts (Servicios de usuario)
 *   ├── event-service.ts (Servicios de eventos)
 *   └── opportunity-service.ts (Servicios de oportunidades)
 */

import { gql } from "@apollo/client";

export const GET_EVENTS_QUERY = gql`
  query {
    allEvents {
      id
      title
      date
      location
      company {
        nameCompany
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
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

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      totalUsers
      activeEvents
      totalOpportunities
      recentActivities {
        id
        type
        title
        description
        createdAt
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($filter: EventFilterInput) {
    events(filter: $filter) {
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

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
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

export const GET_OPPORTUNITIES = gql`
  query GetOpportunities($filter: OpportunityFilterInput) {
    opportunities(filter: $filter) {
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

export const GET_OPPORTUNITY = gql`
  query GetOpportunity($id: ID!) {
    opportunity(id: $id) {
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

export const GET_COMPANY_PROFILE = gql`
  query GetCompanyProfile {
    companyProfile {
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

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile {
    studentProfile {
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

export const GET_STUDENT_APPLICATIONS = gql`
  query GetStudentApplications {
    studentApplications {
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

export const GET_COMPANY_APPLICATIONS = gql`
  query GetCompanyApplications {
    companyApplications {
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

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
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

export const GET_USERS = gql`
  query GetUsers {
    users {
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
