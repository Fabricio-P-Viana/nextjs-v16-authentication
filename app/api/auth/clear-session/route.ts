import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete("next-auth.session-token")
    cookieStore.delete("__Secure-next-auth.session-token")
    cookieStore.delete("next-auth.csrf-token")
    cookieStore.delete("__Host-next-auth.csrf-token")

    return NextResponse.json({
      success: true,
      message: "Sessão limpa com sucesso",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao limpar sessão" }, { status: 500 })
  }
}
