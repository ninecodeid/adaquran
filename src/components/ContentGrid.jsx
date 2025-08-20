import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import KisahDetailModal from './modals/KisahDetailModal'

const JUZ_DATA = [
  { juz: 1, start: { surah: 1, ayat: 1 }, end: { surah: 2, ayat: 141 } },
  { juz: 2, start: { surah: 2, ayat: 142 }, end: { surah: 2, ayat: 252 } },
  { juz: 3, start: { surah: 2, ayat: 253 }, end: { surah: 3, ayat: 92 } },
  { juz: 4, start: { surah: 3, ayat: 93 }, end: { surah: 4, ayat: 23 } },
  { juz: 5, start: { surah: 4, ayat: 24 }, end: { surah: 4, ayat: 147 } },
  { juz: 6, start: { surah: 4, ayat: 148 }, end: { surah: 5, ayat: 81 } },
  { juz: 7, start: { surah: 5, ayat: 82 }, end: { surah: 6, ayat: 110 } },
  { juz: 8, start: { surah: 6, ayat: 111 }, end: { surah: 7, ayat: 87 } },
  { juz: 9, start: { surah: 7, ayat: 88 }, end: { surah: 8, ayat: 40 } },
  { juz: 10, start: { surah: 8, ayat: 41 }, end: { surah: 9, ayat: 92 } },
  { juz: 11, start: { surah: 9, ayat: 93 }, end: { surah: 11, ayat: 5 } },
  { juz: 12, start: { surah: 11, ayat: 6 }, end: { surah: 12, ayat: 52 } },
  { juz: 13, start: { surah: 12, ayat: 53 }, end: { surah: 14, ayat: 52 } },
  { juz: 14, start: { surah: 15, ayat: 1 }, end: { surah: 16, ayat: 128 } },
  { juz: 15, start: { surah: 17, ayat: 1 }, end: { surah: 18, ayat: 74 } },
  { juz: 16, start: { surah: 18, ayat: 75 }, end: { surah: 20, ayat: 135 } },
  { juz: 17, start: { surah: 21, ayat: 1 }, end: { surah: 22, ayat: 78 } },
  { juz: 18, start: { surah: 23, ayat: 1 }, end: { surah: 25, ayat: 20 } },
  { juz: 19, start: { surah: 25, ayat: 21 }, end: { surah: 27, ayat: 55 } },
  { juz: 20, start: { surah: 27, ayat: 56 }, end: { surah: 29, ayat: 45 } },
  { juz: 21, start: { surah: 29, ayat: 46 }, end: { surah: 33, ayat: 30 } },
  { juz: 22, start: { surah: 33, ayat: 31 }, end: { surah: 36, ayat: 27 } },
  { juz: 23, start: { surah: 36, ayat: 28 }, end: { surah: 39, ayat: 31 } },
  { juz: 24, start: { surah: 39, ayat: 32 }, end: { surah: 41, ayat: 46 } },
  { juz: 25, start: { surah: 41, ayat: 47 }, end: { surah: 45, ayat: 37 } },
  { juz: 26, start: { surah: 46, ayat: 1 }, end: { surah: 51, ayat: 30 } },
  { juz: 27, start: { surah: 51, ayat: 31 }, end: { surah: 57, ayat: 29 } },
  { juz: 28, start: { surah: 58, ayat: 1 }, end: { surah: 66, ayat: 12 } },
  { juz: 29, start: { surah: 67, ayat: 1 }, end: { surah: 77, ayat: 50 } },
  { juz: 30, start: { surah: 78, ayat: 1 }, end: { surah: 114, ayat: 6 } },
]

export default function ContentGrid({ view, searchTerm }) {
  const navigate = useNavigate()
  const [surahList, setSurahList] = useState([])
  const [kisahNabiList, setKisahNabiList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedKisah, setSelectedKisah] = useState(null)
  const [showKisahModal, setShowKisahModal] = useState(false)

  useEffect(() => {
    if (view === 'surah' && surahList.length === 0) {
      fetchSurahs()
    } else if (view === 'kisah' && kisahNabiList.length === 0) {
      fetchKisahNabi()
    }
  }, [view])

  const fetchSurahs = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://equran.id/api/v2/surat')
      const result = await response.json()
      if (result.data) {
        setSurahList(result.data)
      }
    } catch (error) {
      console.error('Error fetching surahs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchKisahNabi = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.betabotz.eu.org/api/muslim/kisahnabi2?apikey=beta-arisenine')
      const result = await response.json()
      if (result.result) {
        setKisahNabiList(result.result)
      }
    } catch (error) {
      console.error('Error fetching kisah nabi:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterData = (data, term) => {
    if (!term) return data
    
    if (view === 'surah') {
      return data.filter(surah => 
        surah.namaLatin.toLowerCase().includes(term.toLowerCase()) ||
        surah.arti.toLowerCase().includes(term.toLowerCase()) ||
        String(surah.nomor).includes(term)
      )
    } else if (view === 'juz') {
      return data.filter(juz => String(juz.juz).includes(term))
    } else if (view === 'kisah') {
      return data.filter(kisah => 
        kisah.name.toLowerCase().includes(term.toLowerCase())
      )
    }
    
    return data
  }

  const openKisahModal = (kisah) => {
    setSelectedKisah(kisah)
    setShowKisahModal(true)
  }

  const renderSkeletons = (count) => (
    Array(count).fill(0).map((_, index) => (
      <div key={index} className="animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-24"></div>
    ))
  )

  const renderSurahs = (surahs) => (
    surahs.map((surah) => (
      <div key={surah.nomor} onClick={() => navigate(`/surah/${surah.nomor}`)} className="cursor-pointer">
        <div className="relative flex group items-center p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 h-full transition-colors duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-800">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <span className="font-semibold text-neutral-600 dark:text-neutral-400">{surah.nomor}</span>
          </div>
          <div className="flex flex-col flex-grow ms-4">
            <h2 className="block font-semibold text-base">{surah.namaLatin}</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{surah.arti} • {surah.jumlahAyat} ayat</span>
          </div>
          <div className="flex-shrink-0">
            <p className="font-arabic-title text-2xl text-primary-600 dark:text-primary-400">{surah.nama}</p>
          </div>
        </div>
      </div>
    ))
  )

  const renderJuzs = (juzs) => (
    juzs.map((juz) => {
      const startSurah = surahList.find(s => s.nomor === juz.start.surah)
      const endSurah = surahList.find(s => s.nomor === juz.end.surah)
      
      return (
        <div key={juz.juz} onClick={() => navigate(`/surah/${juz.start.surah}#ayat-${juz.start.ayat}`)} className="cursor-pointer">
          <div className="relative flex group items-center p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 h-full transition-colors duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-800">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span className="font-semibold text-neutral-600 dark:text-neutral-400">{juz.juz}</span>
            </div>
            <div className="flex flex-col flex-grow ms-4">
              <h2 className="block font-semibold text-base">Juz {juz.juz}</h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                {startSurah?.namaLatin}:{juz.start.ayat} – {endSurah?.namaLatin}:{juz.end.ayat}
              </span>
            </div>
            <div className="flex-shrink-0">
              <i className="fas fa-chevron-right text-neutral-400 group-hover:text-primary-500"></i>
            </div>
          </div>
        </div>
      )
    })
  )

  const renderKisahNabi = (kisahs) => (
    kisahs.map((kisah, index) => (
      <div key={index} onClick={() => openKisahModal(kisah)} className="cursor-pointer">
        <div className="relative flex group items-center p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 h-full transition-colors duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-800">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <i className="fas fa-book-open text-neutral-600 dark:text-neutral-400"></i>
          </div>
          <div className="flex flex-col flex-grow ms-4">
            <h2 className="block font-semibold text-base">{kisah.name}</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Usia: {kisah.usia} tahun</span>
          </div>
        </div>
      </div>
    ))
  )

  const getDisplayData = () => {
    if (view === 'surah') return filterData(surahList, searchTerm)
    if (view === 'juz') return filterData(JUZ_DATA, searchTerm)
    if (view === 'kisah') return filterData(kisahNabiList, searchTerm)
    return []
  }

  const displayData = getDisplayData()
  const isEmpty = displayData.length === 0 && !loading

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        {loading && renderSkeletons(21)}
        
        {!loading && isEmpty && (
          <div className="col-span-full text-center py-10">
            {searchTerm ? `Tidak ditemukan hasil untuk "${searchTerm}"` : 'Tidak ada data'}
          </div>
        )}

        {!loading && !isEmpty && (
          <>
            {view === 'surah' && renderSurahs(displayData)}
            {view === 'juz' && renderJuzs(displayData)}
            {view === 'kisah' && renderKisahNabi(displayData)}
          </>
        )}
      </div>

      <KisahDetailModal 
        show={showKisahModal} 
        onClose={() => setShowKisahModal(false)}
        kisah={selectedKisah}
      />
    </>
  )
}