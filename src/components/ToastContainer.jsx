import React, { useState, useEffect } from 'react'

let addToast

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    addToast = (message, type = 'info') => {
      const id = Date.now()
      const toast = { id, message, type }
      
      setToasts(prev => [...prev, toast])
      
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3000)
    }
  }, [])

  const getToastStyles = (type) => {
    const styles = {
      info: 'bg-primary-500',
      success: 'bg-primary-500', 
      error: 'bg-red-500'
    }
    return styles[type] || styles.info
  }

  const getToastIcon = (type) => {
    const icons = {
      info: 'fa-info-circle',
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle'
    }
    return icons[type] || icons.info
  }

  return (
    <div className="fixed bottom-24 right-5 z-[60] space-y-2" aria-live="polite" aria-atomic="true">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 ${getToastStyles(toast.type)} text-white text-sm font-bold px-4 py-3 rounded-md shadow-lg animate-fade-in`}
        >
          <i className={`fas ${getToastIcon(toast.type)}`}></i>
          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  )
}

// Export function to show toasts from other components
export const showToast = (message, type = 'info') => {
  if (addToast) {
    addToast(message, type)
  }
}