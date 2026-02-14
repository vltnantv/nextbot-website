'use client'

import { useLanguage } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import { CalendlyButton } from '@/components/CalendlyButton'

export function NeoCTA() {
  const { lang } = useLanguage()
  const footerData = translations[lang].footer as any

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          {footerData.cta.title}
        </h2>
        <p className="text-lg sm:text-xl mb-6 text-white/90">
          {footerData.cta.subtitle}
        </p>
        <CalendlyButton variant="outline" size="lg" />
      </div>
    </section>
  )
}
