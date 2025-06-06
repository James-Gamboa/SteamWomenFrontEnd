import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// TODO: Reemplazar con conexión a Django
// Endpoint: POST /api/auth/token/verify/

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    // TODO: Implementar llamada a Django para verificar el token
    // const response = await fetch("http://localhost:8000/api/auth/token/verify/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ token }),
    // });

    // if (!response.ok) {
    //   return NextResponse.json(
    //     { error: "Invalid token" },
    //     { status: 401 }
    //   );
    // }

    // const data = await response.json();
    // return NextResponse.json({ valid: true });

    return NextResponse.json(
      { error: "Not implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Error verifying token" },
      { status: 500 }
    );
  }
} 