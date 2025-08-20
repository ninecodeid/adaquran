import React, { useEffect } from 'react'

export default function Modal({ show, onClose, title, children, size = 'lg' }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  if (!show) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }

  return (
    <div 
      className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`bg-neutral-50 dark:bg-neutral-950 rounded-lg shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] flex flex-col border border-neutral-200 dark:border-neutral-800`}>
        <div className="p-4 border-b dark:border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm z-10">
          <h3 id="modal-title" className="text-xl font-bold font-serif text-primary-600 dark:text-primary-400">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="text-neutral-400 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}