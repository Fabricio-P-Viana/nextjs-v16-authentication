import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions, updateUserRole } from "@/lib/auth"
import { ROLE_ADMIN, ROLE_USER } from "@/types/auth"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  console.log("Session:", session)
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  if (session.user.role !== ROLE_ADMIN) {
    return NextResponse.json({ error: "Acesso negado. Apenas administradores." }, { status: 403 })
  }

  const { role } = await request.json()

  if (!role || (role !== ROLE_USER && role !== ROLE_ADMIN)) {
    return NextResponse.json({ error: "Role inválido." }, { status: 400 })
  }

  try {
    const { id } = await params
    const user = await updateUserRole(id, role)

    return NextResponse.json({
      message: "Role atualizado com sucesso",
      user,
    })
  } catch (error) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
  }
}
