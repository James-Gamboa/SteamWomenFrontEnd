interface User {
  id: string;
  email: string;
  password: string;
  role: "student" | "company" | "admin";
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  isPrimaryAdmin?: boolean;
}

const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('mockUsers');
  console.log('Getting users from localStorage:', users);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  if (typeof window === 'undefined') return;
  console.log('Saving users to localStorage:', users);
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const PRIMARY_ADMIN = {
  id: "1",
  email: "jjguevarag@gmail.com",
  password: "admin",
  role: "admin" as const,
  isPrimaryAdmin: true,
  firstName: "James",
  lastName: "Guevara Gamboa"
};

if (typeof window !== 'undefined') {
  console.log('Initializing database...');
  const currentUsers = getUsers();
  if (currentUsers.length === 0) {
    console.log('Creating first admin...');
    saveUsers([PRIMARY_ADMIN]);
  }
}

export const mockDb = {
  findUserByEmail: (email: string) => {
    const users = getUsers();
    console.log('Finding user by email:', email, 'in users:', users);
    const user = users.find(user => user.email === email);
    console.log('Found user:', user);
    return user;
  },

  createUser: (userData: Omit<User, "id">) => {
    const users = getUsers();
    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    console.log('Creating new user:', newUser);
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  getAllUsers: () => {
    return getUsers();
  },

  assignAdminRole: (email: string, assignedBy: string) => {
    const users = getUsers();
    const assigner = users.find(user => user.email === assignedBy);
    
    if (!assigner?.isPrimaryAdmin) {
      return { success: false, error: "No tienes permisos para asignar roles de admin" };
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      users[userIndex].role = "admin";
      saveUsers(users);
      return { success: true };
    }
    return { success: false, error: "Usuario no encontrado" };
  },

  isPrimaryAdmin: (email: string) => {
    const user = getUsers().find(user => user.email === email);
    return user?.isPrimaryAdmin || false;
  },

  hasPrimaryAdmin: () => {
    const users = getUsers();
    return users.some(user => user.isPrimaryAdmin);
  }
}; 