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

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  if (path.startsWith("/api/")) {
    if (!token && !path.startsWith("/api/auth/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // TODO: Implementar la lógica de verificación de token con el backend
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 