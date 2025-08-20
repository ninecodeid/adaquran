import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { AudioProvider } from './contexts/AudioContext'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header'
import AudioPlayer from './components/AudioPlayer'
import FloatingButtons from './components/FloatingButtons'
import DonationFab from './components/DonationFab'
import ToastContainer from './components/ToastContainer'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AudioProvider>
          <Router>
            <div className="bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-200 font-sans min-h-screen">
              <Header />
              <main className="min-h-screen">
                <AppRoutes />
              </main>
              <AudioPlayer />
              <FloatingButtons />
              <DonationFab />
              <ToastContainer />
              <Footer />
            </div>
          </Router>
        </AudioProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App