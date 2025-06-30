// TODO: Reemplazar con conexión a Django
export interface User {
  id: string;
  email: string;
  password: string;
  role: "student" | "company" | "admin";
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
  createdAt: string;
}

const defaultUsers: User[] = [
  {
    id: "1",
    email: "jjguevarag@gmail.com",
    password: "admin",
    role: "admin",
    firstName: "James",
    lastName: "Guevara",
    isPrimaryAdmin: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "james@gmail.com",
    password: "123456",
    role: "student",
    firstName: "James",
    lastName: "Student",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "jjgamboag@gmail.com",
    password: "123456",
    role: "company",
    firstName: "James",
    lastName: "Guevara",
    organizationName: "STEAM WOMEN",
    createdAt: new Date().toISOString(),
  },
];

const readUsers = (): User[] => {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const DB_FILE_PATH = path.join(process.cwd(), "data", "users.json");

      if (fs.existsSync(DB_FILE_PATH)) {
        const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
        return JSON.parse(data);
      } else {
        const ensureDbFile = () => {
          const dir = path.dirname(DB_FILE_PATH);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          if (!fs.existsSync(DB_FILE_PATH)) {
            fs.writeFileSync(
              DB_FILE_PATH,
              JSON.stringify(defaultUsers, null, 2),
            );
          }
        };
        ensureDbFile();
        return defaultUsers;
      }
    } catch (error) {
      console.error("Error reading users from file:", error);
      return defaultUsers;
    }
  }

  try {
    const stored = localStorage.getItem("users");
    if (!stored) {
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const parsedUsers = JSON.parse(stored);

    const mergedUsers = [...defaultUsers];
    parsedUsers.forEach((user: User) => {
      const existingIndex = mergedUsers.findIndex(
        (u) => u.email === user.email,
      );
      if (existingIndex >= 0) {
        mergedUsers[existingIndex] = { ...mergedUsers[existingIndex], ...user };
      } else {
        mergedUsers.push(user);
      }
    });

    localStorage.setItem("users", JSON.stringify(mergedUsers));
    return mergedUsers;
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return defaultUsers;
  }
};

const writeUsers = (users: User[]): void => {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const DB_FILE_PATH = path.join(process.cwd(), "data", "users.json");

      const ensureDbFile = () => {
        const dir = path.dirname(DB_FILE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      };

      ensureDbFile();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error("Error writing users to file:", error);
      throw new Error("Error al guardar los usuarios en el archivo");
    }
    return;
  }

  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error writing users to localStorage:", error);
    throw new Error("Error al guardar los usuarios");
  }
};

export const mockDb = {
  initializeDefaultUsers: (): void => {
    try {
      writeUsers(defaultUsers);
      console.log("Default users initialized successfully");
    } catch (error) {
      console.error("Error initializing default users:", error);
      throw new Error("Error al inicializar usuarios por defecto");
    }
  },

  getAllUsers: (): User[] => {
    try {
      return readUsers();
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  },

  saveUsers: (users: User[]): void => {
    try {
      if (!Array.isArray(users)) {
        throw new Error("Los datos de usuarios no son válidos");
      }
      writeUsers(users);
    } catch (error) {
      console.error("Error saving users:", error);
      throw new Error(
        "Error al guardar los usuarios. Por favor, intente nuevamente.",
      );
    }
  },

  createUser: (userData: Omit<User, "id" | "createdAt">): User => {
    try {
      if (!userData.email || !userData.password || !userData.role) {
        throw new Error("Faltan campos requeridos");
      }

      const users = mockDb.getAllUsers();

      if (
        users.some(
          (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
        )
      ) {
        throw new Error("El correo electrónico ya está registrado");
      }

      const generateUniqueId = (): string => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${timestamp}-${random}`;
      };

      let newId = generateUniqueId();
      while (users.some((user) => user.id === newId)) {
        newId = generateUniqueId();
      }

      const newUser: User = {
        ...userData,
        id: newId,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      mockDb.saveUsers(updatedUsers);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  findUserByEmail: (email: string): User | undefined => {
    try {
      const users = mockDb.getAllUsers();
      return users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );
    } catch (error) {
      console.error("Error finding user:", error);
      return undefined;
    }
  },

  validateLogin: (email: string, password: string): User => {
    try {
      console.log("Validating login for:", email);
      const users = mockDb.getAllUsers();
      console.log("Current users in DB:", users);

      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      console.log("Found user:", user);

      if (!user) {
        console.error("Invalid credentials for:", email);
        throw new Error("Credenciales inválidas");
      }
      return user;
    } catch (error) {
      console.error("Error validating login:", error);
      throw error;
    }
  },

  getAdminCredentials: (): User | undefined => {
    try {
      const users = mockDb.getAllUsers();
      return users.find((user) => user.role === "admin");
    } catch (error) {
      console.error("Error getting admin credentials:", error);
      return undefined;
    }
  },

  assignAdminRole: (
    email: string,
    assignedBy: string,
  ): { success: boolean; error?: string } => {
    try {
      const users = mockDb.getAllUsers();
      const assigner = users.find((user) => user.email === assignedBy);

      if (!assigner || assigner.role !== "admin") {
        return {
          success: false,
          error:
            "Solo los administradores pueden asignar roles de administrador",
        };
      }

      const userToUpdate = users.find((user) => user.email === email);
      if (!userToUpdate) {
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      if (userToUpdate.role === "admin") {
        return {
          success: false,
          error: "El usuario ya es administrador",
        };
      }

      userToUpdate.role = "admin";
      mockDb.saveUsers(users);

      return { success: true };
    } catch (error) {
      console.error("Error assigning admin role:", error);
      return {
        success: false,
        error: "Error al asignar el rol de administrador",
      };
    }
  },

  removeAdminRole: (
    email: string,
    removedBy: string,
  ): { success: boolean; error?: string } => {
    try {
      const users = mockDb.getAllUsers();
      const remover = users.find((user) => user.email === removedBy);

      if (!remover || remover.role !== "admin") {
        return {
          success: false,
          error:
            "Solo los administradores pueden remover roles de administrador",
        };
      }

      const userToUpdate = users.find((user) => user.email === email);
      if (!userToUpdate) {
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      if (userToUpdate.role !== "admin") {
        return {
          success: false,
          error: "El usuario no es administrador",
        };
      }

      if (userToUpdate.isPrimaryAdmin) {
        return {
          success: false,
          error: "No se puede remover el rol del administrador principal",
        };
      }

      userToUpdate.role = "student";
      mockDb.saveUsers(users);

      return { success: true };
    } catch (error) {
      console.error("Error removing admin role:", error);
      return {
        success: false,
        error: "Error al remover el rol de administrador",
      };
    }
  },

  deleteUser: (
    email: string,
    deletedBy: string,
  ): { success: boolean; error?: string } => {
    try {
      const users = mockDb.getAllUsers();
      const deleter = users.find((user) => user.email === deletedBy);

      if (!deleter || deleter.role !== "admin") {
        return {
          success: false,
          error: "Solo los administradores pueden eliminar usuarios",
        };
      }

      const userToDelete = users.find((user) => user.email === email);
      if (!userToDelete) {
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      if (userToDelete.isPrimaryAdmin) {
        return {
          success: false,
          error: "No se puede eliminar el administrador principal",
        };
      }

      const updatedUsers = users.filter((user) => user.email !== email);
      mockDb.saveUsers(updatedUsers);

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        success: false,
        error: "Error al eliminar el usuario",
      };
    }
  },
};
