import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { SessionProvider } from 'next-auth/react'
import { SanityLive } from '@/sanity/lib/live'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ApartmentFinder',
  description: 'Find your perfect apartment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navigation />
            <SanityLive />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

