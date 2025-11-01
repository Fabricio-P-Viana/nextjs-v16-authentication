import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Users, Cookie } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Sistema de Autenticação</h1>
          <p className="text-xl text-muted-foreground mb-8">NextAuth com gerenciamento de sessão e níveis de acesso</p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login">Fazer Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Criar Conta</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Autenticação Segura</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Sistema completo de login e registro com NextAuth e bcrypt</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cookie className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Sessão em Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Gerenciamento de sessão seguro usando cookies HTTP-only</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Sistema de Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Controle de acesso com níveis user e admin</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Middleware Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Proteção automática de rotas com middleware do Next.js</CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
