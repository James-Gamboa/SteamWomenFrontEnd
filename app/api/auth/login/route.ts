import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

// TODO: Reemplazar con conexión a Django
export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();
    console.log('Login attempt:', { email, role });

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Faltan credenciales" },
        { status: 400 }
      );
    }

    try {
      const user = mockDb.validateLogin(email, password, role);
      const token = "mock-jwt-token";
      
      return NextResponse.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          organizationName: user.organizationName,
          isPrimaryAdmin: user.isPrimaryAdmin
        }
      });
    } catch (error) {
      console.error('Login validation error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Datos inválidos" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 