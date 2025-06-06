// TODO: Reemplazar con constantes de Django

export const STORAGE_KEYS = {
  EVENTS: "events",
  OPPORTUNITIES: "opportunities",
  APPLICATIONS: "applications",
  USERS: "users",
  COMPANIES: "companies",
  AUTH: "auth",
  SETTINGS: "settings",
} as const;

export const API_ENDPOINTS = {
  EVENTS: "/api/events/",
  OPPORTUNITIES: "/api/opportunities/",
  APPLICATIONS: "/api/applications/",
  USERS: "/api/users/",
  COMPANIES: "/api/companies/",
  AUTH: {
    LOGIN: "/api/auth/login/",
    REGISTER: "/api/auth/register/",
    LOGOUT: "/api/auth/logout/",
    REFRESH: "/api/auth/token/refresh/",
    VERIFY: "/api/auth/token/verify/",
  },
} as const;

// TODO: Implementar con Django
