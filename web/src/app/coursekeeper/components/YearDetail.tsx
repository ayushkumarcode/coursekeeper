'use client'

import { useState } from 'react'
import { YearData } from '../data/mockData'

interface Props {
  year: number
  baselineYear: number
  onBack: () => void
  userEmail: string
  yearData: YearData
}

export default function YearDetail({ year, baselineYear, onBack, userEmail, yearData }: Props) {
  const [emailSent, setEmailSent] = useState(false)
  const [activeTab, setActiveTab] = useState<'summary' | 'papers' | 'videos' | 'delta'>('summary')

  const handleEmailReport = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'ADD':
        return '✨'
      case 'DEPRECATE':
        return '⚠️'
      case 'EMERGE':
        return '🌱'
      case 'RENAME':
        return '🔄'
      default:
        return '📌'
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Timeline</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {year} Patch Notes
            </h2>
            <p className="text-xl text-gray-600">
              {yearData.summary}
            </p>
            <p className="text-gray-500 mt-2">
              {year - baselineYear} years after you studied
            </p>
          </div>

          <button
            onClick={handleEmailReport}
            className={`
              px-6 py-3 rounded-lg font-semibold text-white transition-all
              ${emailSent 
                ? 'bg-green-500' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {emailSent ? '✓ Sent!' : 'Email This Report'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'summary', label: '📝 Summary', count: null },
            { id: 'papers', label: '📄 Papers', count: yearData.papers.length },
            { id: 'videos', label: '🎬 Videos', count: yearData.videos.length },
            { id: 'delta', label: '🎯 Your Learning Path', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm transition
                ${activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <span>{tab.label}</span>
              {tab.count && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What Changed in {year}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {yearData.description}
              </p>
              
              <div className="space-y-4">
                {yearData.changes.map((change, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getChangeIcon(change.type)}</span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {change.title}
                        </div>
                        <div className="text-gray-600 text-sm mt-1">
                          {change.rationale}
                        </div>
                        <div className={`
                          inline-block px-2 py-1 rounded-full text-xs font-medium mt-2
                          ${change.type === 'ADD' ? 'bg-green-100 text-green-700' : ''}
                          ${change.type === 'DEPRECATE' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${change.type === 'EMERGE' ? 'bg-blue-100 text-blue-700' : ''}
                          ${change.type === 'RENAME' ? 'bg-purple-100 text-purple-700' : ''}
                        `}>
                          {change.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'papers' && (
          <div className="grid gap-4">
            {yearData.papers.map((paper, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      {paper.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{paper.authors}</p>
                    <p className="text-gray-500 text-sm">{paper.venue}</p>
                  </div>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Read Paper →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid gap-4">
            {yearData.videos.map((video, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{video.title}</h4>
                      <p className="text-gray-500 text-sm">{video.channel}</p>
                    </div>
                  </div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Watch →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'delta' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Your Personalized Learning Path
              </h3>
              <p className="text-gray-700 mb-6">
                Based on your {baselineYear} knowledge, here's what you need to learn from {year}:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Priority Topics to Learn
                  </h4>
                  <ol className="space-y-3">
                    {yearData.changes
                      .filter(c => c.type === 'ADD' || c.type === 'EMERGE')
                      .slice(0, 3)
                      .map((change, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{change.title}</p>
                            <p className="text-gray-600 text-sm mt-1">
                              Estimated time: {2 + idx} hours
                            </p>
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>

                <div className="bg-white rounded-lg p-6 shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Recommended Resources
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-gray-700">
                      <span>📚</span>
                      <span>Deep Learning Book - Chapter on {yearData.changes[0]?.title}</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-700">
                      <span>🎓</span>
                      <span>Coursera: Advanced Computer Vision ({year} Edition)</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-700">
                      <span>💻</span>
                      <span>GitHub: Implementation tutorials and code</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-yellow-900 text-sm">
                    <span className="font-semibold">⚠️ Deprecation Notice:</span> Some techniques from your {baselineYear} 
                    curriculum are now outdated. Focus on the new approaches listed above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
