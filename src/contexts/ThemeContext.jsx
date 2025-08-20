import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const THEME_COLORS = {
  blue: {
    "--primary-50": "#eff6ff",
    "--primary-100": "#dbeafe",
    "--primary-200": "#bfdbfe",
    "--primary-300": "#93c5fd",
    "--primary-400": "#60a5fa",
    "--primary-500": "#3b82f6",
    "--primary-600": "#2563eb",
    "--primary-700": "#1d4ed8",
    "--primary-800": "#1e40af",
    "--primary-900": "#1e3a8a",
    "--primary-950": "#172554",
  },
  purple: {
    "--primary-50": "#faf5ff",
    "--primary-100": "#f3e8ff",
    "--primary-200": "#e9d5ff",
    "--primary-300": "#d8b4fe",
    "--primary-400": "#c084fc",
    "--primary-500": "#a855f7",
    "--primary-600": "#9333ea",
    "--primary-700": "#7e22ce",
    "--primary-800": "#6b21a8",
    "--primary-900": "#581c87",
    "--primary-950": "#3b0764",
  },
  green: {
    "--primary-50": "#f0fdf4",
    "--primary-100": "#dcfce7",
    "--primary-200": "#bbf7d0",
    "--primary-300": "#86efac",
    "--primary-400": "#4ade80",
    "--primary-500": "#22c55e",
    "--primary-600": "#16a34a",
    "--primary-700": "#15803d",
    "--primary-800": "#166534",
    "--primary-900": "#14532d",
    "--primary-950": "#052e16",
  },
  orange: {
    "--primary-50": "#fff7ed",
    "--primary-100": "#ffedd5",
    "--primary-200": "#fed7aa",
    "--primary-300": "#fdba74",
    "--primary-400": "#fb923c",
    "--primary-500": "#f97316",
    "--primary-600": "#ea580c",
    "--primary-700": "#c2410c",
    "--primary-800": "#9a3412",
    "--primary-900": "#7c2d12",
    "--primary-950": "#431407",
  },
  indigo: {
    "--primary-50": "#eef2ff",
    "--primary-100": "#e0e7ff",
    "--primary-200": "#c7d2fe",
    "--primary-300": "#a5b4fc",
    "--primary-400": "#818cf8",
    "--primary-500": "#6366f1",
    "--primary-600": "#4f46e5",
    "--primary-700": "#4338ca",
    "--primary-800": "#3730a3",
    "--primary-900": "#312e81",
    "--primary-950": "#1e1b4b",
  },
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'blue'
  })

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const changeThemeColor = (color) => {
    if (color in THEME_COLORS) {
      setThemeColor(color)
      localStorage.setItem('themeColor', color)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const root = document.documentElement
    const colors = THEME_COLORS[themeColor]
    
    for (const [key, value] of Object.entries(colors)) {
      root.style.setProperty(key, value)
    }

    // Update RGB values for shadows
    const rgbValues = hexToRgb(colors["--primary-500"])
    if (rgbValues) {
      root.style.setProperty(
        "--primary-500-rgb",
        `${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}`
      )
    }
  }, [themeColor])

  const value = {
    isDark,
    themeColor,
    toggleTheme,
    changeThemeColor,
    THEME_COLORS
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}