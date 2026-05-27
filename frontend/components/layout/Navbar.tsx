'use client'

import Link from 'next/link'
import { useAuth } from '@/services/auth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-700">
          MediRec
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                Dashboard
              </Link>
              <Link href="/symptom-checker" className="text-gray-600 hover:text-blue-600 transition">
                Check Symptoms
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
