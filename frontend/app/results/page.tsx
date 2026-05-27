'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import type { PredictionResult } from '@/types'

const SEVERITY_COLORS: Record<string, string> = {
  Mild: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Severe: 'bg-red-100 text-red-800',
  Uncertain: 'bg-gray-100 text-gray-800',
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<PredictionResult | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lastResult')
    if (!saved) {
      router.push('/symptom-checker')
      return
    }
    setResult(JSON.parse(saved))
  }, [router])

  if (!result) return null

  const severityColor = SEVERITY_COLORS[result.severity] || 'bg-gray-100 text-gray-800'

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Your Results</h2>

      <Card className="mb-6">
        <div className="grid gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Possible Condition</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{result.disease}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Severity Level</h3>
            <span className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-medium ${severityColor}`}>
              {result.severity}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Recommendation</h3>
            <p className="text-gray-700 mt-1 leading-relaxed">{result.recommendation}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Recommended Specialist</h3>
            <p className="text-lg font-medium text-blue-700 mt-1">{result.specialist}</p>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Link
          href="/symptom-checker"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Check Again
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          View History
        </Link>
      </div>
    </div>
  )
}
