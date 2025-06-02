export async function registerUsuario(userData) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error en registro:", errorData.detail || "Error desconocido");
      throw errorData;
    }

    const data = await response.json();
    console.log("✅ Registro exitoso", data);
    return data;
  } catch (error) {
    console.error("❌ Error en autenticación:", error);
    throw error;
  }
}
