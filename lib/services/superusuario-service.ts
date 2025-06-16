const checkAccess = async (selectedRole: string) => {
  const response = await fetch("/api/usuarios/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selected_role: selectedRole }),
  });

  const data = await response.json();
  console.log("Acceso permitido:", data);
};
