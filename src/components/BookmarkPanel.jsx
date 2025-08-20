import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookmarkPanel({ show, onClose }) {
  const [bookmarks, setBookmarks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (show) {
      loadBookmarks()
    }
  }, [show])

  const loadBookmarks = () => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setBookmarks(saved)
  }

  const removeBookmark = (surah, ayat, e) => {
    e.stopPropagation()
    let updatedBookmarks = bookmarks.filter(b => !(b.surah === surah && b.ayat === ayat))
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    setBookmarks(updatedBookmarks)
  }

  const goToBookmark = (surah, ayat) => {
    onClose()
    navigate(`/surah/${surah}#ayat-${ayat}`)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 md:inset-auto md:top-20 md:right-4 bg-neutral-50 dark:bg-neutral-950 w-full md:w-80 md:max-h-96 glass-effect md:rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 z-40 flex flex-col">
      <div className="p-4 border-b dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-primary-600 dark:text-primary-400">
            <i className="fas fa-bookmark mr-2"></i>Bookmark
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup panel bookmark"
            className="text-neutral-400 hover:text-red-500"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div className="p-2 overflow-y-auto flex-1">
        {bookmarks.length === 0 ? (
          <div className="text-center text-neutral-400 p-8">
            Belum ada bookmark.
          </div>
        ) : (
          bookmarks.map((bookmark, index) => (
            <div
              key={index}
              onClick={() => goToBookmark(bookmark.surah, bookmark.ayat)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <div>
                <p className="font-semibold text-sm">{bookmark.surahName}</p>
                <p className="text-xs text-neutral-500">Ayat {bookmark.ayat}</p>
              </div>
              <button
                onClick={(e) => removeBookmark(bookmark.surah, bookmark.ayat, e)}
                aria-label="Hapus bookmark"
                className="text-neutral-400 hover:text-red-500 px-2"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}