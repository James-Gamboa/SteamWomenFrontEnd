import fs from 'fs';
import path from 'path';

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

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

const defaultUsers: User[] = [
  {
    id: "1",
    email: "jjguevarag@gmail.com",
    password: "admin",
    role: "admin",
    firstName: "James",
    lastName: "Guevara",
    isPrimaryAdmin: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "james@gmail.com",
    password: "123456",
    role: "student",
    firstName: "James",
    lastName: "Student",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    email: "jjgamboag@gmail.com",
    password: "123456",
    role: "company",
    firstName: "James",
    lastName: "Guevara",
    organizationName: "Steam Women",
    createdAt: new Date().toISOString()
  }
];

const ensureDbFile = () => {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    writeUsers(defaultUsers);
  }
};

const readUsers = (): User[] => {
  try {
    ensureDbFile();
    const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

const writeUsers = (users: User[]): void => {
  try {
    ensureDbFile();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users:', error);
    throw new Error('Error al guardar los usuarios');
  }
};

export const mockDb = {
  initializeDefaultUsers: (): void => {
    try {
      writeUsers(defaultUsers);
      console.log('Default users initialized successfully');
    } catch (error) {
      console.error('Error initializing default users:', error);
      throw new Error('Error al inicializar usuarios por defecto');
    }
  },

  getAllUsers: (): User[] => {
    try {
      return readUsers();
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  saveUsers: (users: User[]): void => {
    try {
      if (!Array.isArray(users)) {
        throw new Error('Los datos de usuarios no son válidos');
      }
      writeUsers(users);
    } catch (error) {
      console.error('Error saving users:', error);
      throw new Error('Error al guardar los usuarios. Por favor, intente nuevamente.');
    }
  },

  createUser: (userData: Omit<User, "id" | "createdAt">): User => {
    try {
      if (!userData.email || !userData.password || !userData.role) {
        throw new Error('Faltan campos requeridos');
      }

      const users = mockDb.getAllUsers();

      if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('El correo electrónico ya está registrado');
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...users, newUser];
      mockDb.saveUsers(updatedUsers);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  findUserByEmail: (email: string): User | undefined => {
    try {
      const users = mockDb.getAllUsers();
      return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Error finding user:', error);
      return undefined;
    }
  },

  validateLogin: (email: string, password: string): User => {
    try {
      console.log("Validating login for:", email);
      const users = mockDb.getAllUsers();
      console.log("Current users in DB:", users);
      
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
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
      return users.find(user => user.role === "admin");
    } catch (error) {
      console.error('Error getting admin credentials:', error);
      return undefined;
    }
  },

  assignAdminRole: (email: string, assignedBy: string): { success: boolean; error?: string } => {
    try {
      const users = mockDb.getAllUsers();
      const assigner = users.find(user => user.email === assignedBy);
      
      if (!assigner?.isPrimaryAdmin) {
        return { success: false, error: 'No tienes permisos para asignar roles de admin' };
      }

      const userIndex = users.findIndex(user => user.email === email);
      if (userIndex === -1) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex].role = "admin";
      mockDb.saveUsers(updatedUsers);
      return { success: true };
    } catch (error) {
      console.error('Error assigning admin role:', error);
      return { success: false, error: 'Error al asignar rol de admin' };
    }
  },

  isPrimaryAdmin: (email: string): boolean => {
    try {
      const users = mockDb.getAllUsers();
      const user = users.find(user => user.email === email);
      return user?.isPrimaryAdmin || false;
    } catch (error) {
      console.error('Error checking primary admin:', error);
      return false;
    }
  },

  hasPrimaryAdmin: (): boolean => {
    try {
      const users = mockDb.getAllUsers();
      return users.some(user => user.isPrimaryAdmin);
    } catch (error) {
      console.error('Error checking for primary admin:', error);
      return false;
    }
  },

  deleteUser: (email: string): boolean => {
    try {
      const users = mockDb.getAllUsers();
      const updatedUsers = users.filter(user => user.email !== email);
      mockDb.saveUsers(updatedUsers);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}; 