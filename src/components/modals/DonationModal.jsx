import React from 'react'
import Modal from './Modal'

export default function DonationModal({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose} title="Dukung Project Ini" size="sm">
      <div className="p-6 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
          Scan QR Code di bawah ini menggunakan aplikasi E-Wallet (GoPay, OVO, DANA, dll) untuk mendukung pengembangan Ada Qur'an.
        </p>
        <img
          src="https://files.catbox.moe/vqxsmx.jpg"
          alt="QRIS Donasi"
          className="w-64 h-64 mx-auto rounded-lg border-4 border-white dark:border-neutral-800 shadow-lg"
        />
        <p className="mt-4 font-semibold text-lg">YNINE STORE</p>
        <p className="text-xs text-neutral-400 mt-4">
          Jazākallāhu khayran atas dukunganmu!
        </p>
      </div>
    </Modal>
  )
}