import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { ToastProvider } from '@/components/ui/toast'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SanityLive } from '@/sanity/lib/live'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Cheap City",
  description: "Your Gateway to Global Rentals",
  keywords: [
    "apartment",
    "kaimosi",
    "house",
    "nestlink",
    "apartment kaimosi",
    "home",
    "location",
    "cheap home",
    "cheap houses",
    "cheap apartment",
    "cheap rental",
    "rent",
    "rental",
    "rental house",
    "rental apartment",
    "rental kaimosi",
    "rental nestlink",
    "rental kafu",
    "cheap city",
    "rental city",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
    },
  },
};

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
            <NuqsAdapter>
              <SanityLive/>
              {children}
            </NuqsAdapter>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

