import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SurahDetailPage from './pages/SurahDetailPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/surah/:surahNumber" element={<SurahDetailPage />} />
    </Routes>
  )
}