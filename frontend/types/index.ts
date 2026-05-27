export interface User {
  id: number
  name: string
  email: string
}

export interface PredictionResult {
  disease: string
  severity: string
  recommendation: string
  specialist: string
}

export interface HistoryItem {
  id: number
  symptoms: string
  predicted_disease: string
  severity: string
  recommendation: string
  specialist: string | null
  created_at: string
}
