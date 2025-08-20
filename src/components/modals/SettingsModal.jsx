import React from 'react'
import { useSettings } from '../../contexts/SettingsContext'
import { useTheme } from '../../contexts/ThemeContext'
import Modal from './Modal'

export default function SettingsModal({ show, onClose }) {
  const { settings, updateSetting, QARI_LIST } = useSettings()
  const { themeColor, changeThemeColor, THEME_COLORS } = useTheme()

  return (
    <Modal show={show} onClose={onClose} title="Pengaturan" size="md">
      <div className="p-6 space-y-6 overflow-y-auto">
        
        {/* Qari Selection */}
        <div>
          <label htmlFor="qari-selector" className="font-semibold">Pilih Qari</label>
          <select
            id="qari-selector"
            value={settings.selectedQari}
            onChange={(e) => updateSetting('selectedQari', e.target.value)}
            className="w-full mt-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5"
          >
            {Object.entries(QARI_LIST).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Arabic Font Size */}
        <div>
          <label htmlFor="arabic-font-size-slider" className="font-semibold">
            Ukuran Font Arab ({settings.arabicFontSize}px)
          </label>
          <input
            id="arabic-font-size-slider"
            type="range"
            min="24"
            max="56"
            step="2"
            value={settings.arabicFontSize}
            onChange={(e) => updateSetting('arabicFontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-primary-600"
          />
        </div>

        {/* Translation Font Size */}
        <div>
          <label htmlFor="translation-font-size-slider" className="font-semibold">
            Ukuran Font Terjemahan ({settings.translationFontSize}px)
          </label>
          <input
            id="translation-font-size-slider"
            type="range"
            min="12"
            max="20"
            step="1"
            value={settings.translationFontSize}
            onChange={(e) => updateSetting('translationFontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-primary-600"
          />
        </div>

        {/* Theme Colors */}
        <div>
          <span className="font-semibold block mb-2">Tema Warna</span>
          <div className="flex flex-wrap gap-2">
            {Object.keys(THEME_COLORS).map(color => (
              <button
                key={color}
                onClick={() => changeThemeColor(color)}
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  color === 'blue' ? 'bg-blue-600' :
                  color === 'purple' ? 'bg-purple-600' :
                  color === 'green' ? 'bg-green-600' :
                  color === 'orange' ? 'bg-orange-600' :
                  color === 'indigo' ? 'bg-indigo-600' : ''
                } ${
                  themeColor === color 
                    ? 'ring-2 ring-offset-2 ring-primary-600 dark:ring-primary-400' 
                    : 'ring-2 ring-offset-2 ring-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Show Latin Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Tampilkan Teks Latin</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showLatin}
              onChange={(e) => updateSetting('showLatin', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>

        {/* Show Translation Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Tampilkan Terjemahan</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showTranslation}
              onChange={(e) => updateSetting('showTranslation', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Auto-play Berikutnya</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoPlay}
              onChange={(e) => updateSetting('autoPlay', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
          </label>
        </div>

      </div>
    </Modal>
  )
}