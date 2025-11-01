# Sistema de Autenticação Next.js com NextAuth e Prisma

Sistema completo de autenticação com login, registro, gerenciamento de sessão em cookies e níveis de acesso (roles).

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **NextAuth.js** - Autenticação
- **Prisma** - ORM
- **SQLite** - Banco de dados local (desenvolvimento)
- **PostgreSQL** - AWS Aurora (produção)
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Gere o Prisma Client:
```bash
npm run db:generate
```

4. Crie o banco de dados:
```bash
npm run db:push
```

5. Popule o banco com dados iniciais:
```bash
npm run db:seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔑 Credenciais de Teste

Após executar o seed, você pode usar:

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## 📁 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts  # Handler NextAuth
│   │   │   ├── register/route.ts       # Registro de usuários
│   │   │   └── session/route.ts        # Verificação de sessão
│   │   └── users/
│   │       ├── route.ts                # Listar usuários (admin)
│   │       └── [id]/role/route.ts      # Atualizar role (admin)
│   ├── login/page.tsx                  # Página de login
│   ├── register/page.tsx               # Página de registro
│   ├── dashboard/page.tsx              # Dashboard do usuário
│   └── admin/page.tsx                  # Painel admin
├── components/
│   ├── auth/
│   │   ├── login-form.tsx              # Formulário de login
│   │   └── register-form.tsx           # Formulário de registro
│   ├── dashboard/
│   │   └── user-nav.tsx                # Navegação do usuário
│   └── admin/
│       └── users-table.tsx             # Tabela de usuários
├── lib/
│   ├── auth.ts                         # Configuração NextAuth
│   ├── auth-helpers.ts                 # Funções auxiliares
│   └── prisma.ts                       # Cliente Prisma
├── prisma/
│   ├── schema.prisma                   # Schema do banco
│   └── seed.ts                         # Dados iniciais
├── types/
│   └── next-auth.d.ts                  # Tipos NextAuth
└── proxy.ts                            # Middleware de proteção

```

## 🗄️ Banco de Dados

### Desenvolvimento (SQLite)

O projeto usa SQLite por padrão para desenvolvimento local:

```env
DATABASE_URL="file:./dev.db"
```

### Produção (AWS Aurora PostgreSQL)

Para produção, atualize o schema do Prisma e a variável de ambiente:

1. Edite `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Atualize `.env`:
```env
DATABASE_URL="postgresql://user:password@your-aurora-endpoint:5432/dbname?schema=public"
```

3. Execute as migrations:
```bash
npm run db:push
```

## 🛡️ Níveis de Acesso

- **USER**: Acesso ao dashboard pessoal
- **ADMIN**: Acesso ao painel admin + gerenciamento de usuários

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run db:generate` - Gera Prisma Client
- `npm run db:push` - Sincroniza schema com banco
- `npm run db:seed` - Popula banco com dados iniciais
- `npm run db:studio` - Abre Prisma Studio (GUI do banco)

## 🔒 Segurança

- Senhas hasheadas com bcrypt (12 rounds)
- Sessões JWT em cookies HTTP-only
- Middleware de proteção de rotas
- Validação de roles server-side
- CSRF protection via NextAuth

## 📚 Rotas

### Públicas
- `/` - Homepage
- `/login` - Login
- `/register` - Registro

### Protegidas (Autenticação necessária)
- `/dashboard` - Dashboard do usuário

### Admin (Role ADMIN necessário)
- `/admin` - Painel administrativo
