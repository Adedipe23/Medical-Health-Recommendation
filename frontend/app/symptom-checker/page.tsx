'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SymptomForm from '@/components/forms/SymptomForm'
import Card from '@/components/ui/Card'
import { api } from '@/services/api'
import { useAuth } from '@/services/auth'
import type { PredictionResult } from '@/types'

export default function SymptomCheckerPage() {
  const router = useRouter()
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(symptoms: string[]) {
    if (!token) {
      router.push('/login')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result: PredictionResult = await api.predict(symptoms)
      localStorage.setItem('lastResult', JSON.stringify(result))
      router.push('/results')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Symptom Checker</h2>
      <p className="text-gray-600 text-center mb-8">
        Select the symptoms you are experiencing below.
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">{error}</div>
      )}

      <Card>
        <SymptomForm onSubmit={handleSubmit} loading={loading} />
      </Card>
    </div>
  )
}
