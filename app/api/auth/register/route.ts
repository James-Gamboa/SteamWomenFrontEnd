import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

// TODO: Reemplazar con conexión a Django
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role, firstName, lastName, organizationName } = body;

    console.log("Registration attempt:", { email, role, firstName, lastName, organizationName });
    console.log("Current users in DB:", mockDb.getAllUsers());

    if (!email || !password || !role) {
      console.log("Registration failed: Missing required fields");
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const existingUser = mockDb.findUserByEmail(email);
    if (existingUser) {
      console.log("Registration failed: Email already exists");
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 400 }
      );
    }

    const newUser = mockDb.createUser({
      email,
      password,
      role,
      firstName,
      lastName,
      organizationName
    });

    console.log("New user created:", newUser);
    console.log("Updated users in DB:", mockDb.getAllUsers());

    const mockToken = "mock-jwt-token-" + Date.now();
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      token: mockToken,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
} 