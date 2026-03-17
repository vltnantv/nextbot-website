'use client'

import { useState, useEffect } from 'react'

export type Language = 'bg' | 'en'

// Session-level override (set when user manually switches)
let manualOverride: Language | null = null

export function detectLanguage(): Language {
  // Manual override takes priority (user clicked БГ/EN toggle this session)
  if (manualOverride) return manualOverride

  // Detect from browser language
  const browserLang = (
    navigator.languages?.[0] || navigator.language || 'en'
  ).toLowerCase()

  if (browserLang.startsWith('bg')) return 'bg'

  return 'en'
}

export function setLanguage(lang: Language): void {
  manualOverride = lang
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
      setLanguage(newLang)
      setLang(newLang)
    }
  }
}
