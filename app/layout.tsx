import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auth Nextjs v16 App',
  description: 'Auth Nextjs v16 App'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
