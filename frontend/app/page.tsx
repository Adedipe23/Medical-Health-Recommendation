'use client'

import Link from 'next/link'
import { useAuth } from '@/services/auth'

const features = [
  {
    title: 'Symptom Checker',
    description: 'Select or describe your symptoms and receive AI-powered analysis with potential condition matching and severity assessment.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Recommendations',
    description: 'Receive OTC medication suggestions, lifestyle advice, and detailed next steps based on your reported symptoms.',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: 'bg-green-100',
  },
  {
    title: 'Health History',
    description: 'Track all your past symptom checks, diagnoses, and recommendations in one centralized dashboard.',
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bgColor: 'bg-purple-100',
  },
]

const steps = [
  { number: '1', title: 'Create an Account', description: 'Sign up with your email to securely access all platform features.' },
  { number: '2', title: 'Enter Your Symptoms', description: 'Select from common symptoms or type your own using the symptom checker.' },
  { number: '3', title: 'Get Recommendations', description: 'Receive health guidance, severity assessment, and specialist referrals.' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
          Academic Project
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Medical Recommendation System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A symptom checker and health recommendation platform. 
          Enter your symptoms and receive evidence-based guidance, severity assessment, 
          and specialist referrals.
        </p>

        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/symptom-checker"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-sm"
            >
              Check Symptoms
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-medium"
            >
              View Dashboard
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
