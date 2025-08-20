import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black py-10 lg:py-12 border-t border-neutral-200 dark:border-neutral-800 mt-12">
      <div className="container max-w-screen-lg mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <img
            src="https://files.catbox.moe/wpnllw.png"
            alt="Ada Qur'an"
            className="h-8 w-auto"
          />
          <div className="flex space-x-6 text-neutral-500 dark:text-neutral-400">
            <a
              href="https://instagram.com/leavealive_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500 transition-colors"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a 
              href="#" 
              className="hover:text-primary-500 transition-colors"
            >
              <i className="fab fa-github fa-lg"></i>
            </a>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Dibuat dengan
            <i className="fas fa-heart text-red-500 animate-heart-beat mx-1"></i>
            oleh Levi Setiadi
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            &copy; 2025 AdaQur'an. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}