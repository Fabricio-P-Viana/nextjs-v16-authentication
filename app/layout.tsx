import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-sans'
})

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
      <body className={`${lato.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
