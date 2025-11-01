import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  console.log(" requireAuth - Session:", session ? { user: session.user } : null)

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function requireAdmin() {
  const session = await requireAuth()

  console.log(" requireAdmin - User role:", session.user.role)

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return session
}

export async function getSession() {
  const session = await getServerSession(authOptions)
  console.log(" getSession:", session ? { user: session.user } : null)
  return session
}
