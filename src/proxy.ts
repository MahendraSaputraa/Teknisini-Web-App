import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_MODE = true;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===== Maintenance Mode =====
  if (
    MAINTENANCE_MODE &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    pathname !== "/favicon.ico"
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  // Bypass: Next.js internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const publicRoutes = ["/", "/login", "/register", "/maintenance"];

  if (publicRoutes.some((route) => pathname === route)) {
    if (pathname === "/" && token && role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/customer") && role !== "user") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/maintenance",
    "/admin/:path*",
    "/customer/:path*",
  ],
};
