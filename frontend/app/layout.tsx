import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { AuthProvider } from '@/services/auth'

export const metadata: Metadata = {
  title: 'AI Medical Recommendation System',
  description: 'Symptom checker and health recommendation system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
