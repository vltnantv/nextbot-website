'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const copy = {
  en: {
    headline: 'We build AI products that replace repetitive work.',
    sub: 'Nextbot is an AI company. NEO is our first product — an AI assistant that handles customer communication so your team doesn\'t have to.',
    cta: 'See NEO',
    cta2: 'Book a Call',
  },
  bg: {
    headline: 'Създаваме AI продукти, които заместват повтарящата се работа.',
    sub: 'Nextbot е AI компания. NEO е първият ни продукт — AI асистент, който управлява комуникацията с клиенти, за да не се налага вашият екип да го прави.',
    cta: 'Виж NEO',
    cta2: 'Запази обаждане',
  },
}

export function Hero() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-nb-bg">
      {/* Subtle grid + glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(249,115,22,0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32">
        <h1
          className={`text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-4xl text-balance transition-all duration-[1200ms] ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t.headline}
        </h1>

        <p
          className={`mt-7 text-[1.1rem] sm:text-[1.2rem] text-nb-text-secondary max-w-xl leading-[1.7] font-light transition-all duration-[1200ms] ease-out delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t.sub}
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row items-start gap-4 transition-all duration-[1200ms] ease-out delay-[400ms] ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            href="/neo"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-nb-accent text-white text-[0.9rem] font-medium rounded-lg hover:bg-nb-accent-hover transition-colors"
          >
            {t.cta}
            <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-nb-text-secondary text-[0.9rem] font-medium rounded-lg border border-nb-border hover:border-nb-text-muted hover:text-white transition-all"
          >
            {t.cta2}
          </Link>
        </div>
      </div>
    </section>
  )
}
