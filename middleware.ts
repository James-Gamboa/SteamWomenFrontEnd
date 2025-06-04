import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = {
  "/dashboard": ["student", "company", "admin"],
  "/dashboard/student": ["student", "admin"],
  "/dashboard/company": ["company", "admin"],
  "/dashboard/admin": ["admin"],
  "/admin": ["admin"],
};

const publicRoutes = [
  "/admin/setup",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/create-first-admin",
  "/api/auth/assign-admin"
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  if (path.startsWith("/api/")) {
    if (!token && !path.startsWith("/api/auth/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (path.startsWith("/login") || path.startsWith("/signup")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (path.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (path.startsWith("/dashboard/usuarios") || 
        path.startsWith("/dashboard/postulaciones") || 
        path.startsWith("/dashboard/configuracion")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (path.startsWith("/dashboard/oportunidades/crear") || 
        path.startsWith("/dashboard/estadisticas")) {
      if (userRole !== "company") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (path.startsWith("/dashboard/recomendaciones")) {
      if (userRole !== "student") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}; 