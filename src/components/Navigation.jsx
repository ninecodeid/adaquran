import React from 'react'

export default function Navigation({ currentView, onViewChange, searchTerm, onSearchChange }) {
  const getPlaceholder = () => {
    switch (currentView) {
      case 'surah': return 'Cari Surah...'
      case 'juz': return 'Cari Juz...'
      case 'kisah': return 'Cari nama Nabi...'
      default: return 'Cari...'
    }
  }

  return (
    <>
      {/* Search Section */}
      <section className="my-5 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full px-5 py-3 pl-12 rounded-full text-neutral-800 bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-transparent focus:border-primary-500 transition-all duration-300"
        />
        <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"></i>
      </section>

      {/* View Tabs */}
      <div className="mb-5 flex justify-center border border-neutral-200 dark:border-neutral-700 rounded-full p-1 max-w-md mx-auto bg-neutral-200/50 dark:bg-neutral-800/50 shadow-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={() => onViewChange('surah')}
          className={`view-tab flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            currentView === 'surah' ? 'active' : ''
          }`}
        >
          Surah
        </button>
        <button
          onClick={() => onViewChange('juz')}
          className={`view-tab flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            currentView === 'juz' ? 'active' : ''
          }`}
        >
          Juz
        </button>
        <button
          onClick={() => onViewChange('kisah')}
          className={`view-tab flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            currentView === 'kisah' ? 'active' : ''
          }`}
        >
          Kisah Nabi
        </button>
      </div>
    </>
  )
}