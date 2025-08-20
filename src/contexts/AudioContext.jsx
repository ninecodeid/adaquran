import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useSettings } from './SettingsContext'

const AudioContext = createContext()

export function AudioProvider({ children }) {
  const { settings } = useSettings()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [currentSurahData, setCurrentSurahData] = useState(null)
  
  const audioRef = useRef(new Audio())

  const audio = audioRef.current

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      if (!isLooping && settings.autoPlay && currentSurahData) {
        playNext()
      } else if (!isLooping && !settings.autoPlay) {
        stopAudio()
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [isLooping, settings.autoPlay, currentSurahData])

  useEffect(() => {
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    audio.loop = isLooping
  }, [isLooping])

  const startPlayback = () => {
    if (!currentSurahData || !currentSurahData.ayat[currentIndex]) return

    const audioUrl = currentSurahData.ayat[currentIndex].audio?.[settings.selectedQari]
    if (!audioUrl) return

    audio.src = audioUrl
    audio.play().catch(console.error)
  }

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }

  const playNext = () => {
    if (!currentSurahData || currentIndex >= currentSurahData.ayat.length - 1) {
      stopAudio()
      return
    }
    
    setCurrentIndex(prev => prev + 1)
  }

  const playPrev = () => {
    if (currentIndex <= 0) return
    setCurrentIndex(prev => prev - 1)
  }

  const stopAudio = () => {
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setProgress(0)
  }

  const playAyat = (ayatIndex) => {
    setCurrentIndex(ayatIndex)
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping)
  }

  const seekTo = (percentage) => {
    if (audio.duration) {
      audio.currentTime = (percentage / 100) * audio.duration
    }
  }

  // Auto play when currentIndex changes
  useEffect(() => {
    if (currentSurahData && currentIndex >= 0) {
      startPlayback()
    }
  }, [currentIndex, currentSurahData, settings.selectedQari])

  const value = {
    isPlaying,
    currentIndex,
    isLooping,
    progress,
    volume,
    currentSurahData,
    setCurrentSurahData,
    togglePlayPause,
    playNext,
    playPrev,
    stopAudio,
    playAyat,
    toggleLoop,
    setVolume,
    seekTo
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}