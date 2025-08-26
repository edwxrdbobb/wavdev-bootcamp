import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '../src/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code with WAV - Web Development Bootcamp',
  description: 'Transform your career with our intensive 4-week web development bootcamp in Freetown, Sierra Leone. Learn HTML, CSS, JavaScript, React, and full-stack development.',
  keywords: 'web development, bootcamp, Sierra Leone, Freetown, React, JavaScript, HTML, CSS, programming, coding',
  authors: [{ name: 'Code with WAV' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}