export const getRoleLabel = (role: string) => {
  switch (role) {
    case "student":
      return "Estudiante";
    case "company":
      return "Empresa";
    case "admin":
      return "Administrador";
    default:
      return role;
  }
}; 