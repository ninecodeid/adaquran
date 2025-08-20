import React, { useState } from 'react'
import SmartHeader from '../SmartHeader'
import DailyContent from '../DailyContent'
import QuickActions from '../QuickActions'
import Navigation from '../Navigation'
import ContentGrid from '../ContentGrid'

export default function HomePage() {
  const [currentView, setCurrentView] = useState('surah')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="container max-w-screen-lg mx-auto relative py-6 px-4">
      <SmartHeader />
      <QuickActions />
      <DailyContent />
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ContentGrid 
        view={currentView} 
        searchTerm={searchTerm}
      />
    </div>
  )
}