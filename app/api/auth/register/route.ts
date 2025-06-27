import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

// TODO: Reemplazar con conexión a Django
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role, firstName, lastName, organizationName } =
      body;

    console.log("Registration attempt:", {
      email,
      role,
      firstName,
      lastName,
      organizationName,
    });
    console.log("Current users in DB:", mockDb.getAllUsers());

    if (!email || !password || !role) {
      console.log("Registration failed: Missing required fields");
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Registration failed: Invalid email format");
      return NextResponse.json(
        { error: "El formato del correo electrónico no es válido" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      console.log("Registration failed: Password too short");
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 },
      );
    }

    if (role === "company" && !organizationName) {
      console.log("Registration failed: Company name is required");
      return NextResponse.json(
        { error: "El nombre de la empresa es requerido" },
        { status: 400 },
      );
    }

    if (role === "student" && (!firstName || !lastName)) {
      console.log(
        "Registration failed: First name and last name are required for student",
      );
      return NextResponse.json(
        { error: "El nombre y apellido son requeridos" },
        { status: 400 },
      );
    }

    const existingUser = mockDb.findUserByEmail(email);
    if (existingUser) {
      console.log("Registration failed: Email already exists");
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 400 },
      );
    }

    try {
      const newUser = mockDb.createUser({
        email,
        password,
        role,
        firstName,
        lastName,
        organizationName,
      });

      console.log("New user created:", newUser);
      console.log("Updated users in DB:", mockDb.getAllUsers());

      const { password: _, ...userWithoutPassword } = newUser;
      const mockToken = "mock-jwt-token-" + Date.now();

      return NextResponse.json({
        token: mockToken,
        user: userWithoutPassword,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al crear el usuario";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error en el servidor. Por favor, intente nuevamente." },
      { status: 500 },
    );
  }
}
