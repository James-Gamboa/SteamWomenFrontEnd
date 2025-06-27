import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// TODO: Reemplazar con conexión a Django
// Endpoint: POST /api/auth/token/refresh/

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 },
      );
    }

    // TODO: Implementar llamada a Django para refrescar el token
    // const response = await fetch("http://localhost:8000/api/auth/token/refresh/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ refresh: refreshToken }),
    // });

    // if (!response.ok) {
    //   return NextResponse.json(
    //     { error: "Invalid refresh token" },
    //     { status: 401 }
    //   );
    // }

    // const data = await response.json();
    // return NextResponse.json({ token: data.access });

    return NextResponse.json({ error: "Not implemented" }, { status: 501 });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Error refreshing token" },
      { status: 500 },
    );
  }
}
