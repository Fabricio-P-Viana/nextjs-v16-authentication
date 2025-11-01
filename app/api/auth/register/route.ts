import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, senha e nome são obrigatórios" }, { status: 400 })
    }

    const user = await registerUser(email, password, name, role)

    return NextResponse.json({ message: "Usuário criado com sucesso", user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 })
  }
}
