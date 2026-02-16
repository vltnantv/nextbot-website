'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const copy = {
  en: {
    badge: 'AI Sales & Support Assistant',
    headline: 'Every lead gets an instant, intelligent response.',
    sub: 'Neo is an AI assistant that handles customer conversations across chat, WhatsApp, and messaging platforms. It understands context, qualifies leads, books meetings, and works 24/7 — without human intervention.',
    cta: 'Get Started',
    cta2: 'Try Live Demo',
    stats: [
      { value: '<1s', label: 'Response time' },
      { value: '12+', label: 'Languages' },
      { value: '24/7', label: 'Availability' },
      { value: '€0', label: 'Setup fee' },
    ],
  },
  bg: {
    badge: 'AI асистент за продажби и поддръжка',
    headline: 'Всеки лийд получава мигновен, интелигентен отговор.',
    sub: 'Neo е AI асистент, който управлява разговори с клиенти чрез чат, WhatsApp и месинджър платформи. Разбира контекст, квалифицира лийдове, резервира срещи и работи 24/7 — без човешка намеса.',
    cta: 'Започни сега',
    cta2: 'Пробвай демо',
    stats: [
      { value: '<1с', label: 'Време за отговор' },
      { value: '12+', label: 'Езика' },
      { value: '24/7', label: 'Наличност' },
      { value: '€0', label: 'Setup такса' },
    ],
  },
}

export function NeoHero() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8 transition-all duration-[1200ms] ${mounted ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60" />
          <span className="text-[0.75rem] text-zinc-500 font-medium tracking-wide">{t.badge}</span>
        </div>

        <h1 className={`text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-3xl text-balance transition-all duration-[1200ms] ease-out delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {t.headline}
        </h1>

        <p className={`mt-7 text-[1.1rem] sm:text-[1.2rem] text-zinc-400 max-w-xl leading-[1.7] font-light transition-all duration-[1200ms] ease-out delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {t.sub}
        </p>

        <div className={`mt-10 flex flex-col sm:flex-row items-start gap-4 transition-all duration-[1200ms] ease-out delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/book-demo" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
            {t.cta}
            <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link href="/demo" className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-400 text-[0.9rem] font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all">
            {t.cta2}
          </Link>
        </div>

        <div className={`mt-20 sm:mt-28 grid grid-cols-2 sm:grid-cols-4 gap-8 transition-all duration-[1200ms] ease-out delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {t.stats.map((s, i) => (
            <div key={i} className="border-l border-white/[0.06] pl-5">
              <div className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-white leading-none">{s.value}</div>
              <div className="mt-1.5 text-sm text-zinc-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
