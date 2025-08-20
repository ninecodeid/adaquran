import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAudio } from '../../contexts/AudioContext'
import { showToast } from '../ToastContainer'
import SettingsModal from '../modals/SettingsModal'
import TafsirModal from '../modals/TafsirModal'

export default function SurahDetailPage() {
  const { surahNumber } = useParams()
  const navigate = useNavigate()
  const { setCurrentSurahData, playAyat, currentIndex } = useAudio()
  
  const [surahData, setSurahData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [showTafsir, setShowTafsir] = useState(false)

  useEffect(() => {
    loadSurahDetail()
    loadBookmarks()
    
    // Handle hash for direct ayat navigation
    const hash = window.location.hash
    if (hash.startsWith('#ayat-')) {
      const ayatNumber = parseInt(hash.replace('#ayat-', ''))
      setTimeout(() => scrollToAyat(ayatNumber), 500)
    }
  }, [surahNumber])

  useEffect(() => {
    if (surahData) {
      setCurrentSurahData(surahData)
      saveLastRead(parseInt(surahNumber), 1)
    }
  }, [surahData, surahNumber])

  const loadSurahDetail = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`)
      const result = await response.json()
      
      if (result.code !== 200 || !result.data) {
        throw new Error('Surah tidak ditemukan')
      }
      
      setSurahData(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadBookmarks = () => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setBookmarks(saved)
  }

  const saveLastRead = (surah, ayat) => {
    localStorage.setItem('lastRead', JSON.stringify({ surah, ayat }))
  }

  const scrollToAyat = (ayatNumber) => {
    const element = document.getElementById(`ayat-${ayatNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.classList.add('animate-pulse')
      setTimeout(() => element.classList.remove('animate-pulse'), 2000)
    }
  }

  const copyVerse = (ayatNumber) => {
    const ayat = surahData.ayat.find(a => a.nomorAyat === ayatNumber)
    if (!ayat) return

    const textToCopy = `[QS. ${surahData.namaLatin}: ${ayatNumber}]\n\n${ayat.teksArab}\n\n${ayat.teksLatin}\n\nArtinya: "${ayat.teksIndonesia}"\n\n- Dari Ada Qur'an oleh Levi Setiadi`
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => showToast(`QS. ${surahData.namaLatin}: ${ayatNumber} berhasil disalin!`, 'success'))
      .catch(() => showToast('Gagal menyalin ayat.', 'error'))
  }

  const toggleBookmark = (ayatNumber) => {
    const existingIndex = bookmarks.findIndex(b => b.surah === parseInt(surahNumber) && b.ayat === ayatNumber)
    let newBookmarks
    
    if (existingIndex > -1) {
      newBookmarks = bookmarks.filter((_, index) => index !== existingIndex)
      showToast('Bookmark dihapus', 'info')
    } else {
      newBookmarks = [...bookmarks, {
        surah: parseInt(surahNumber),
        ayat: ayatNumber,
        surahName: surahData.namaLatin
      }]
      showToast('Bookmark disimpan', 'success')
    }
    
    setBookmarks(newBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
  }

  const isBookmarked = (ayatNumber) => {
    return bookmarks.some(b => b.surah === parseInt(surahNumber) && b.ayat === ayatNumber)
  }

  const playAudio = (ayatNumber) => {
    const ayatIndex = ayatNumber - 1
    playAyat(ayatIndex)
  }

  if (loading) {
    return (
      <div className="container max-w-screen-md mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="font-medium">Memuat Surah...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-screen-md mx-auto px-4 py-8">
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={loadSurahDetail}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  const { suratSebelumnya: prev, suratSelanjutnya: next } = surahData

  return (
    <>
      <div className="container max-w-screen-md mx-auto px-4">
        {/* Header */}
        <div className="glass-effect sticky top-0 z-20 -mx-4 px-4 py-3 mb-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="container mx-auto flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              aria-label="Kembali" 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            
            <div className="flex items-center gap-2 text-sm sm:text-base text-center">
              <button 
                disabled={!prev}
                onClick={() => navigate(`/surah/${prev?.nomor}`)}
                aria-label="Surah sebelumnya" 
                className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <div className="w-40 sm:w-48">
                <h2 className="font-bold truncate">{surahData.namaLatin}</h2>
                <p className="text-xs text-neutral-500">{surahData.arti}</p>
              </div>
              
              <button 
                disabled={!next}
                onClick={() => navigate(`/surah/${next?.nomor}`)}
                aria-label="Surah berikutnya" 
                className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <button 
              onClick={() => setShowSettings(true)}
              aria-label="Buka pengaturan" 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            >
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>

        {/* Description */}
        {surahData.deskripsi && (
          <div className="p-4 mb-6 bg-primary-50 dark:bg-primary-950 border-l-4 border-primary-500 rounded-r-lg">
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: surahData.deskripsi }} />
          </div>
        )}

        {/* Bismillah */}
        {surahData.nomor !== 1 && surahData.nomor !== 9 && (
          <div className="text-center py-8">
            <p className="font-arabic text-4xl">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
          </div>
        )}

        {/* Ayat List */}
        <div className="space-y-5">
          {surahData.ayat.map((ayat, index) => {
            const isPlaying = currentIndex === index
            
            return (
              <div 
                key={ayat.nomorAyat}
                id={`ayat-${ayat.nomorAyat}`}
                className={`ayat-card bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-transparent transition-all duration-300 ${
                  isPlaying ? 'playing' : ''
                }`}
              >
                <div className="ayat-header flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-t-2xl border-b border-neutral-200 dark:border-neutral-800">
                  <span className="w-9 h-9 flex items-center justify-center bg-primary-500 text-white font-bold rounded-full text-sm">
                    {ayat.nomorAyat}
                  </span>
                  <div className="flex space-x-1 text-neutral-500 dark:text-neutral-400">
                    <button 
                      onClick={() => copyVerse(ayat.nomorAyat)}
                      title="Salin Ayat" 
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:text-primary-600 dark:hover:text-primary-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 transition-colors"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <button 
                      onClick={() => toggleBookmark(ayat.nomorAyat)}
                      title="Bookmark" 
                      className={`bookmark-btn w-8 h-8 rounded-full flex items-center justify-center hover:text-warning-500 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 transition-colors ${
                        isBookmarked(ayat.nomorAyat) ? 'bookmarked' : ''
                      }`}
                    >
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button 
                      onClick={() => setShowTafsir(true)}
                      title="Cari Tafsir" 
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:text-primary-600 dark:hover:text-primary-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 transition-colors"
                    >
                      <i className="fas fa-book-open"></i>
                    </button>
                    <button 
                      onClick={() => playAudio(ayat.nomorAyat)}
                      title="Putar Audio" 
                      className="play-btn w-8 h-8 rounded-full flex items-center justify-center hover:text-primary-600 dark:hover:text-primary-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 transition-colors"
                    >
                      <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <p className="arabic-text w-full mb-8 text-right">{ayat.teksArab}</p>
                  <hr className="border-dashed border-neutral-200 dark:border-neutral-800 my-6"/>
                  <div className="space-y-4">
                    <div className="translation-container">
                      <p className="latin-text text-primary-700 dark:text-primary-400 text-sm italic leading-relaxed">
                        {ayat.teksLatin}
                      </p>
                      <p className="translation-text leading-relaxed mt-2 text-neutral-600 dark:text-neutral-300">
                        {ayat.teksIndonesia}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
      <TafsirModal show={showTafsir} onClose={() => setShowTafsir(false)} />
    </>
  )
}