'use client'

import { useState, useRef } from 'react'

interface Props {
  onComplete: (email: string, year: number, subject: string) => void
}

export default function UploadSection({ onComplete }: Props) {
  const [email, setEmail] = useState('')
  const [year, setYear] = useState('2008')
  const [subject, setSubject] = useState('Computer Vision')
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !fileName) return

    setIsProcessing(true)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onComplete(email, parseInt(year), subject)
  }

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Upload Your Old Syllabus
        </h2>
        <p className="text-xl text-gray-600">
          Let's see how your field has evolved since you studied it
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@university.edu"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              We'll send yearly patch notes to this email
            </p>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject/Field
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Computer Vision</option>
              <option>Natural Language Processing</option>
              <option>Machine Learning</option>
              <option>Robotics</option>
              <option>Bioinformatics</option>
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              When did you study this?
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 20 }, (_, i) => 2024 - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Syllabus (PDF)
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {fileName ? (
                <div className="space-y-2">
                  <svg className="w-12 h-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-900 font-medium">{fileName}</p>
                  <p className="text-sm text-gray-500">Click to change file</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Example Syllabi */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium mb-2">
              📘 Don't have your syllabus? Try an example:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setFileName('CS231N-2008-Syllabus.pdf')
                  setSubject('Computer Vision')
                  setYear('2008')
                }}
                className="px-3 py-1 bg-white text-blue-600 text-sm rounded-full hover:bg-blue-100 transition"
              >
                CS231N (2008)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFileName('NLP-2012-Syllabus.pdf')
                  setSubject('Natural Language Processing')
                  setYear('2012')
                }}
                className="px-3 py-1 bg-white text-blue-600 text-sm rounded-full hover:bg-blue-100 transition"
              >
                NLP (2012)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFileName('ML-2015-Syllabus.pdf')
                  setSubject('Machine Learning')
                  setYear('2015')
                }}
                className="px-3 py-1 bg-white text-blue-600 text-sm rounded-full hover:bg-blue-100 transition"
              >
                ML (2015)
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!fileName || !email || isProcessing}
            className={`w-full py-4 rounded-lg font-semibold text-white transition ${
              isProcessing 
                ? 'bg-gray-400 cursor-not-allowed'
                : fileName && email
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                <span>Analyzing syllabus...</span>
              </div>
            ) : (
              'Generate My Learning Timeline'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
