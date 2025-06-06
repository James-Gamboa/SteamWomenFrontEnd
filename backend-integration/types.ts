export interface User {
  id: string
  email: string
  role: 'student' | 'company' | 'admin'
  firstName: string
  lastName: string
  organizationName?: string
  isPrimaryAdmin?: boolean
  createdAt: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface SignUpInput {
  email: string
  password: string
  role: 'student' | 'company' | 'admin'
  firstName: string
  lastName: string
  organizationName?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface DashboardStats {
  totalUsers: number
  activeEvents: number
  totalOpportunities: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'EVENT' | 'OPPORTUNITY' | 'USER'
  title: string
  description: string
  createdAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl?: string
  createdAt: string
  createdBy: {
    id: string
    firstName: string
    lastName: string
    organizationName?: string
  }
}

export interface CreateEventInput {
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl?: string
}

export interface UpdateEventInput {
  title?: string
  description?: string
  date?: string
  time?: string
  location?: string
  imageUrl?: string
}

export interface Opportunity {
  id: string
  title: string
  description: string
  requirements: string[]
  location: string
  type: string
  salary?: string
  deadline: string
  createdAt: string
  company: {
    id: string
    organizationName: string
    firstName: string
    lastName: string
  }
}

export interface CreateOpportunityInput {
  title: string
  description: string
  requirements: string[]
  location: string
  type: string
  salary?: string
  deadline: string
}

export interface UpdateOpportunityInput {
  title?: string
  description?: string
  requirements?: string[]
  location?: string
  type?: string
  salary?: string
  deadline?: string
}

export interface CompanyProfile {
  id: string
  organizationName: string
  description: string
  website?: string
  location: string
  industry: string
  size: string
  founded: string
  logo?: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
}

export interface UpdateCompanyProfileInput {
  organizationName?: string
  description?: string
  website?: string
  location?: string
  industry?: string
  size?: string
  founded?: string
  logo?: string
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
}

export interface StudentProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location: string
  education: string[]
  skills: string[]
  experience: string[]
  interests: string[]
  resume?: string
  portfolio?: string
  socialMedia: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface UpdateStudentProfileInput {
  firstName?: string
  lastName?: string
  phone?: string
  location?: string
  education?: string[]
  skills?: string[]
  experience?: string[]
  interests?: string[]
  resume?: string
  portfolio?: string
  socialMedia?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface Application {
  id: string
  status: 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED'
  createdAt: string
  opportunity: {
    id: string
    title: string
    company: {
      organizationName: string
    }
  }
}

export interface CompanyApplication {
  id: string
  status: 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED'
  createdAt: string
  student: {
    id: string
    firstName: string
    lastName: string
    email: string
    resume?: string
  }
  opportunity: {
    id: string
    title: string
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
}

export type EventFilter = {
  search?: string
  date?: string
  location?: string
}

export type OpportunityFilter = {
  search?: string
  type?: string
  location?: string
  salary?: string
}

export interface UpdateUserInput {
  email?: string
  firstName?: string
  lastName?: string
  organizationName?: string
  isPrimaryAdmin?: boolean
}
