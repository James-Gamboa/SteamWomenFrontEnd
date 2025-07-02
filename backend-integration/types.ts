export interface User {
  id: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  role: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  createdAt: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  roles: string[];
}

export interface DashboardStats {
  totalUsers: number;
  activeEvents: number;
  totalOpportunities: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: "EVENT" | "OPPORTUNITY" | "USER";
  title: string;
  description: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  website?: string;
  image?: string;
  requirements: string[];
  benefits: string[];
  applicationProcess?: string;
  createdAt: string;
  company: {
    id: string;
    nameCompany: string;
  };
}

export interface CreateEventInput {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category?: string;
  image?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
  companyId: number;
  requirements?: string[];
  benefits?: string[];
  applicationProcess?: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  fullDescription?: string;
  category?: string;
  image?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
  requirements?: string[];
  benefits?: string[];
  applicationProcess?: string;
  isActive?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  website?: string;
  slug: string;
  image?: string;
  requirements: string[];
  benefits: string[];
  applicationProcess?: string;
  createdAt: string;
  company: {
    id: string;
    nameCompany: string;
  };
}

export interface CreateOpportunityInput {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  category?: string;
  image?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
  companyId: number;
  requirements?: string[];
  benefits?: string[];
  applicationProcess?: string;
}

export interface UpdateOpportunityInput {
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  fullDescription?: string;
  category?: string;
  image?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
  requirements?: string[];
  benefits?: string[];
  applicationProcess?: string;
  isActive?: boolean;
}

export interface Company {
  id: string;
  nameCompany: string;
  email: string;
  phone?: string;
  website?: string;
  slug: string;
}

export interface CreateCompanyInput {
  nameCompany: string;
  slug: string;
  email: string;
  phone?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
}

export interface UpdateCompanyInput {
  nameCompany?: string;
  email?: string;
  phone?: string;
  website?: string;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
}

export interface UserProfile {
  id: string;
  role: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  createdAt: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateUserProfileInput {
  userId: number;
  slug: string;
  descripcion?: string;
  cvUrl?: string;
  linkedinUrl?: string;
  role: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
}

export interface UpdateUserProfileInput {
  descripcion?: string;
  cvUrl?: string;
  linkedinUrl?: string;
  role?: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  provinciaId?: number;
  cantonId?: number;
  distritoId?: number;
}

export interface Application {
  id: string;
  status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  student: {
    id: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
  };
  event?: {
    id: string;
    title: string;
    company: {
      nameCompany: string;
    };
  };
  opportunity?: {
    id: string;
    title: string;
    company: {
      nameCompany: string;
    };
  };
}

export interface CreateApplicationInput {
  eventId?: string;
  opportunityId?: string;
  studentEmail: string;
  studentId: number;
}

export interface CompanyApplication {
  id: string;
  status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  student: {
    id: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
    };
  };
  event?: {
    id: string;
    title: string;
  };
  opportunity?: {
    id: string;
    title: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type EventFilter = {
  search?: string;
  date?: string;
  location?: string;
};

export type OpportunityFilter = {
  search?: string;
  type?: string;
  location?: string;
  salary?: string;
};

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
}
