import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import DoaDetailModal from './DoaDetailModal'

export default function WiridDoaModal({ show, onClose }) {
  const [activeTab, setActiveTab] = useState('wirid')
  const [wiridData, setWiridData] = useState([])
  const [doaData, setDoaData] = useState([])
  const [filteredDoa, setFilteredDoa] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoa, setSelectedDoa] = useState(null)
  const [showDoaDetail, setShowDoaDetail] = useState(false)

  useEffect(() => {
    if (show) {
      loadContent(activeTab)
    }
  }, [show, activeTab])

  useEffect(() => {
    if (activeTab === 'doa') {
      const filtered = doaData.filter(doa => 
        doa.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredDoa(filtered)
    }
  }, [searchTerm, doaData, activeTab])

  const loadContent = async (type) => {
    if ((type === 'wirid' && wiridData.length > 0) || (type === 'doa' && doaData.length > 0)) {
      return
    }

    setLoading(true)
    
    try {
      const endpoint = type === 'wirid' 
        ? 'https://api.betabotz.eu.org/api/muslim/wirid?apikey=beta-arisenine'
        : 'https://api.betabotz.eu.org/api/muslim/doaharian?apikey=beta-arisenine'
      
      const response = await fetch(endpoint)
      const result = await response.json()
      const data = (result?.result?.data || result.data).map((item, index) => ({
        ...item,
        originalIndex: index
      }))

      if (type === 'wirid') {
        setWiridData(data)
      } else {
        setDoaData(data)
        setFilteredDoa(data)
      }
    } catch (error) {
      console.error(`Error loading ${type}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const openDoaDetail = (doa) => {
    setSelectedDoa(doa)
    setShowDoaDetail(true)
  }

  const renderWirid = (data) => (
    <div className="p-4 sm:p-6 space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 font-bold rounded-full">
            {index + 1}
          </div>
          <div className={`flex-grow pb-8 ${index < data.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}>
            <p className="arabic-text text-3xl my-4 text-right leading-relaxed">{item.arabic}</p>
            <div className="px-3 py-1 inline-block text-xs font-semibold text-primary-800 bg-primary-100 dark:bg-primary-900/80 dark:text-primary-200 rounded-full">
              {item.tnc || `Dibaca ${item.times}x`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderDoa = (data) => (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.length === 0 ? (
        <p className="text-center text-neutral-500 col-span-full py-10">Doa tidak ditemukan.</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            onClick={() => openDoaDetail(item)}
            className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-primary-500 hover:shadow-lg transition-all animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h3 className="font-semibold font-serif text-primary-800 dark:text-primary-300 truncate">
              {item.title}
            </h3>
            <p className="arabic-text text-2xl text-right truncate mt-2">{item.arabic}</p>
          </div>
        ))
      )}
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-20">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="font-medium">Memuat...</p>
        </div>
      )
    }

    return activeTab === 'wirid' ? renderWirid(wiridData) : renderDoa(filteredDoa)
  }

  return (
    <>
      <Modal show={show} onClose={onClose} title="Wirid & Doa Harian" size="xl">
        <div className="flex flex-col h-full">
          {/* Header dengan tabs dan search */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setActiveTab('wirid')}
                className={`tab-btn px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'wirid' ? 'active' : 'bg-neutral-200 dark:bg-neutral-800'
                }`}
              >
                Wirid
              </button>
              <button
                onClick={() => setActiveTab('doa')}
                className={`tab-btn px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'doa' ? 'active' : 'bg-neutral-200 dark:bg-neutral-800'
                }`}
              >
                Doa Harian
              </button>
            </div>
            
            {activeTab === 'doa' && (
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari doa..." 
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-primary-500 focus:ring-0"
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"></i>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </Modal>

      <DoaDetailModal 
        show={showDoaDetail} 
        onClose={() => setShowDoaDetail(false)}
        doa={selectedDoa}
      />
    </>
  )
}