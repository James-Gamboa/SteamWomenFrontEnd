export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  motivation_letter: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/applications/";

// Obtener todas las aplicaciones
export const getApplications = async (): Promise<Application[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) throw new Error("Error al obtener aplicaciones");

  return await response.json();
};

// Crear una nueva aplicación
export const createApplication = async (
  jobId: string,
  userId: string,
  motivationLetter: string
): Promise<Application> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_id: jobId,
      user_id: userId,
      motivation_letter: motivationLetter,
      status: "pending", // Estado inicial
    }),
  });

  if (!response.ok) throw new Error("Error al crear aplicación");

  return await response.json();
};

// Obtener aplicaciones de un usuario
export const getApplicationsByUser = async (userId: string): Promise<Application[]> => {
  const response = await fetch(`${API_BASE_URL}?user_id=${userId}`);

  if (!response.ok) throw new Error("Error al obtener aplicaciones por usuario");

  return await response.json();
};

// Obtener aplicaciones por oferta de trabajo
export const getApplicationsByJob = async (jobId: string): Promise<Application[]> => {
  const response = await fetch(`${API_BASE_URL}?job_id=${jobId}`);

  if (!response.ok) throw new Error("Error al obtener aplicaciones por trabajo");

  return await response.json();
};

// Actualizar el estado de una aplicación
export const updateApplicationStatus = async (applicationId: string, status: "accepted" | "rejected"): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}${applicationId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Error al actualizar estado de aplicación");

  return await response.json();
};
