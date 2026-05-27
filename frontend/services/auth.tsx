'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (saved && savedUser) {
      setToken(saved)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Login failed')
    }
    const data = await res.json()
    setToken(data.access_token)
    localStorage.setItem('token', data.access_token)
    // Fetch user info - for MVP we store minimal info
    const payload = JSON.parse(atob(data.access_token.split('.')[1]))
    const userRes = await fetch('http://localhost:8000/history', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    })
    if (userRes.ok) {
      const userData: User = { id: parseInt(payload.sub), name: '', email }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.detail || 'Registration failed')
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
