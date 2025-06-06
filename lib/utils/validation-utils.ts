// TODO: Reemplazar con validación desde Django
export interface ValidationError {
  field: string;
  message: string;
}

export const validateEvent = (event: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!event.title?.trim()) {
    errors.push({ field: "title", message: "El título es requerido" });
  }

  if (!event.description?.trim()) {
    errors.push({ field: "description", message: "La descripción es requerida" });
  }

  if (!event.location?.trim()) {
    errors.push({ field: "location", message: "La ubicación es requerida" });
  }

  if (!event.date?.trim()) {
    errors.push({ field: "date", message: "La fecha es requerida" });
  } else if (!isValidDate(event.date)) {
    errors.push({ field: "date", message: "Formato de fecha inválido (YYYY-MM-DD)" });
  }

  if (!event.time?.trim()) {
    errors.push({ field: "time", message: "La hora es requerida" });
  }

  if (!event.category?.trim()) {
    errors.push({ field: "category", message: "La categoría es requerida" });
  }

  if (!event.organizer?.trim()) {
    errors.push({ field: "organizer", message: "El organizador es requerido" });
  }

  return errors;
};

export const validateOpportunity = (opportunity: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!opportunity.title?.trim()) {
    errors.push({ field: "title", message: "El título es requerido" });
  }

  if (!opportunity.description?.trim()) {
    errors.push({ field: "description", message: "La descripción es requerida" });
  }

  if (!opportunity.location?.trim()) {
    errors.push({ field: "location", message: "La ubicación es requerida" });
  }

  if (!opportunity.date?.trim()) {
    errors.push({ field: "date", message: "La fecha es requerida" });
  } else if (!isValidDate(opportunity.date)) {
    errors.push({ field: "date", message: "Formato de fecha inválido (YYYY-MM-DD)" });
  }

  if (!opportunity.category?.trim()) {
    errors.push({ field: "category", message: "La categoría es requerida" });
  }

  if (!opportunity.organizer?.trim()) {
    errors.push({ field: "organizer", message: "La empresa es requerida" });
  }

  if (!opportunity.requirements?.length) {
    errors.push({ field: "requirements", message: "Los requisitos son requeridos" });
  }

  if (!opportunity.benefits?.length) {
    errors.push({ field: "benefits", message: "Los beneficios son requeridos" });
  }

  if (!opportunity.applicationProcess?.trim()) {
    errors.push({ field: "applicationProcess", message: "El proceso de aplicación es requerido" });
  }

  return errors;
};

const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// TODO: Implementar con Django