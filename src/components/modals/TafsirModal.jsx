import React, { useState } from 'react'
import Modal from './Modal'

export default function TafsirModal({ show, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`https://api.betabotz.eu.org/api/muslim/tafsirsurah?text=${searchTerm}&apikey=beta-arisenine`)
      const result = await response.json()
      
      if (result.status && result.result) {
        setResults(result.result)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error('Error searching tafsir:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onClose={onClose} title="Cari Tafsir" size="2xl">
      <div className="flex flex-col h-full">
        {/* Search Form */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik kata kunci (contoh: sabar, nabi musa)" 
              className="w-full bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-lg p-3 pl-10 focus:ring-primary-500 focus:border-primary-500" 
              required 
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
          </form>
        </div>

        {/* Results */}
        <div className="p-6 flex-1 overflow-y-auto">
          {loading && (
            <div className="text-center py-20">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="font-medium">Mencari tafsir...</p>
            </div>
          )}

          {!loading && results.length === 0 && searchTerm && (
            <p className="text-center text-neutral-500">
              Tafsir untuk kata kunci "{searchTerm}" tidak ditemukan.
            </p>
          )}

          {!loading && !searchTerm && (
            <p className="text-center text-neutral-500">
              Masukkan kata kunci untuk memulai pencarian tafsir.
            </p>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((item, index) => {
                if (!item.surah || !item.tafsir) return null
                
                const cleanedTafsir = item.tafsir.replace(/^.*?-deskripsi\">/, '').trim()
                
                return (
                  <div key={index} className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg border dark:border-neutral-700">
                    <p className="font-semibold text-primary-600 dark:text-primary-400">{item.surah}</p>
                    <p className="mt-2 text-sm leading-relaxed">{cleanedTafsir}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}