import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { ToastProvider } from '@/components/ui/toast'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SanityLive } from '@/sanity/lib/live'
import { Toaster } from "sonner";
import { AlertCircle, AlertTriangle, CheckCircle, InfoIcon, LoaderPinwheel } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Cheap City",
  description: "Find the best apartment with your prefrences, afordable prices and convenient locations",
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
              <SanityLive />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  actionButtonStyle: {
                    background: "#363636",
                    color: "#fff",
                  },
                }}
                icons={{
                  success: <CheckCircle />,
                  info: <InfoIcon />,
                  warning: <AlertCircle />,
                  error: <AlertTriangle />,
                  loading: <LoaderPinwheel />,
                }}
              />
              {children}
            </NuqsAdapter>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

