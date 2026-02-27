'use client'

import { useState } from 'react'

interface Props {
  baselineYear: number
  onYearClick: (year: number) => void
  userEmail: string
}

const yearEvents = {
  2009: { impact: 'low', title: 'Incremental improvements' },
  2010: { impact: 'medium', title: 'ImageNet dataset launched' },
  2011: { impact: 'low', title: 'Feature learning advances' },
  2012: { impact: 'revolutionary', title: 'AlexNet Revolution! 🚀' },
  2013: { impact: 'medium', title: 'Deep learning spreads' },
  2014: { impact: 'high', title: 'VGG & GoogLeNet' },
  2015: { impact: 'revolutionary', title: 'ResNet breakthrough! 🎯' },
  2016: { impact: 'high', title: 'Object detection maturity' },
  2017: { impact: 'high', title: 'Attention mechanisms' },
  2018: { impact: 'medium', title: 'EfficientNets' },
  2019: { impact: 'medium', title: 'Self-supervised learning' },
  2020: { impact: 'revolutionary', title: 'Vision Transformers! 🔄' },
  2021: { impact: 'high', title: 'CLIP & multimodal' },
  2022: { impact: 'revolutionary', title: 'Diffusion Models! 🎨' },
  2023: { impact: 'revolutionary', title: 'SAM & Foundation Models! 🌍' },
  2024: { impact: 'high', title: 'Multimodal LLMs' },
}

type Impact = 'low' | 'medium' | 'high' | 'revolutionary'

export default function Timeline({ baselineYear, onYearClick, userEmail }: Props) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const currentYear = 2024
  const years = Array.from(
    { length: currentYear - baselineYear + 1 }, 
    (_, i) => baselineYear + i
  )

  const getYearStyle = (impact: Impact) => {
    switch (impact) {
      case 'revolutionary':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-2xl ring-4 ring-purple-200'
      case 'high':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110 shadow-xl'
      case 'medium':
        return 'bg-blue-500 shadow-lg'
      default:
        return 'bg-gray-400'
    }
  }

  const handleEmailAllReports = async () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Your Learning Timeline
        </h2>
        <p className="text-xl text-gray-600 mb-2">
          Click any year to see what you missed
        </p>
        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-600">Minor updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Important changes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="text-sm text-gray-600">Revolutionary!</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>

        {/* Years */}
        <div className="relative space-y-12 pb-12">
          {years.map((year, index) => {
            const event = yearEvents[year as keyof typeof yearEvents]
            if (!event) return null
            
            const isLeft = index % 2 === 0

            return (
              <div
                key={year}
                className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Content */}
                <div
                  className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
                  onMouseEnter={() => setHoveredYear(year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div
                    onClick={() => onYearClick(year)}
                    className={`
                      inline-block p-6 rounded-xl cursor-pointer transition-all duration-300
                      ${hoveredYear === year 
                        ? 'bg-white shadow-2xl transform scale-105' 
                        : 'bg-white/80 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    <div className="font-bold text-2xl text-gray-900 mb-2">
                      {year}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {event.title}
                    </div>
                    {event.impact === 'revolutionary' && (
                      <div className="mt-2 text-purple-600 font-semibold">
                        ⚡ Must Learn!
                      </div>
                    )}
                  </div>
                </div>

                {/* Year dot */}
                <div
                  className={`
                    absolute left-1/2 transform -translate-x-1/2 
                    w-8 h-8 rounded-full transition-all duration-300 cursor-pointer
                    ${getYearStyle(event.impact)}
                  `}
                  onClick={() => onYearClick(year)}
                >
                  {event.impact === 'revolutionary' && (
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Email All Reports Button */}
      <div className="text-center mt-16">
        <button
          onClick={handleEmailAllReports}
          className={`
            px-8 py-4 rounded-lg font-semibold text-white transition-all
            ${emailSent 
              ? 'bg-green-500' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }
          `}
        >
          {emailSent ? (
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Reports sent to {userEmail}!</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email All Yearly Reports</span>
            </span>
          )}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Get a comprehensive PDF of all changes since {baselineYear}
        </p>
      </div>
    </div>
  )
}
