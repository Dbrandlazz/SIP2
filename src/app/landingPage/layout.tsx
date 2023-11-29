import '../../app/globals.css'
import type { Metadata } from 'next'
import { Red_Rose } from 'next/font/google'
import Script from 'next/script'
const inter = Red_Rose({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIP2',
  description: 'Landing Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
      {children}
      
      </body>
    </html>
  )
}
