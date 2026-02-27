'use client'

import { useState } from 'react'
import UploadSection from './components/UploadSection'
import Timeline from './components/Timeline'
import YearDetail from './components/YearDetail'
import { mockYearData } from './data/mockData'

type Stage = 'upload' | 'timeline' | 'detail'

export default function CourseKeeper() {
  const [stage, setStage] = useState<Stage>('upload')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [baselineYear, setBaselineYear] = useState<number>(2008)
  const [subject, setSubject] = useState<string>('Computer Vision')

  const handleUploadComplete = (email: string, year: number, subj: string) => {
    setUserEmail(email)
    setBaselineYear(year)
    setSubject(subj)
    setStage('timeline')
  }

  const handleYearClick = (year: number) => {
    setSelectedYear(year)
    setStage('detail')
  }

  const handleBackToTimeline = () => {
    setStage('timeline')
    setSelectedYear(null)
  }

  const handleBackToUpload = () => {
    setStage('upload')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📚</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CourseKeeper</h1>
                <p className="text-sm text-gray-600">Stay current with your field</p>
              </div>
            </div>
            
            {stage !== 'upload' && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{subject}</span> • 
                  <span className="ml-2">Baseline: {baselineYear}</span>
                </div>
                <button
                  onClick={handleBackToUpload}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  New Subject →
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {stage === 'upload' && (
          <UploadSection onComplete={handleUploadComplete} />
        )}

        {stage === 'timeline' && (
          <Timeline 
            baselineYear={baselineYear}
            onYearClick={handleYearClick}
            userEmail={userEmail}
          />
        )}

        {stage === 'detail' && selectedYear && (
          <YearDetail 
            year={selectedYear}
            baselineYear={baselineYear}
            onBack={handleBackToTimeline}
            userEmail={userEmail}
            yearData={mockYearData[selectedYear]}
          />
        )}
      </main>
    </div>
  )
}
