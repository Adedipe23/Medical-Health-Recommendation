import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { AuthProvider } from '@/services/auth'

export const metadata: Metadata = {
  title: 'Medical Recommendation System',
  description: 'Symptom checker and health recommendation platform',
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
          <footer className="border-t bg-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-sm text-gray-500">
              Medical Recommendation System &mdash; Academic Project
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
