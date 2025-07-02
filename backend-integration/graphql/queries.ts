import { gql } from "@apollo/client";

// ============================================================================
// QUERIES BÁSICAS
// ============================================================================

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
      user {
        id
        email
        firstName
        lastName
      }
      role
      organizationName
      isPrimaryAdmin
      createdAt
    }
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats
  }
`;

// ============================================================================
// EVENTOS
// ============================================================================

export const GET_EVENTS = gql`
  query GetEvents($filter: String) {
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
      company {
        id
        nameCompany
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
      company {
        id
        nameCompany
      }
    }
  }
`;

// ============================================================================
// OPORTUNIDADES
// ============================================================================

export const GET_OPPORTUNITIES = gql`
  query GetOpportunities($filter: String) {
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
        nameCompany
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
        nameCompany
      }
    }
  }
`;

// ============================================================================
// PERFILES
// ============================================================================

export const GET_COMPANY_PROFILE = gql`
  query GetCompanyProfile($id: ID!) {
    companyProfile(id: $id) {
      id
      nameCompany
      email
      phone
      website
      slug
    }
  }
`;

export const GET_STUDENT_PROFILE = gql`
  query GetStudentProfile {
    me {
      id
      user {
        id
        email
        firstName
        lastName
      }
      role
      descripcion
      cvUrl
      linkedinUrl
    }
  }
`;

// ============================================================================
// APLICACIONES
// ============================================================================

export const GET_STUDENT_APPLICATIONS = gql`
  query GetStudentApplications($studentId: ID!) {
    studentApplications(studentId: $studentId) {
      id
      status
      createdAt
      event {
        id
        title
        company {
          nameCompany
        }
      }
      opportunity {
        id
        title
        company {
          nameCompany
        }
      }
    }
  }
`;

export const GET_COMPANY_APPLICATIONS = gql`
  query GetCompanyApplications($companyId: ID!) {
    companyApplications(companyId: $companyId) {
      id
      status
      createdAt
      student {
        id
        user {
          email
          firstName
          lastName
        }
      }
      event {
        id
        title
      }
      opportunity {
        id
        title
      }
    }
  }
`;

export const GET_ALL_APPLICATIONS = gql`
  query GetAllApplications {
    allApplications {
      id
      status
      createdAt
      student {
        id
        user {
          email
          firstName
          lastName
        }
      }
      event {
        id
        title
        company {
          nameCompany
        }
      }
      opportunity {
        id
        title
        company {
          nameCompany
        }
      }
    }
  }
`;

// ============================================================================
// USUARIOS
// ============================================================================

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      user {
        id
        email
        firstName
        lastName
      }
      role
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
      user {
        id
        email
        firstName
        lastName
      }
      role
      organizationName
      isPrimaryAdmin
      createdAt
    }
  }
`;

// ============================================================================
// EMPRESAS
// ============================================================================

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    allCompanies {
      id
      nameCompany
      email
      phone
      website
      slug
    }
  }
`;

export const GET_COMPANIES = gql`
  query GetCompanies {
    allCompanies {
      id
      nameCompany
      email
      phone
      website
      slug
    }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id
      nameCompany
      email
      phone
      website
      slug
    }
  }
`;
