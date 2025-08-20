import React, { useState, useRef } from 'react'
import DonationModal from './modals/DonationModal'

export default function DonationFab() {
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 }) // left: 20px, bottom: 20px
  const dragRef = useRef({ offsetX: 0, offsetY: 0 })
  
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setHasDragged(false)
    
    const rect = e.currentTarget.getBoundingClientRect()
    dragRef.current.offsetX = e.clientX - rect.left
    dragRef.current.offsetY = e.clientY - rect.top
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setHasDragged(true)
    
    const newX = e.clientX - dragRef.current.offsetX
    const newY = window.innerHeight - (e.clientY - dragRef.current.offsetY) - 56 // 56px is button height
    
    // Boundary checks
    const maxX = window.innerWidth - 56
    const maxY = window.innerHeight - 56
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleClick = (e) => {
    if (hasDragged) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      setShowDonationModal(true)
    }
  }

  // Attach global mouse events when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <>
      <button
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        title="Dukung Project"
        className={`w-14 h-14 fixed z-20 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 ${isDragging ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ 
          left: `${position.x}px`, 
          bottom: `${position.y}px`,
          animation: isDragging ? 'none' : 'pulse 2s ease-in-out infinite'
        }}
      >
        <i className="fas fa-hand-holding-heart text-2xl"></i>
      </button>

      <DonationModal 
        show={showDonationModal} 
        onClose={() => setShowDonationModal(false)} 
      />
    </>
  )
}