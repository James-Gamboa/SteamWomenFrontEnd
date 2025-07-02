import { gql } from "@apollo/client";

// ============================================================================
// AUTENTICACIÓN
// ============================================================================

export const CUSTOM_LOGIN = gql`
  mutation CustomLogin($username: String!, $password: String!) {
    customLogin(username: $username, password: $password) {
      refresh
      access
      roles
    }
  }
`;

// ============================================================================
// EVENTOS
// ============================================================================

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $slug: String!
    $description: String!
    $fullDescription: String
    $date: Date!
    $time: Time!
    $location: String!
    $category: String
    $image: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
    $companyId: Int!
    $requirements: [String]
    $benefits: [String]
    $applicationProcess: String
  ) {
    createEvent(
      title: $title
      slug: $slug
      description: $description
      fullDescription: $fullDescription
      date: $date
      time: $time
      location: $location
      category: $category
      image: $image
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
      companyId: $companyId
      requirements: $requirements
      benefits: $benefits
      applicationProcess: $applicationProcess
    ) {
      event {
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
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $description: String
    $location: String
    $date: Date
    $time: Time
    $fullDescription: String
    $category: String
    $image: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
    $requirements: [String]
    $benefits: [String]
    $applicationProcess: String
    $isActive: Boolean
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      location: $location
      date: $date
      time: $time
      fullDescription: $fullDescription
      category: $category
      image: $image
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
      requirements: $requirements
      benefits: $benefits
      applicationProcess: $applicationProcess
      isActive: $isActive
    ) {
      event {
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
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      ok
    }
  }
`;

// ============================================================================
// OPORTUNIDADES
// ============================================================================

export const CREATE_OPPORTUNITY = gql`
  mutation CreateOpportunity(
    $title: String!
    $slug: String!
    $description: String!
    $fullDescription: String
    $date: Date!
    $time: Time!
    $location: String!
    $category: String
    $image: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
    $companyId: Int!
    $requirements: [String]
    $benefits: [String]
    $applicationProcess: String
  ) {
    createOpportunity(
      title: $title
      slug: $slug
      description: $description
      fullDescription: $fullDescription
      date: $date
      time: $time
      location: $location
      category: $category
      image: $image
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
      companyId: $companyId
      requirements: $requirements
      benefits: $benefits
      applicationProcess: $applicationProcess
    ) {
      opportunity {
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
  }
`;

export const UPDATE_OPPORTUNITY = gql`
  mutation UpdateOpportunity(
    $id: ID!
    $title: String
    $description: String
    $location: String
    $date: Date
    $time: Time
    $fullDescription: String
    $category: String
    $image: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
    $requirements: [String]
    $benefits: [String]
    $applicationProcess: String
    $isActive: Boolean
  ) {
    updateOpportunity(
      id: $id
      title: $title
      description: $description
      location: $location
      date: $date
      time: $time
      fullDescription: $fullDescription
      category: $category
      image: $image
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
      requirements: $requirements
      benefits: $benefits
      applicationProcess: $applicationProcess
      isActive: $isActive
    ) {
      opportunity {
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
  }
`;

export const DELETE_OPPORTUNITY = gql`
  mutation DeleteOpportunity($id: ID!) {
    deleteOpportunity(id: $id) {
      ok
    }
  }
`;

// ============================================================================
// APLICACIONES
// ============================================================================

export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $eventId: ID
    $opportunityId: ID
    $studentEmail: String!
    $studentId: Int!
  ) {
    createApplication(
      eventId: $eventId
      opportunityId: $opportunityId
      studentEmail: $studentEmail
      studentId: $studentId
    ) {
      application {
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
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      ok
    }
  }
`;

// ============================================================================
// PERFILES DE USUARIO
// ============================================================================

export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile(
    $userId: Int!
    $slug: String!
    $descripcion: String
    $cvUrl: String
    $linkedinUrl: String
    $role: String!
    $organizationName: String
    $isPrimaryAdmin: Boolean
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
  ) {
    createUserProfile(
      userId: $userId
      slug: $slug
      descripcion: $descripcion
      cvUrl: $cvUrl
      linkedinUrl: $linkedinUrl
      role: $role
      organizationName: $organizationName
      isPrimaryAdmin: $isPrimaryAdmin
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
    ) {
      profile {
        id
        role
        organizationName
        isPrimaryAdmin
        createdAt
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: ID!
    $descripcion: String
    $cvUrl: String
    $linkedinUrl: String
    $role: String
    $organizationName: String
    $isPrimaryAdmin: Boolean
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
  ) {
    updateUserProfile(
      id: $id
      descripcion: $descripcion
      cvUrl: $cvUrl
      linkedinUrl: $linkedinUrl
      role: $role
      organizationName: $organizationName
      isPrimaryAdmin: $isPrimaryAdmin
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
    ) {
      profile {
        id
        role
        organizationName
        isPrimaryAdmin
        createdAt
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

export const DELETE_USER_PROFILE = gql`
  mutation DeleteUserProfile($id: ID!) {
    deleteUserProfile(id: $id) {
      ok
    }
  }
`;

// ============================================================================
// EMPRESAS
// ============================================================================

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $nameCompany: String!
    $slug: String!
    $email: String!
    $phone: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
  ) {
    createCompany(
      nameCompany: $nameCompany
      slug: $slug
      email: $email
      phone: $phone
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
    ) {
      company {
        id
        nameCompany
        email
        phone
        website
        slug
      }
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: ID!
    $nameCompany: String
    $email: String
    $phone: String
    $website: String
    $provinciaId: Int
    $cantonId: Int
    $distritoId: Int
  ) {
    updateCompany(
      id: $id
      nameCompany: $nameCompany
      email: $email
      phone: $phone
      website: $website
      provinciaId: $provinciaId
      cantonId: $cantonId
      distritoId: $distritoId
    ) {
      company {
        id
        nameCompany
        email
        phone
        website
        slug
      }
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      ok
    }
  }
`;
