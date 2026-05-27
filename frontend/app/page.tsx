'use client'

import Link from 'next/link'
import { useAuth } from '@/services/auth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">
        AI Medical Recommendation System
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Enter your symptoms, get instant health recommendations and specialist suggestions.
      </p>

      {!user ? (
        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-medium"
          >
            Login
          </Link>
        </div>
      ) : (
        <Link
          href="/symptom-checker"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
        >
          Check Symptoms
        </Link>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-4xl mb-4">🩺</div>
          <h3 className="text-lg font-semibold mb-2">Symptom Checker</h3>
          <p className="text-gray-600">Describe your symptoms and get AI-powered analysis.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-4xl mb-4">💊</div>
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <p className="text-gray-600">Receive OTC suggestions and lifestyle advice.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">Health History</h3>
          <p className="text-gray-600">Track all your past symptom checks in one place.</p>
        </div>
      </div>
    </div>
  )
}
