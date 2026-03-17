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
            ? 'bg-nb-navy/10 font-medium text-nb-navy'
            : 'text-nb-text-muted hover:text-nb-navy'
        }`}
      >
        БГ
      </button>
      <span className="text-nb-border">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors ${
          lang === 'en'
            ? 'bg-nb-navy/10 font-medium text-nb-navy'
            : 'text-nb-text-muted hover:text-nb-navy'
        }`}
      >
        EN
      </button>
    </div>
  )
}
