import React, { useState, useEffect } from 'react'
import Modal from './Modal'

const PRAYER_ICONS = {
  subuh: 'fa-cloud-sun',
  terbit: 'fa-sun',
  dhuha: 'fa-sun',
  dzuhur: 'fa-sun',
  ashar: 'fa-cloud-sun',
  maghrib: 'fa-cloud-moon',
  isya: 'fa-moon'
}

export default function PrayerTimesModal({ show, onClose }) {
  const [prayerData, setPrayerData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayerInfo, setNextPrayerInfo] = useState(null)

  useEffect(() => {
    if (show) {
      loadPrayerTimes()
      const interval = setInterval(() => setCurrentTime(new Date()), 1000)
      return () => clearInterval(interval)
    }
  }, [show])

  useEffect(() => {
    if (prayerData) {
      calculateNextPrayer()
    }
  }, [prayerData, currentTime])

  const calculateNextPrayer = () => {
    const prayerOrder = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya']
    const now = new Date()
    
    let nextPrayerName = ''
    let nextPrayerDateTime

    for (const prayer of prayerOrder) {
      const [h, m] = prayerData.jadwal[prayer].split(':')
      const prayerDate = new Date()
      prayerDate.setHours(h, m, 0, 0)
      
      if (prayerDate > now) {
        nextPrayerName = prayer
        nextPrayerDateTime = prayerDate
        break
      }
    }

    // If no prayer found for today, next is subuh tomorrow
    if (!nextPrayerName) {
      nextPrayerName = 'subuh'
      const [h, m] = prayerData.jadwal.subuh.split(':')
      nextPrayerDateTime = new Date()
      nextPrayerDateTime.setDate(nextPrayerDateTime.getDate() + 1)
      nextPrayerDateTime.setHours(h, m, 0, 0)
    }

    const diff = nextPrayerDateTime - now
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setNextPrayerInfo({
        name: nextPrayerName,
        countdown: `dalam ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      })
    }
  }

  const loadPrayerTimes = async () => {
    const savedCityId = localStorage.getItem('prayerCityId')
    if (savedCityId) {
      await fetchPrayerTimes(savedCityId, localStorage.getItem('prayerCityName'))
    } else {
      setSearchResults([])
    }
  }

  const fetchPrayerTimes = async (cityId, cityName) => {
    setLoading(true)
    try {
      const date = new Date()
      const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
      
      const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${formattedDate}`)
      const result = await response.json()
      
      if (result.data) {
        setPrayerData(result.data)
        setSearchResults(null)
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchCities = async (keyword) => {
    if (keyword.length < 3) return
    
    try {
      const response = await fetch(`https://api.myquran.com/v2/sholat/kota/cari/${keyword}`)
      const result = await response.json()
      
      if (result.data) {
        setSearchResults(result.data)
      }
    } catch (error) {
      console.error('Error searching cities:', error)
    }
  }

  const selectCity = (cityId, cityName) => {
    localStorage.setItem('prayerCityId', cityId)
    localStorage.setItem('prayerCityName', cityName)
    fetchPrayerTimes(cityId, cityName)
  }

  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("Browser ini tidak mendukung notifikasi.")
      return
    }
    
    if (Notification.permission === "granted") {
      alert("Izin notifikasi sudah diberikan.")
      return
    }
    
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("Notifikasi Sholat diaktifkan!")
        }
      })
    }
  }

  const renderSearchView = () => (
    <div className="p-6">
      <div className="mb-4 relative">
        <label htmlFor="city-search-input" className="font-semibold">Cari Kota Anda</label>
        <input 
          type="text" 
          id="city-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            searchCities(e.target.value)
          }}
          placeholder="Ketik nama kota..." 
          className="w-full mt-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
        />
        <i className="fas fa-search absolute right-4 top-10 text-neutral-400"></i>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {searchResults ? (
          searchResults.length > 0 ? (
            searchResults.map(city => (
              <button 
                key={city.id}
                onClick={() => selectCity(city.id, city.lokasi)}
                className="w-full text-left p-3 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-lg"
              >
                {city.lokasi}
              </button>
            ))
          ) : (
            <p className="text-center text-neutral-500">Kota tidak ditemukan.</p>
          )
        ) : (
          <p className="text-center text-sm text-neutral-400">Masukkan nama kota untuk mencari jadwal sholat.</p>
        )}
      </div>
    </div>
  )

  const renderPrayerTimes = () => (
    <div className="p-4 sm:p-6 bg-neutral-100/50 dark:bg-neutral-900/50">
      {/* Clock & Location */}
      <div className="text-center mb-6">
        <p className="font-mono font-bold text-4xl md:text-5xl text-primary-600 dark:text-primary-300 tracking-wider">
          {currentTime.toLocaleTimeString('en-GB')}
        </p>
        <p className="font-semibold text-neutral-600 dark:text-neutral-300">{prayerData.lokasi}</p>
        <p className="text-sm text-neutral-500">{prayerData.jadwal.tanggal}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <button 
            onClick={() => setPrayerData(null)}
            className="text-xs text-primary-500 hover:underline"
          >
            Ganti Kota
          </button>
          <button 
            onClick={requestNotificationPermission}
            className="text-xs text-primary-500 hover:underline"
          >
            Aktifkan Notifikasi Sholat
          </button>
        </div>
      </div>

      {/* Next Prayer */}
      {nextPrayerInfo && (
        <div className="bg-primary-500 bg-glass-blue text-white p-5 rounded-xl text-center mb-6 shadow-lg">
          <p className="font-semibold uppercase text-sm">WAKTU SHOLAT BERIKUTNYA</p>
          <p className="font-bold text-3xl capitalize my-1">{nextPrayerInfo.name}</p>
          <p className="font-mono text-lg text-glow-blue">{nextPrayerInfo.countdown}</p>
        </div>
      )}

      {/* Prayer Times List */}
      <div className="space-y-3">
        {['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].map(prayer => {
          const isNext = nextPrayerInfo?.name === prayer
          return (
            <div 
              key={prayer}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                isNext 
                  ? 'bg-primary-100 dark:bg-primary-900/50 border-l-4 border-primary-500' 
                  : 'bg-white dark:bg-neutral-800/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <i className={`fas ${PRAYER_ICONS[prayer]} w-5 text-center text-lg ${
                  isNext ? 'text-primary-500' : 'text-neutral-400'
                }`}></i>
                <p className={`font-semibold capitalize ${
                  isNext 
                    ? 'text-primary-700 dark:text-primary-300' 
                    : 'text-neutral-700 dark:text-neutral-300'
                }`}>
                  {prayer}
                </p>
              </div>
              <p className={`font-mono font-bold text-lg ${
                isNext 
                  ? 'text-primary-600 dark:text-primary-200' 
                  : 'text-neutral-800 dark:text-neutral-200'
              }`}>
                {prayerData.jadwal[prayer]}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <Modal show={show} onClose={onClose} title="Waktu Sholat">
      {loading ? (
        <div className="text-center py-20">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="font-medium">Memuat jadwal sholat...</p>
        </div>
      ) : prayerData ? (
        renderPrayerTimes()
      ) : (
        renderSearchView()
      )}
    </Modal>
  )
}