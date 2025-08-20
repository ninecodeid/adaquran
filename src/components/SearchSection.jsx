import React, { useState } from 'react'

export default function SearchSection({ show, onClose, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  if (!show) return null

  return (
    <section className="my-5 relative container max-w-screen-lg mx-auto px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Cari Surah..."
        className="w-full px-5 py-3 pl-12 rounded-full text-neutral-800 bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-transparent focus:border-primary-500 transition-all duration-300"
        autoFocus
      />
      <i className="fas fa-search absolute left-9 top-1/2 -translate-y-1/2 text-neutral-400"></i>
      <button
        onClick={onClose}
        className="absolute right-9 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
      >
        <i className="fas fa-times"></i>
      </button>
    </section>
  )
}