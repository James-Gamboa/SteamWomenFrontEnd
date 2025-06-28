import type { User } from "./mock-db";

// TODO: Reemplazar con conexión a Django
const STORAGE_KEYS = {
  USERS: "steamWomenUsers",
  STATS: "steamWomenStats",
} as const;

interface UserStats {
  total: number;
  admins: number;
  companies: number;
  students: number;
}

const calculateStats = (users: User[]): UserStats => ({
  total: users.length,
  admins: users.filter((u) => u.role === "admin").length,
  companies: users.filter((u) => u.role === "company").length,
  students: users.filter((u) => u.role === "student").length,
});

const ensureUserHasCreatedAt = (user: User): User => {
  if (!user.createdAt) {
    return {
      ...user,
      createdAt: new Date().toISOString(),
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
        localStorage.setItem(
          STORAGE_KEYS.STATS,
          JSON.stringify(calculateStats([])),
        );
      }
    } catch (error) {
      console.error("Error initializing storage:", error);
      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.STATS);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
      localStorage.setItem(
        STORAGE_KEYS.STATS,
        JSON.stringify(calculateStats([])),
      );
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
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
        const stats = calculateStats(updatedUsers);
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
        return { success: true, stats };
      } else {
        const stats = calculateStats(updatedUsers);
        return { success: true, stats };
      }
    } catch (error) {
      console.error("Error updating users:", error);
      return { success: false, error: "Error al actualizar los usuarios" };
    }
  },

  updateUserRole: (
    userId: string,
    newRole: User["role"],
  ): { success: boolean; error?: string } => {
    try {
      console.log("updateUserRole called with:", { userId, newRole });
      const users = storageUtils.getUsers();
      console.log("Current users:", users);

      const userIndex = users.findIndex((u) => u.id === userId);
      console.log("User index found:", userIndex);

      if (userIndex === -1) {
        console.log("User not found with ID:", userId);
        return { success: false, error: "Usuario no encontrado" };
      }

      if (users[userIndex].isPrimaryAdmin) {
        console.log("Cannot change primary admin role");
        return {
          success: false,
          error: "No se puede cambiar el rol del administrador principal",
        };
      }

      console.log(
        "Updating user role from",
        users[userIndex].role,
        "to",
        newRole,
      );
      users[userIndex].role = newRole;
      const result = storageUtils.updateUsers(users);
      console.log("Update users result:", result);

      if (result.success && typeof window !== "undefined") {
        storageUtils.syncWithFileSystem().catch((error) => {
          console.error("Error syncing with file system:", error);
        });
      }

      return result;
    } catch (error) {
      console.error("Error updating user role:", error);
      return {
        success: false,
        error: "Error al actualizar el rol del usuario",
      };
    }
  },

  deleteUser: (userId: string): { success: boolean; error?: string } => {
    try {
      const users = storageUtils.getUsers();
      const userToDelete = users.find((u) => u.id === userId);

      if (!userToDelete) {
        return { success: false, error: "Usuario no encontrado" };
      }

      if (userToDelete.isPrimaryAdmin) {
        return {
          success: false,
          error: "No se puede eliminar al administrador principal",
        };
      }

      const updatedUsers = users.filter((u) => u.id !== userId);
      return storageUtils.updateUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, error: "Error al eliminar el usuario" };
    }
  },

  addUser: (
    user: Omit<User, "id" | "createdAt">,
  ): { success: boolean; error?: string } => {
    try {
      const users = storageUtils.getUsers();

      const generateUniqueId = (): string => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${timestamp}-${random}`;
      };

      let newId = generateUniqueId();
      while (users.some((existingUser) => existingUser.id === newId)) {
        newId = generateUniqueId();
      }

      const newUser = {
        ...user,
        id: newId,
        createdAt: new Date().toISOString(),
      };
      const updatedUsers = [...users, newUser];
      return storageUtils.updateUsers(updatedUsers);
    } catch (error) {
      console.error("Error adding user:", error);
      return { success: false, error: "Error al agregar el usuario" };
    }
  },

  cleanDuplicateUsers: (): { success: boolean; removedCount: number } => {
    try {
      const users = storageUtils.getUsers();
      const seen = new Set<string>();
      const uniqueUsers: User[] = [];
      let removedCount = 0;

      for (const user of users) {
        if (!seen.has(user.id)) {
          seen.add(user.id);
          uniqueUsers.push(user);
        } else {
          removedCount++;
        }
      }

      if (removedCount > 0) {
        storageUtils.updateUsers(uniqueUsers);
      }

      return { success: true, removedCount };
    } catch (error) {
      console.error("Error cleaning duplicate users:", error);
      return { success: false, removedCount: 0 };
    }
  },

  syncWithFileSystem: async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      if (typeof window === "undefined") {
        return { success: false, error: "Sync not available on server" };
      } else {
        const users = storageUtils.getUsers();
        const response = await fetch("/api/users/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ users }),
        });

        if (response.ok) {
          return { success: true };
        } else {
          return {
            success: false,
            error: "Error al sincronizar con el servidor",
          };
        }
      }
    } catch (error) {
      console.error("Error syncing with file system:", error);
      return { success: false, error: "Error de sincronización" };
    }
  },

  updateUserProfile: (userId: string, updates: Partial<User>) => {
    try {
      const users = storageUtils.getUsers();
      const idx = users.findIndex((u) => u.id === userId);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        storageUtils.updateUsers(users);
        return { success: true };
      }
      return { success: false, error: "Usuario no encontrado" };
    } catch (error) {
      return { success: false, error: "Error al actualizar el perfil" };
    }
  },
};
