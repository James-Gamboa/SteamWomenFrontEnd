import type { User } from "./mock-db";

// TODO: Reemplazar con conexión a Django
const STORAGE_KEYS = {
  USERS: "steamWomenUsers",
  STATS: "steamWomenStats"
} as const;

interface UserStats {
  total: number;
  admins: number;
  companies: number;
  students: number;
}

const calculateStats = (users: User[]): UserStats => ({
  total: users.length,
  admins: users.filter(u => u.role === "admin").length,
  companies: users.filter(u => u.role === "company").length,
  students: users.filter(u => u.role === "student").length
});

const ensureUserHasCreatedAt = (user: User): User => {
  if (!user.createdAt) {
    return {
      ...user,
      createdAt: new Date().toISOString()
    };
  }
  return user;
};

export const storageUtils = {
  initializeStorage: () => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!users) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(calculateStats([])));
      }
    } catch (error) {
      console.error("Error initializing storage:", error);
      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.STATS);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(calculateStats([])));
    }
  },

  getUsers: (): User[] => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!users) {
        storageUtils.initializeStorage();
        return [];
      }
      const parsedUsers = JSON.parse(users);
      // Ensure all users have createdAt
      const updatedUsers = parsedUsers.map(ensureUserHasCreatedAt);
      if (JSON.stringify(parsedUsers) !== JSON.stringify(updatedUsers)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
      }
      return updatedUsers;
    } catch (error) {
      console.error("Error reading users:", error);
      storageUtils.initializeStorage();
      return [];
    }
  },

  getStats: (): UserStats => {
    try {
      const stats = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!stats) {
        const users = storageUtils.getUsers();
        const newStats = calculateStats(users);
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
        return newStats;
      }
      return JSON.parse(stats);
    } catch (error) {
      console.error("Error reading stats:", error);
      const users = storageUtils.getUsers();
      const newStats = calculateStats(users);
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
      return newStats;
    }
  },

  updateUsers: (users: User[]) => {
    try {
      const updatedUsers = users.map(ensureUserHasCreatedAt);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
      const stats = calculateStats(updatedUsers);
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
      return { success: true, stats };
    } catch (error) {
      console.error("Error updating users:", error);
      return { success: false, error: "Error al actualizar los usuarios" };
    }
  },

  updateUserRole: (userId: string, newRole: User["role"]): { success: boolean; error?: string } => {
    try {
      const users = storageUtils.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return { success: false, error: "Usuario no encontrado" };
      }

      if (users[userIndex].isPrimaryAdmin) {
        return { success: false, error: "No se puede cambiar el rol del administrador principal" };
      }

      users[userIndex].role = newRole;
      return storageUtils.updateUsers(users);
    } catch (error) {
      console.error("Error updating user role:", error);
      return { success: false, error: "Error al actualizar el rol del usuario" };
    }
  },

  deleteUser: (userId: string): { success: boolean; error?: string } => {
    try {
      const users = storageUtils.getUsers();
      const userToDelete = users.find(u => u.id === userId);
      
      if (!userToDelete) {
        return { success: false, error: "Usuario no encontrado" };
      }

      if (userToDelete.isPrimaryAdmin) {
        return { success: false, error: "No se puede eliminar al administrador principal" };
      }

      const updatedUsers = users.filter(u => u.id !== userId);
      return storageUtils.updateUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, error: "Error al eliminar el usuario" };
    }
  },

  addUser: (user: Omit<User, "id" | "createdAt">): { success: boolean; error?: string } => {
    try {
      const users = storageUtils.getUsers();
      const newUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const updatedUsers = [...users, newUser];
      return storageUtils.updateUsers(updatedUsers);
    } catch (error) {
      console.error("Error adding user:", error);
      return { success: false, error: "Error al agregar el usuario" };
    }
  }
}; 