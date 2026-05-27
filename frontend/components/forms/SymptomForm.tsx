'use client'

import { useState } from 'react'

const COMMON_SYMPTOMS = [
  'Fever', 'Cough', 'Headache', 'Fatigue', 'Sore Throat',
  'Runny Nose', 'Nausea', 'Chest Pain', 'Shortness of Breath',
  'Body Ache', 'Chills', 'Dizziness', 'Diarrhea', 'Vomiting',
]

interface SymptomFormProps {
  onSubmit: (symptoms: string[]) => void
  loading: boolean
}

export default function SymptomForm({ onSubmit, loading }: SymptomFormProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [custom, setCustom] = useState('')

  function toggle(symptom: string) {
    setSelected(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  function addCustom() {
    const trimmed = custom.trim()
    if (trimmed && !selected.includes(trimmed)) {
      setSelected(prev => [...prev, trimmed])
      setCustom('')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (selected.length > 0) {
      onSubmit(selected)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Select your symptoms:
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_SYMPTOMS.map(symptom => (
            <button
              key={symptom}
              type="button"
              onClick={() => toggle(symptom)}
              className={`px-4 py-2 rounded-full border transition text-sm ${
                selected.includes(symptom)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          placeholder="Type a symptom..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={addCustom}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Add
        </button>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map(s => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {s}
              <button type="button" onClick={() => toggle(s)} className="text-blue-600 hover:text-blue-800">
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={selected.length === 0 || loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
      >
        {loading ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>
    </form>
  )
}
