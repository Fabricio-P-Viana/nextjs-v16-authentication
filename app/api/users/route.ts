import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions, getAllUsers } from "@/lib/auth"
import { ROLE_ADMIN } from "@/types/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  // console.log(" /api/users - Session:", session ? { user: session.user } : null)

  if (!session) {
    // console.log(" /api/users - Não autenticado")
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  if (session.user.role !== ROLE_ADMIN) {
    // console.log(" /api/users - Acesso negado, role:", session.user.role)
    return NextResponse.json({ error: "Acesso negado. Apenas administradores." }, { status: 403 })
  }

  const users = await getAllUsers()
  // console.log(" /api/users - Retornando", users.length, "usuários")

  return NextResponse.json({ users })
}
