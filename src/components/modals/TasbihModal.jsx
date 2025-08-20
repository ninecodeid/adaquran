import React, { useState, useEffect } from 'react'
import Modal from './Modal'

export default function TasbihModal({ show, onClose }) {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem('tasbihCount') || '0')
  })
  const [currentGoalIndex, setCurrentGoalIndex] = useState(() => {
    return parseInt(localStorage.getItem('tasbihGoalIndex') || '0')
  })
  
  const tasbihGoals = [33, 100, 1000]

  useEffect(() => {
    localStorage.setItem('tasbihCount', count.toString())
  }, [count])

  useEffect(() => {
    localStorage.setItem('tasbihGoalIndex', currentGoalIndex.toString())
  }, [currentGoalIndex])

  const handleTap = () => {
    const currentGoal = tasbihGoals[currentGoalIndex]
    const newCount = count >= currentGoal ? 1 : count + 1
    
    setCount(newCount)
    
    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(newCount === currentGoal ? 200 : 50)
    }
  }

  const handleReset = () => {
    if (window.confirm('Yakin mau reset hitungan jadi 0?')) {
      setCount(0)
    }
  }

  const changeGoal = (direction) => {
    let newIndex = currentGoalIndex + direction
    if (newIndex >= tasbihGoals.length) newIndex = 0
    if (newIndex < 0) newIndex = tasbihGoals.length - 1
    
    setCurrentGoalIndex(newIndex)
  }

  const currentGoal = tasbihGoals[currentGoalIndex]
  const isComplete = count === currentGoal

  return (
    <Modal show={show} onClose={onClose} title="Tasbih Digital" size="md">
      <div className="flex flex-col items-center justify-around p-6 bg-neutral-100 dark:bg-neutral-900 h-[70vh] min-h-[400px]">
        
        {/* Display */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => changeGoal(-1)}
              aria-label="Target sebelumnya" 
              className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-lg transition-colors flex items-center justify-center"
            >
              &lt;
            </button>
            
            <p className={`font-mono font-bold text-8xl transition-colors duration-300 w-48 text-center ${
              isComplete ? 'text-green-500' : 'text-primary-600 dark:text-primary-300'
            }`}>
              {count}
            </p>
            
            <button 
              onClick={() => changeGoal(1)}
              aria-label="Target berikutnya" 
              className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-lg transition-colors flex items-center justify-center"
            >
              &gt;
            </button>
          </div>
          <p className="font-mono text-neutral-500 mt-2">Target: {currentGoal}</p>
        </div>

        {/* Tap Button */}
        <button 
          onClick={handleTap}
          className="w-48 h-48 rounded-full bg-glass-blue flex items-center justify-center shadow-2xl focus:outline-none transition-transform active:scale-95"
        >
          <span className="text-white text-3xl font-bold">
            <i className="fas fa-plus"></i>
          </span>
        </button>

        {/* Reset Button */}
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-red-500 transition-colors"
        >
          <i className="fas fa-undo"></i> Reset
        </button>

      </div>
    </Modal>
  )
}