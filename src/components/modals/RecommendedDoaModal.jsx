import React from 'react'
import Modal from './Modal'

export default function RecommendedDoaModal({ show, onClose, doa }) {
  if (!doa) return null

  return (
    <Modal show={show} onClose={onClose} title={doa.title} size="lg">
      <div className="p-6 space-y-6">
        <div>
          <p className="arabic-text text-2xl mb-4">{doa.arabic}</p>
          <p className="latin-text text-primary-700 dark:text-primary-400 text-sm italic leading-relaxed mb-2">
            {doa.latin}
          </p>
          <p className="text-sm leading-relaxed">{doa.translation}</p>
        </div>
      </div>
    </Modal>
  )
}