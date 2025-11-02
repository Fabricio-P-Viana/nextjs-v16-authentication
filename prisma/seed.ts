import { ROLE_ADMIN, ROLE_USER } from "@/types/auth"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...")

  // Limpar dados existentes
  await prisma.user.deleteMany()

  // Criar usuário admin
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Administrador",
      password: adminPassword,
      role: ROLE_ADMIN,
    },
  })

  console.log("✅ Admin criado:", { email: admin.email, role: admin.role })

  // Criar usuário comum
  const userPassword = await hash("user123", 12)
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Usuário Teste",
      password: userPassword,
      role: ROLE_USER,
    },
  })

  console.log("✅ Usuário criado:", { email: user.email, role: user.role })

  console.log("\n📋 Credenciais de teste:")
  console.log("Admin: admin@example.com / admin123")
  console.log("User: user@example.com / user123")
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
