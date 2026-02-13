'use client'

import { useLanguage } from '@/lib/i18n'
import type { Language } from '@/lib/i18n'

export function LanguageToggle() {
  const { lang, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => setLanguage('bg')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'bg'
            ? 'bg-black/10 dark:bg-white/10 font-medium'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
        }`}
      >
        БГ
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'en'
            ? 'bg-black/10 dark:bg-white/10 font-medium'
            : 'text-gray-500 hover:text-black dark:hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  )
}
