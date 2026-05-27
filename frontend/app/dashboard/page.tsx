'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import { api } from '@/services/api'
import { useAuth } from '@/services/auth'
import type { HistoryItem } from '@/types'

const SEVERITY_COLORS: Record<string, string> = {
  Mild: 'text-green-600',
  Moderate: 'text-yellow-600',
  Severe: 'text-red-600',
  Uncertain: 'text-gray-600',
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, token } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }
    api
      .getHistory()
      .then(data => setHistory(data.history))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false))
  }, [token, router])

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Your Health Dashboard</h2>
        <Link
          href="/symptom-checker"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Check New Symptoms
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading history...</p>
      ) : history.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No symptom checks yet.</p>
          <Link
            href="/symptom-checker"
            className="text-blue-600 hover:underline font-medium"
          >
            Check your first symptom
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <Card key={item.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{item.predicted_disease}</h3>
                    <span className={`text-sm font-medium ${SEVERITY_COLORS[item.severity] || ''}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Symptoms: {item.symptoms}
                  </p>
                  <p className="text-gray-700 text-sm">{item.recommendation}</p>
                  {item.specialist && (
                    <p className="text-sm text-blue-600 mt-1">
                      Specialist: {item.specialist}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
