import { requireAdmin } from "@/lib/auth-helpers"
import { UserNav } from "@/components/dashboard/user-nav"
import { UsersTable } from "@/components/admin/users-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllUsers } from "@/lib/auth"

export default async function AdminPage() {
  const session = await requireAdmin()

  const users = await getAllUsers()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Voltar ao Dashboard</Link>
            </Button>
            <UserNav user={session.user} />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8" />
            Gerenciamento de Usuários
          </h2>
          <p className="text-muted-foreground">Gerencie usuários e suas permissões de acesso</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
            <CardDescription>Lista de todos os usuários e seus níveis de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable initialUsers={users} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
