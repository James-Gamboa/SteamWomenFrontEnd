/**
 * User Service
 * 
 * Este servicio maneja todas las operaciones relacionadas con usuarios usando GraphQL.
 * 
 * Ejemplo de uso en componentes:
 * ```typescript
 * // En un componente
 * import { userService } from '@/lib/services/user-service';
 * 
 * // Obtener usuarios
 * const users = await userService.getUsers();
 * 
 * // Crear usuario
 * const newUser = await userService.createUser({
 *   email: 'usuario@gmail.com',
 *   password: '123456',
 *   firstName: 'James',
 *   lastName: 'Guevara'
 * });
 * 
 * // Actualizar usuario
 * const updatedUser = await userService.updateUser(id, {
 *   firstName: 'Juan',
 *   lastName: 'Pérez'
 * });
 * 
 * // Eliminar usuario
 * await userService.deleteUser(id);
 * ```
 */



import { User, SignUpInput, UpdateUserInput } from "@/backend-integration/types";


const API_BASE_URL = "http://127.0.0.1:8000/api/usuarios/";

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) throw new Error("Error al obtener usuarios");

  return await response.json();
};

// Obtener un usuario por ID
export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}${id}/`);

  if (!response.ok) throw new Error("Error al obtener usuario");

  return await response.json();
};

// Crear un nuevo usuario
export const createUser = async (input: SignUpInput): Promise<User> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Error al crear usuario");

  return await response.json();
};

// Actualizar un usuario existente
export const updateUser = async (id: string, input: UpdateUserInput): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Error al actualizar usuario");

  return await response.json();
};

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar usuario");

  return true;
};
