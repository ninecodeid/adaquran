import React, { useState } from 'react'
import PrayerTimesModal from './modals/PrayerTimesModal'
import TasbihModal from './modals/TasbihModal'
import ContentModal from './modals/ContentModal'
import WiridDoaModal from './modals/WiridDoaModal'

export default function QuickActions() {
  const [showPrayerTimes, setShowPrayerTimes] = useState(false)
  const [showTasbih, setShowTasbih] = useState(false)
  const [showTahlil, setShowTahlil] = useState(false)
  const [showWiridDoa, setShowWiridDoa] = useState(false)
  const [showAsmaulHusna, setShowAsmaulHusna] = useState(false)

  return (
    <>
      <section className="py-4">
        <div className="glass-effect container max-w-lg mx-auto py-3 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 animate-slide-up">
          <div className="flex flex-nowrap horizontal-scroll-container gap-4 py-2 px-1">
            
            {/* Prayer Times */}
            <div
              onClick={() => setShowPrayerTimes(true)}
              className="flex flex-col items-center justify-center text-center rounded-xl md:rounded-3xl cursor-pointer p-1 group flex-shrink-0 w-20 md:w-24"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-all duration-300 group-hover:scale-110">
                <img
                  alt="Waktu Sholat"
                  src="https://quran.nu.or.id/_next/static/media/tahlil.91a46b2c.svg"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-[10px] md:text-sm font-medium mt-1.5">Waktu Sholat</h2>
            </div>

            {/* Tasbih */}
            <div
              onClick={() => setShowTasbih(true)}
              className="flex flex-col items-center justify-center text-center rounded-xl md:rounded-3xl cursor-pointer p-1 group flex-shrink-0 w-20 md:w-24"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                <img
                  alt="Tasbih"
                  src="https://files.catbox.moe/4mhy3o.png"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-[10px] md:text-sm font-medium mt-1.5">Tasbih</h2>
            </div>

            {/* Tahlil */}
            <div
              onClick={() => setShowTahlil(true)}
              className="flex flex-col items-center justify-center text-center rounded-xl md:rounded-3xl cursor-pointer p-1 group flex-shrink-0 w-20 md:w-24"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                <img
                  alt="Tahlil & Yasin"
                  src="https://lann.pw/get-upload?id=uploader-api-1:1752933322295.png"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-[10px] md:text-sm font-medium mt-1.5">Tahlil</h2>
            </div>

            {/* Wirid & Doa */}
            <div
              onClick={() => setShowWiridDoa(true)}
              className="flex flex-col items-center justify-center text-center rounded-xl md:rounded-3xl cursor-pointer p-1 group flex-shrink-0 w-20 md:w-24"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                <img
                  alt="Wirid & Doa"
                  src="https://quran.nu.or.id/_next/static/media/doa.cb10f7f5.svg"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-[10px] md:text-sm font-medium mt-1.5">Wirid</h2>
            </div>

            {/* Asmaul Husna */}
            <div
              onClick={() => setShowAsmaulHusna(true)}
              className="flex flex-col items-center justify-center text-center rounded-xl md:rounded-3xl cursor-pointer p-1 group flex-shrink-0 w-20 md:w-24"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                <img
                  alt="Asmaul Husna"
                  src="https://quran.nu.or.id/_next/static/media/maulid.46a50da0.svg"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-[10px] md:text-sm font-medium mt-1.5">Asmaul Husna</h2>
            </div>

          </div>
        </div>
      </section>

      {/* Modals */}
      <PrayerTimesModal show={showPrayerTimes} onClose={() => setShowPrayerTimes(false)} />
      <TasbihModal show={showTasbih} onClose={() => setShowTasbih(false)} />
      <ContentModal 
        show={showTahlil} 
        onClose={() => setShowTahlil(false)}
        title="Bacaan Tahlil"
        endpoint="https://api.betabotz.eu.org/api/muslim/tahlil?apikey=beta-arisenine"
        type="tahlil"
      />
      <WiridDoaModal show={showWiridDoa} onClose={() => setShowWiridDoa(false)} />
      <ContentModal 
        show={showAsmaulHusna} 
        onClose={() => setShowAsmaulHusna(false)}
        title="Asmaul Husna"
        endpoint="https://asmaul-husna-api.vercel.app/api/all"
        type="asmaulhusna"
      />
    </>
  )
}