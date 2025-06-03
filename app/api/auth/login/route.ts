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

    const user = mockDb.findUserByEmail(email);
    console.log('Found user:', user);

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    if (user.role === "admin") {
      console.log('Admin login successful');
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
    }

    if (user.role !== role) {
      return NextResponse.json(
        { error: "Tipo de cuenta incorrecto" },
        { status: 401 }
      );
    }

    const token = "mock-jwt-token";
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: user.organizationName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 