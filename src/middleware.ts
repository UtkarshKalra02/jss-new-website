import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

/** Gate for the owner dashboard and the API it writes through. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const ok = await verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) return new NextResponse(null, { status: 401 });

  const login = req.nextUrl.clone();
  login.pathname = "/admin/login";
  login.search = `?next=${encodeURIComponent(pathname + req.nextUrl.search)}`;
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
