'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const copy = {
  en: {
    headline: 'AI Systems That Automate Your Business.',
    sub: 'NextBot is an AI platform that automates customer communication, lead qualification, and business operations. Connect your tools. Deploy intelligent systems. Scale without headcount.',
    cta: 'Book Strategy Call',
    cta2: 'See the Platform',
    metrics: [
      { value: '+32%', label: 'Lead conversion increase' },
      { value: '<60s', label: 'First response time' },
      { value: '24/7', label: 'Autonomous operation' },
    ],
  },
  bg: {
    headline: 'AI системи, които автоматизират бизнеса ви.',
    sub: 'NextBot е AI платформа, която автоматизира комуникацията с клиенти, квалификацията на лийдове и бизнес операциите. Свържете инструментите си. Внедрете интелигентни системи. Скалирайте без допълнителен персонал.',
    cta: 'Запази стратегическа консултация',
    cta2: 'Виж платформата',
    metrics: [
      { value: '+32%', label: 'Увеличение на конверсията' },
      { value: '<60с', label: 'Време за първи отговор' },
      { value: '24/7', label: 'Автономна работа' },
    ],
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
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Subtle grid + glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(59,130,246,0.07),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
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
          className={`mt-7 text-[1.1rem] sm:text-[1.2rem] text-zinc-400 max-w-xl leading-[1.7] font-light transition-all duration-[1200ms] ease-out delay-200 ${
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
            href="/book-demo"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors"
          >
            {t.cta}
            <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="#platform"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-400 text-[0.9rem] font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all"
          >
            {t.cta2}
          </Link>
        </div>

        <div
          className={`mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 transition-all duration-[1200ms] ease-out delay-[600ms] ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t.metrics.map((m, i) => (
            <div key={i} className="border-l border-white/[0.06] pl-6">
              <div className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-tight text-white leading-none">{m.value}</div>
              <div className="mt-2 text-sm text-zinc-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
