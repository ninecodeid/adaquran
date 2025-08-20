import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecommendedDoaModal from './modals/RecommendedDoaModal'

export default function DailyContent() {
  const navigate = useNavigate()
  const [dailyContent, setDailyContent] = useState(null)
  const [showRecommendedDoa, setShowRecommendedDoa] = useState(false)
  const [recommendedDoa, setRecommendedDoa] = useState(null)

  useEffect(() => {
    generateDailyContent()
  }, [])

  const generateDailyContent = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const dateString = today.toISOString().slice(0, 10)

    // Content bank
    const KONTEN_UMUM = [
      {
        ayat: {
          surah: "Ar-Rahman",
          nomorSurah: 55,
          ayat: 13,
          arab: "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ",
          arti: "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?",
        },
        quote: {
          teks: "Dunia ini laksana bayangan. Kalau kau kejar, ia akan lari darimu. Tapi kalau kau palingkan badanmu, ia tak punya pilihan selain mengikutimu.",
          oleh: "Ibnu Qayyim Al-Jauziyyah",
        },
        rekomendasiSurah: {
          nama: "Al-Waqi'ah",
          nomor: 56,
          deskripsi: "Dikenal sebagai surah pembuka pintu rezeki.",
        },
        rekomendasiDoa: {
          title: "Doa Sayyidul Istighfar",
          arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِيْ وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
          latin: "Allahumma anta rabbii laa ilaaha illaa anta khalaqtanii wa ana 'abduka wa ana 'alaa 'ahdika wa wa'dika mastatha'tu",
          translation: "Ya Allah, Engkau adalah Tuhanku. Tidak ada Tuhan selain Engkau. Engkau sudah menciptakanku, dan aku adalah hamba-Mu.",
        },
      }
    ]

    const KONTEN_JUMAT = {
      ayat: {
        surah: "Al-Jumu'ah",
        nomorSurah: 62,
        ayat: 9,
        arab: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ فَٱسْعَوْا۟ إِلَىٰ ذِكْرِ ٱللَّهِ",
        arti: "Wahai orang-orang yang beriman! Apabila telah diseru untuk melaksanakan salat pada hari Jumat, maka segeralah kamu mengingat Allah",
      },
      quote: {
        teks: "Sebaik-baik hari di mana matahari terbit adalah hari Jumat.",
        oleh: "HR. Muslim",
      },
      rekomendasiSurah: {
        nama: "Al-Kahf",
        nomor: 18,
        deskripsi: "Amalan utama di hari Jumat, cahaya di antara dua Jumat.",
      },
      rekomendasiDoa: {
        title: "Perbanyak Shalawat",
        arabic: "اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        latin: "Allahumma sholli 'ala Muhammad wa 'ala ali Muhammad.",
        translation: "Ya Allah, berikanlah rahmat-Mu kepada junjungan kami Nabi Muhammad dan keluarganya.",
      },
    }

    let kontenPilihan
    if (dayOfWeek === 5) { // Friday
      kontenPilihan = KONTEN_JUMAT
    } else {
      const savedContent = JSON.parse(localStorage.getItem('dailyContent'))
      let dailyContentIndex
      if (savedContent && savedContent.date === dateString) {
        dailyContentIndex = savedContent.index
      } else {
        dailyContentIndex = Math.floor(Math.random() * KONTEN_UMUM.length)
        localStorage.setItem('dailyContent', JSON.stringify({ date: dateString, index: dailyContentIndex }))
      }
      kontenPilihan = KONTEN_UMUM[dailyContentIndex]
    }

    setDailyContent(kontenPilihan)
  }

  const goToAyat = (surah, ayat) => {
    navigate(`/surah/${surah}#ayat-${ayat}`)
  }

  const openRecommendedDoa = (doa) => {
    setRecommendedDoa(doa)
    setShowRecommendedDoa(true)
  }

  if (!dailyContent) return null

  const { ayat, quote, rekomendasiSurah, rekomendasiDoa } = dailyContent
  const isJumat = new Date().getDay() === 5

  return (
    <>
      <section className="my-8">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:shadow-lg p-5 space-y-5 animate-fade-in">
          
          {/* Ayat Pilihan */}
          <div className="cursor-pointer" onClick={() => goToAyat(ayat.nomorSurah, ayat.ayat)}>
            <p className="text-sm font-semibold tracking-wider text-primary-600 dark:text-primary-300 mb-1">
              {isJumat ? '✨ SPESIAL JUMAT ✨' : 'AYAT PILIHAN HARI INI'}
            </p>
            <p className="font-arabic text-3xl md:text-4xl my-4 text-right leading-relaxed">{ayat.arab}</p>
            <p className="text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-300 mb-2">
              "{ayat.arti}"
            </p>
            <p className="font-semibold text-sm">QS. {ayat.surah}: {ayat.ayat}</p>
          </div>

          <hr className="border-neutral-200 dark:border-neutral-800"/>

          {/* Quote */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary-600 dark:text-primary-300 mb-2">
              QUOTE MUTIARA
            </p>
            <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4">
              <p className="text-sm italic text-neutral-800 dark:text-neutral-200">"{quote.teks}"</p>
              <cite className="block text-right text-xs font-semibold mt-2 text-neutral-500">- {quote.oleh}</cite>
            </blockquote>
          </div>

          <hr className="border-neutral-200 dark:border-neutral-800"/>

          {/* Rekomendasi */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary-600 dark:text-primary-300 mb-3">
              REKOMENDASI AMALAN
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => navigate(`/surah/${rekomendasiSurah.nomor}`)}
                className="w-full text-left p-4 bg-neutral-100 dark:bg-neutral-800/70 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <p className="font-bold">Baca Surah {rekomendasiSurah.nama}</p>
                <p className="text-xs text-neutral-500">{rekomendasiSurah.deskripsi}</p>
              </button>
              <button 
                onClick={() => openRecommendedDoa(rekomendasiDoa)}
                className="w-full text-left p-4 bg-neutral-100 dark:bg-neutral-800/70 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <p className="font-bold">Amalkan {rekomendasiDoa.title}</p>
                <p className="text-xs text-neutral-500">Klik untuk melihat bacaan doa</p>
              </button>
            </div>
          </div>

        </div>
      </section>

      <RecommendedDoaModal 
        show={showRecommendedDoa} 
        onClose={() => setShowRecommendedDoa(false)}
        doa={recommendedDoa}
      />
    </>
  )
}