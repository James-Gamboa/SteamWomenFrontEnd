export async function loginUsuario(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username , password }) 

    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error en login:", errorData.detail || "Credenciales incorrectas");
      throw errorData;
    }

    const data = await response.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("role", data.role);  // Guardamos el rol del usuario

    console.log("✅ Login exitoso. Rol:", data.role);
    return data;
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    console.error("❌ Error en autenticación:", error);
    throw error;
  }
}

