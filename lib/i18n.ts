'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'nextbot-language'

export type Language = 'bg' | 'en'

export function detectLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'bg' || stored === 'en') return stored

  // Check browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('bg')) return 'bg'

  // Default to English
  return 'en'
}

export function setLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEY, lang)
  window.location.reload()
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  return detectLanguage()
}

// React hook
export function useLanguage() {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    setLang(detectLanguage())
  }, [])

  return {
    lang,
    setLanguage: (newLang: Language) => {
      setLang(newLang)
      setLanguage(newLang)
    }
  }
}
