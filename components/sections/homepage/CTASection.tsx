'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const copy = {
  en: {
    headline: 'Ready to automate your business?',
    sub: "Book a 30-minute call. We'll show you exactly what NEO can do for you.",
    cta: 'Book a Call',
  },
  bg: {
    headline: 'Готови ли сте да автоматизирате бизнеса си?',
    sub: 'Запазете 30-минутно обаждане. Ще ви покажем точно какво NEO може да направи за вас.',
    cta: 'Запази обаждане',
  },
}

export function CTASection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="relative py-28 sm:py-36 border-t border-nb-border overflow-hidden">
      {/* Pulsing orb */}
      <div className="orb-cta" />

      <div className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-8 text-center">
        <div className="animate-on-scroll">
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
            {t.headline}
          </h2>
          <p className="mt-5 text-[1.05rem] text-nb-text-secondary leading-[1.7] max-w-[600px] mx-auto">{t.sub}</p>

          <div className="mt-10">
            <Link href="/book-demo" className="btn-primary group">
              {t.cta}
              <svg className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
