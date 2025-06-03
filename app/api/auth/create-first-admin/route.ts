import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

export async function POST(request: Request) {
  try {
    if (mockDb.hasPrimaryAdmin()) {
      return NextResponse.json(
        { error: "Ya existe un administrador primario" },
        { status: 400 }
      );
    }

    const admin = mockDb.createUser({
      email: "jjguevarag@gmail.com",
      password: "admin",
      role: "admin",
      isPrimaryAdmin: true,
      firstName: "James",
      lastName: "Guevara Gamboa"
    });

    return NextResponse.json({
      message: "Administrador primario creado exitosamente",
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        firstName: admin.firstName,
        lastName: admin.lastName
      }
    });
  } catch (error) {
    console.error("Error creating first admin:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 