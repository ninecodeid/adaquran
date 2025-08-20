import React from 'react'
import { useAudio } from '../contexts/AudioContext'

export default function AudioPlayer() {
  const {
    isPlaying,
    currentIndex,
    isLooping,
    progress,
    volume,
    currentSurahData,
    togglePlayPause,
    playNext,
    playPrev,
    toggleLoop,
    setVolume,
    seekTo
  } = useAudio()

  if (!isPlaying && !currentSurahData) return null

  const currentAyat = currentSurahData?.ayat?.[currentIndex]

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect z-40 p-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="container max-w-screen-lg mx-auto flex flex-col gap-2 px-4">
        {/* Progress Bar */}
        <div className="w-full h-2 relative group">
          <input
            type="range"
            className="absolute inset-0 m-0 p-0 w-full"
            value={progress}
            onChange={(e) => seekTo(e.target.value)}
            step="0.1"
            min="0"
            max="100"
            style={{
              background: `linear-gradient(to right, var(--primary-600) 0%, var(--primary-600) ${progress}%, var(--primary-200) ${progress}%, var(--primary-200) 100%)`
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <i className="fas fa-quran text-primary-500 text-2xl" aria-hidden="true"></i>
            <div className="text-sm overflow-hidden whitespace-nowrap">
              <p className="font-bold text-ellipsis overflow-hidden">
                {currentSurahData?.namaLatin}: {currentAyat?.nomorAyat}
              </p>
              <p className="text-neutral-500 text-xs">
                {isPlaying ? 'Memutar...' : 'Dijeda'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-lg text-neutral-700 dark:text-neutral-200">
            {/* Volume Control */}
            <div className="flex items-center gap-1 relative group">
              <button
                onClick={toggleLoop}
                aria-label="Ulangi ayat"
                className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-110 ${
                  isLooping ? 'text-primary-500' : 'text-neutral-400'
                }`}
              >
                <i className="fas fa-rotate-right"></i>
              </button>
              
              <button
                aria-label="Kontrol volume"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-110 relative group"
              >
                <i className={`fas ${volume === 0 ? 'fa-volume-off' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'}`}></i>
                <input
                  type="range"
                  value={volume * 100}
                  onChange={(e) => setVolume(e.target.value / 100)}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary-600 origin-bottom-left transform -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </div>

            {/* Playback Controls */}
            <button
              onClick={playPrev}
              aria-label="Ayat sebelumnya"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-110"
            >
              <i className="fas fa-backward-step"></i>
            </button>
            
            <button
              onClick={togglePlayPause}
              aria-label="Putar atau jeda audio"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-glass-blue hover:bg-glass-blue-hover transition-all duration-300 hover:scale-105"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            
            <button
              onClick={playNext}
              aria-label="Ayat berikutnya"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-300 hover:scale-110"
            >
              <i className="fas fa-forward-step"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}