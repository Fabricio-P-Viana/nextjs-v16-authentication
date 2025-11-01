import { requireAuth } from "@/lib/auth-helpers"
import { UserNav } from "@/components/dashboard/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield } from "lucide-react"

export default async function DashboardPage() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <UserNav user={session.user} />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Bem-vindo, {session.user.name}!</h2>
          <p className="text-muted-foreground">Esta é sua área protegida do dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Sessão</CardTitle>
              <CardDescription>Detalhes da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-muted-foreground capitalize">{session.user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID</p>
                <p className="text-sm text-muted-foreground font-mono">{session.user.id}</p>
              </div>
            </CardContent>
          </Card>

          {session.user.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Painel Admin
                </CardTitle>
                <CardDescription>Acesso administrativo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Você tem acesso ao painel administrativo para gerenciar usuários e permissões.
                </p>
                <Button asChild className="w-full">
                  <Link href="/admin">Acessar Admin</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>Funcionalidades disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Autenticação com NextAuth
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Sessão gerenciada por cookies
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Sistema de roles
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Middleware de proteção
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
