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

const PRIMARY_ADMIN = {
  id: "1",
  email: "jjguevarag@gmail.com",
  password: "admin",
  role: "admin" as const,
  isPrimaryAdmin: true,
  firstName: "James",
  lastName: "Guevara Gamboa"
};

let serverUsers: User[] = [PRIMARY_ADMIN];

const getUsers = (): User[] => {
  if (typeof window === 'undefined') {
    return serverUsers;
  }
  try {
    const users = localStorage.getItem('mockUsers');
    if (!users) {
      localStorage.setItem('mockUsers', JSON.stringify(serverUsers));
      return serverUsers;
    }
    const parsedUsers = JSON.parse(users);
    serverUsers = parsedUsers;
    return parsedUsers;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return serverUsers;
  }
};

const saveUsers = (users: User[]) => {
  serverUsers = [...users];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mockUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

if (typeof window !== 'undefined') {
  const currentUsers = getUsers();
  if (currentUsers.length === 0) {
    saveUsers([PRIMARY_ADMIN]);
  }
}

export const mockDb = {
  findUserByEmail: (email: string) => {
    const users = getUsers();
    console.log('Finding user by email:', email, 'in users:', users);
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    console.log('Found user:', user);
    return user;
  },

  createUser: (userData: Omit<User, "id">) => {
    const users = getUsers();
    const existingUser = users.find(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (existingUser) {
      console.log('User already exists:', existingUser);
      throw new Error('Este correo electrónico ya está registrado');
    }

    const newUser = {
      ...userData,
      id: Date.now().toString()
    };
    console.log('Creating new user:', newUser);
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    console.log('Updated users in DB:', updatedUsers);
    return newUser;
  },

  validateLogin: (email: string, password: string, role: string) => {
    const users = getUsers();
    console.log('Validating login for:', { email, role });
    console.log('Available users:', users);
    
    const user = users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password &&
      user.role === role
    );
    
    if (!user) {
      console.log('Login validation failed');
      throw new Error('Credenciales inválidas');
    }
    
    console.log('Login validation successful:', user);
    return user;
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
      const updatedUsers = [...users];
      updatedUsers[userIndex].role = "admin";
      saveUsers(updatedUsers);
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