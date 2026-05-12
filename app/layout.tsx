import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gene blog',
  description: 'Gene blog is a personal blog of Gene',
  generator: 'Gene',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
