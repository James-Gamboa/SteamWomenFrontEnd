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

export const mockDb = {
  getAllUsers: (): User[] => {
    try {
      const users = localStorage.getItem("steamWomenUsers");
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  },

  saveUsers: (users: User[]): void => {
    try {
      localStorage.setItem("steamWomenUsers", JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users:", error);
    }
  },

  createUser: (userData: Omit<User, "id" | "createdAt">): User => {
    const users = mockDb.getAllUsers();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    mockDb.saveUsers(users);
    return newUser;
  },

  findUserByEmail: (email: string) => {
    const users = mockDb.getAllUsers();
    console.log('Finding user by email:', email, 'in users:', users);
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    console.log('Found user:', user);
    return user;
  },

  validateLogin: (email: string, password: string) => {
    const users = mockDb.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!user) {
      throw new Error("Credenciales inválidas");
    }
    return user;
  },

  getAdminCredentials: () => {
    const users = mockDb.getAllUsers();
    return users.find(user => user.role === "admin");
  },

  assignAdminRole: (email: string, assignedBy: string) => {
    const users = mockDb.getAllUsers();
    const assigner = users.find(user => user.email === assignedBy);
    
    if (!assigner?.isPrimaryAdmin) {
      return { success: false, error: "No tienes permisos para asignar roles de admin" };
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex].role = "admin";
      mockDb.saveUsers(updatedUsers);
      return { success: true };
    }
    return { success: false, error: "Usuario no encontrado" };
  },

  isPrimaryAdmin: (email: string) => {
    const users = mockDb.getAllUsers();
    const user = users.find(user => user.email === email);
    return user?.isPrimaryAdmin || false;
  },

  hasPrimaryAdmin: () => {
    const users = mockDb.getAllUsers();
    return users.some(user => user.isPrimaryAdmin);
  },

  deleteUser: (email: string) => {
    const users = mockDb.getAllUsers();
    const updatedUsers = users.filter(user => user.email !== email);
    mockDb.saveUsers(updatedUsers);
    return true;
  }
}; 