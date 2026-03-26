import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
export const ROLES = {
  TEKNISI: "teknisi",
  ADMIN: "admin",
  CUSTOMER: "customer",
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = "";
  const role = ROLES.CUSTOMER;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/teknisi") && role !== "teknisi") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// route yang kena middleware
export const config = {
  matcher: ["/admin/:path*", "/teknisi/:path*", "/customer/:path*"],
};
