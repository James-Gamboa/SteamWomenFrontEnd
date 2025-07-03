import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Login attempt:", body);

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 },
      );
    }

    try {
      const user = mockDb.validateLogin(body.email, body.password);
      console.log("Login successful for user:", user.email);

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          organizationName: user.organizationName,
        },
      });
    } catch (error) {
      console.error("Login validation error:", error);
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
