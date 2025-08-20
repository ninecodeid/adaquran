import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function SmartHeader() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [headerData, setHeaderData] = useState(null)

  useEffect(() => {
    generateHeaderData()
  }, [])

  const generateHeaderData = async () => {
    const now = new Date()
    const hour = now.getHours()
    const day = now.getDay()

    // Generate greeting based on time
    let greeting, icon
    if (hour >= 4 && hour < 11) {
      greeting = 'Selamat Pagi'
      icon = '☀️'
    } else if (hour >= 11 && hour < 15) {
      greeting = 'Selamat Siang'
      icon = '🌤️'
    } else if (hour >= 15 && hour < 19) {
      greeting = 'Selamat Sore'
      icon = '🌇'
    } else {
      greeting = 'Selamat Malam'
      icon = '🌙'
    }

    // Generate recommendations
    let recommendations = []
    if (day === 5) { // Friday
      recommendations.push({
        title: 'Jumat Berkah',
        description: 'Jangan lupa baca Surah Al-Kahfi.',
        actionText: 'Baca Al-Kahfi',
        action: () => navigate('/surah/18')
      })
    }
    if (hour >= 18 || hour < 4) {
      recommendations.push({
        title: 'Amalan Malam',
        description: 'Baca Surah Al-Mulk sebelum tidur.',
        actionText: 'Baca Al-Mulk',
        action: () => navigate('/surah/67')
      })
    }
    if (hour >= 4 && hour < 10) {
      recommendations.push({
        title: 'Pembuka Rezeki',
        description: 'Awali pagi dengan Surah Al-Waqi\'ah.',
        actionText: 'Baca Al-Waqi\'ah',
        action: () => navigate('/surah/56')
      })
    }

    // Fetch Hijri calendar
    let hijriData = null
    try {
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
      const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDate}`)
      const result = await response.json()
      
      if (result.data) {
        const hijri = result.data.hijri
        const hijriDay = parseInt(hijri.day)
        let fastingInfo = 'Tidak ada jadwal puasa sunnah khusus hari ini.'
        
        if (day === 1) {
          fastingInfo = 'Jadwal Puasa Sunnah Senin'
        } else if (day === 4) {
          fastingInfo = 'Jadwal Puasa Sunnah Kamis'
        } else if ([13, 14, 15].includes(hijriDay)) {
          fastingInfo = 'Jadwal Puasa Ayyamul Bidh'
        }

        hijriData = {
          dateString: `${hijri.day} ${hijri.month.en} ${hijri.year} H`,
          fastingInfo
        }
      }
    } catch (error) {
      console.error('Error fetching Hijri date:', error)
    }

    setHeaderData({
      greeting,
      icon,
      recommendations,
      hijriData
    })
  }

  if (!headerData) {
    return (
      <section className="mb-8">
        <div className="dynamic-header-card animate-pulse">
          <div className="h-48 bg-transparent rounded-xl"></div>
        </div>
      </section>
    )
  }

  const { greeting, icon, recommendations, hijriData } = headerData
  const dividerClass = isDark ? 'md:divide-x md:divide-white/10' : 'md:divide-x md:divide-primary-900/10'
  const borderClass = isDark ? 'border-white/10 md:border-t-0' : 'border-primary-900/10 md:border-t-0'

  return (
    <section className="mb-8">
      <div className="dynamic-header-card animate-fade-in">
        <div className={`grid grid-cols-1 ${dividerClass}`}>
          {/* Greeting Section */}
          <div className="min-h-[12rem]">
            <div className="flex flex-col h-full p-4 md:p-5 header-text-themed">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-bold text-xl">{greeting}</h3>
              </div>
              <div className="mt-2 flex-grow flex flex-col justify-center">
                {recommendations.length > 0 ? (
                  <>
                    <p className="font-semibold text-lg">{recommendations[0].title}</p>
                    <p className="text-sm mt-1 mb-4 header-subtext-themed">{recommendations[0].description}</p>
                    <button 
                      onClick={recommendations[0].action}
                      className="w-full text-center mt-auto px-4 py-2.5 header-button-themed transition-all rounded-lg font-semibold text-sm"
                    >
                      {recommendations[0].actionText}
                    </button>
                  </>
                ) : (
                  <p className="text-lg header-subtext-themed">Semoga harimu penuh berkah!</p>
                )}
              </div>
            </div>
          </div>

          {/* Hijri Calendar Section */}
          <div className={`min-h-[12rem] border-t ${borderClass}`}>
            <div className="flex flex-col h-full p-4 md:p-5 header-text-themed">
              <div className="flex items-center gap-3">
                <i className="fas fa-calendar-alt text-xl"></i>
                <h3 className="font-bold text-xl">Kalender Islam</h3>
              </div>
              <div className="mt-2 flex-grow flex flex-col justify-center">
                {hijriData ? (
                  <>
                    <p className="font-bold text-2xl md:text-3xl">{hijriData.dateString}</p>
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/20' : 'border-primary-900/20'}`}>
                      <div className="flex items-center gap-3 text-sm header-subtext-themed">
                        <i className="fas fa-moon w-5 text-center text-lg"></i>
                        <span>{hijriData.fastingInfo}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm header-subtext-themed">Gagal memuat data. Periksa koneksi internet Anda.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}