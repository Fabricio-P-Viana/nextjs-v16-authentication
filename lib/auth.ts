import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { TRoles, ROLE_USER } from "@/types/auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("Usuário não encontrado")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Senha incorreta")
        }

        // console.log(" authorize - User authenticated:", { id: user.id, email: user.email, role: user.role })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        // console.log(" jwt callback - Token updated:", { id: token.id, role: token.role })
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        // console.log(" session callback - Session created:", { user: session.user })
      }
      return session
    },
  },
  events: {
    async signOut({ token }) {
      // Limpa o token quando o usuário faz logout
      if (token) {
        // remove apenas as propriedades sensíveis em vez de reatribuir o objeto,
        // evitando o erro de tipo: '{}' não tem as propriedades de 'JWT'
        delete (token as any).id
        delete (token as any).role
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge:  Number(process.env.NEXTAUTH_MAX_AGE_SESSION_HOURS || 3) * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

export async function registerUser(email: string, password: string, name: string, role: TRoles = ROLE_USER) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error("Usuário já existe")
  }

  const hashedPassword = await hash(password, 12)

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  })

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  }
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return users
}

export async function updateUserRole(userId: string, role: TRoles) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
