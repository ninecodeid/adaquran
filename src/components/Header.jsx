import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import BookmarkPanel from './BookmarkPanel'
import SearchSection from './SearchSection'

export default function Header() {
  const { toggleTheme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)

  return (
    <>
      <header className="sticky top-0 w-full z-40 glass-effect border-b border-neutral-200 dark:border-neutral-800 animate-fade-in">
        <div className="container max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center h-16 md:h-20 px-4">
            <div className="flex-1 flex items-center">
              <a
                href="/"
                className="transition-transform duration-300 hover:scale-105"
              >
                <img
                  src="https://files.catbox.moe/wpnllw.png"
                  alt="Ada Qur'an"
                  className="h-12 w-auto animate-fade-in"
                />
              </a>
            </div>
            <div className="flex-1 flex space-x-2 items-center justify-end text-neutral-700 dark:text-neutral-100">
              <button
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Cari Surah"
                className="flex w-10 h-10 rounded-full text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/70 hover:bg-primary-100 dark:hover:bg-primary-800 focus:outline-none items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-search text-lg"></i>
              </button>
              <button
                onClick={() => setShowBookmarks(!showBookmarks)}
                aria-label="Buka daftar bookmark"
                className="flex w-10 h-10 rounded-full text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/70 hover:bg-primary-100 dark:hover:bg-primary-800 focus:outline-none items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-bookmark text-lg"></i>
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Ganti tema"
                className="flex w-10 h-10 rounded-full text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/70 hover:bg-primary-100 dark:hover:bg-primary-800 focus:outline-none items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-sun block dark:hidden text-lg"></i>
                <i className="fas fa-moon hidden dark:block text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <SearchSection show={showSearch} onClose={() => setShowSearch(false)} />
      <BookmarkPanel show={showBookmarks} onClose={() => setShowBookmarks(false)} />
    </>
  )
}