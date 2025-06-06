// TODO: Reemplazar con tipos y constantes de Django

export interface BaseItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  organizer: string;
  website?: string;
  fullDescription: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  company: string;
}

export interface Event extends BaseItem {
  time: string;
  type: "event";
}

export interface Opportunity extends BaseItem {
  requirements: string[];
  benefits: string[];
  applicationProcess: string;
  type: "opportunity";
}

export type ItemType = "event" | "opportunity";

export const CATEGORIES = {
  EVENT: [
    "Conferencia",
    "Taller",
    "Networking",
    "Hackathon",
    "Charla",
    "Panel",
    "Otro",
  ],
  OPPORTUNITY: [
    "Tiempo completo",
    "Medio tiempo",
    "Freelance",
    "Práctica",
    "Pasantía",
    "Otro",
  ],
} as const;

export const PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón"
] as const;

// TODO: Implementar con Django