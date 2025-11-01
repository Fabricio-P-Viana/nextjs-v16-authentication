import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  })

  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard")

  // Se está em página de auth e já está autenticado, redireciona para dashboard
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Se está em página admin e não é admin, redireciona para dashboard
  if (isAdminPage && token?.role !== "admin") {
    if (!isAuth) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Se está em página protegida e não está autenticado, redireciona para login
  if ((isDashboardPage || isAdminPage) && !isAuth) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}
