import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { ToastProvider } from '@/components/ui/toast'
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cheap City',
  description: 'Find the perfect apartment in your city',
  keywords:['apartment', 'kaimosi', 'house', 'nestlink', 'kafu', 'apartment kaimosi', 'home', 'location', 'cheap'],
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ki: '/ki',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mb-12">
            <Navigation />
          </div>
          <ToastProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

