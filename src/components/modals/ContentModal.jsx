import React, { useState, useEffect } from 'react'
import Modal from './Modal'

export default function ContentModal({ show, onClose, title, endpoint, type }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show && endpoint) {
      fetchContent()
    }
  }, [show, endpoint])

  const fetchContent = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(endpoint)
      const result = await response.json()
      
      const data = result?.result?.data || result.data
      if (!data || !Array.isArray(data)) {
        throw new Error('Format data tidak valid')
      }
      
      setContent(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderTahlil = (data) => (
    <div className="p-4 sm:p-6 space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 font-bold rounded-full">
            {index + 1}
          </div>
          <div className={`flex-grow pb-8 ${index < data.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}>
            <h3 className="font-serif font-bold text-lg text-primary-700 dark:text-primary-400">{item.title}</h3>
            <p className="arabic-text text-3xl my-6 text-right leading-relaxed">{item.arabic}</p>
            <p className="text-sm italic text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.translation}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAsmaulHusna = (data) => (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map(item => (
        <div key={item.urutan} className="relative bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl border dark:border-neutral-800 text-center flex flex-col justify-center items-center transition-transform hover:scale-105 hover:shadow-lg">
          <span className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-primary-500 text-white text-xs font-bold rounded-full">
            {item.urutan}
          </span>
          <h3 className="font-arabic text-2xl mt-4">{item.arab}</h3>
          <p className="font-semibold text-sm mt-2">{item.latin}</p>
          <p className="text-xs text-neutral-500 mt-1">{item.arti}</p>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-20">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="font-medium">Memuat {title}...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 p-8 rounded-lg mx-4">
          <i className="fas fa-exclamation-triangle text-red-500 text-3xl mb-4"></i>
          <p className="text-red-600 dark:text-red-300 font-semibold mb-4">Gagal memuat {title}.</p>
          <button 
            onClick={fetchContent}
            className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )
    }

    if (!content) return null

    switch (type) {
      case 'tahlil':
        return renderTahlil(content)
      case 'asmaulhusna':
        return renderAsmaulHusna(content)
      default:
        return <div className="p-6">Content not implemented for type: {type}</div>
    }
  }

  return (
    <Modal show={show} onClose={onClose} title={title} size="lg">
      {renderContent()}
    </Modal>
  )
}