import React from 'react'
import Modal from './Modal'

export default function KisahDetailModal({ show, onClose, kisah }) {
  if (!kisah) return null

  const formattedDescription = kisah.description.replace(/\n/g, '<br class="my-2">')

  return (
    <Modal show={show} onClose={onClose} title={kisah.name} size="xl">
      <div className="p-6">
        <div className="mb-4 text-center">
          <img 
            src={kisah.image_url} 
            alt={kisah.name} 
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-neutral-200 dark:border-neutral-700 mb-2" 
            onError={(e) => e.target.style.display = 'none'}
          />
          <p className="text-sm text-neutral-500">Tahun Kelahiran: ~{kisah.thn_kelahiran} SM</p>
          <p className="text-sm text-neutral-500">Diutus di: {kisah.tmp}</p>
        </div>
        <div 
          className="prose prose-sm dark:prose-invert max-w-none text-justify leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
      </div>
    </Modal>
  )
}