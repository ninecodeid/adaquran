import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const QARI_LIST = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman As-Sudais",
  "04": "Ibrahim Al-Akhdar",
  "05": "Misyari Rasyid Al-Afasi",
}

const DEFAULT_SETTINGS = {
  arabicFontSize: 40,
  translationFontSize: 16,
  showLatin: true,
  showTranslation: true,
  selectedQari: "05",
  autoPlay: false,
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quranSettings')
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  // Apply CSS variables when settings change
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--arabic-font-size', `${settings.arabicFontSize}px`)
    root.style.setProperty('--translation-font-size', `${settings.translationFontSize}px`)
    root.style.setProperty('--latin-visibility', settings.showLatin ? 'block' : 'none')
    root.style.setProperty('--translation-visibility', settings.showTranslation ? 'block' : 'none')
  }, [settings])

  // Save to localStorage when settings change
  useEffect(() => {
    localStorage.setItem('quranSettings', JSON.stringify(settings))
  }, [settings])

  const value = {
    settings,
    updateSetting,
    resetSettings,
    QARI_LIST
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}