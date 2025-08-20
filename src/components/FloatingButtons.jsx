import React, { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    const checkLastRead = () => {
      const lastRead = JSON.parse(localStorage.getItem('lastRead') || 'null')
      setShowResume(!!lastRead && window.location.pathname === '/')
    }

    window.addEventListener('scroll', handleScroll)
    checkLastRead()
    
    // Listen for route changes
    const interval = setInterval(checkLastRead, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resumeReading = () => {
    const lastRead = JSON.parse(localStorage.getItem('lastRead'))
    if (lastRead) {
      window.location.href = `/surah/${lastRead.surah}#ayat-${lastRead.ayat}`
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-20 space-y-3 transition-all duration-300">
      {showResume && (
        <button
          onClick={resumeReading}
          title="Lanjutkan Membaca"
          className="w-12 h-12 bg-glass-blue hover:bg-glass-blue-hover text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          <i className="fas fa-book-open text-lg"></i>
        </button>
      )}
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Kembali ke Atas"
          className="w-12 h-12 bg-glass-blue hover:bg-glass-blue-hover text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.2s' }}
        >
          <i className="fas fa-arrow-up text-lg"></i>
        </button>
      )}
    </div>
  )
}