import type { Metadata } from 'next'
import { Roboto, Roboto_Mono as RobotoMono } from 'next/font/google'
import './globals.css'
import type { ReactNode } from 'react'

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
  weight: ['300', '500', '700']
})

const robotoMono = RobotoMono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['300', '500', '700']
})

export const metadata: Metadata = {
  title: 'EducaPainel',
  description:
    'Acesse notas, frequências, comunicados e a agenda escolar em tempo real. A ponte perfeita entre a escola e a sua casa.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
