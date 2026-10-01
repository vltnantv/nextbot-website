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

const chatMessages = [
  { role: 'customer', text: 'Здравейте, искам да запиша час.' },
  { role: 'neo', text: 'Здравейте! За кой ден ви е удобно?' },
  { role: 'customer', text: 'Сряда след 17:00.' },
  { role: 'neo', text: 'Запазен час в сряда в 17:30. \u2713' },
]

function ChatMockup() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i <= chatMessages.length) {
        setVisibleCount(i)
      } else {
        clearInterval(interval)
      }
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:block">
      <div
        className="w-[320px] rounded-2xl border border-nb-border bg-[#1a1a1a] p-5 shadow-2xl shadow-black/40"
        style={{ animation: 'chat-float 3s ease-in-out infinite' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-nb-border">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-white tracking-wide">NEO</span>
          <span className="text-[0.6rem] text-nb-text-muted ml-auto">online</span>
        </div>

        {/* Messages */}
        <div className="space-y-3 min-h-[200px]">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'neo' ? 'justify-end' : 'justify-start'}`}
              style={{
                opacity: i < visibleCount ? 1 : 0,
                transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2 text-[0.78rem] leading-relaxed ${
                  msg.role === 'neo'
                    ? 'bg-nb-accent text-white'
                    : 'bg-nb-surface-el text-nb-text-secondary border border-nb-border'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-nb-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Pulsing orb */}
      <div className="orb-hero" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 w-full">
        <div className="flex items-center gap-16 lg:gap-20">
          {/* Left: text + buttons */}
          <div className="flex-1 text-center lg:text-left max-w-[600px] lg:max-w-none">
            <h1
              className="animate-on-scroll hero-animate text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-balance"
              style={{ transitionDelay: '0s' } as React.CSSProperties}
            >
              {t.headline}
            </h1>

            <p
              className="animate-on-scroll hero-animate mt-7 text-[1.05rem] sm:text-[1.15rem] text-nb-text-secondary max-w-[540px] lg:max-w-[500px] mx-auto lg:mx-0 leading-[1.7] font-light"
              style={{ transitionDelay: '0.1s' } as React.CSSProperties}
            >
              {t.sub}
            </p>

            <div
              className="animate-on-scroll hero-animate mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              style={{ transitionDelay: '0.2s' } as React.CSSProperties}
            >
              <Link href="/neo" className="btn-primary group">
                {t.cta}
                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/book-demo" className="btn-secondary">
                {t.cta2}
              </Link>
            </div>
          </div>

          {/* Right: chat mockup (hidden on mobile) */}
          <ChatMockup />
        </div>
      </div>
    </section>
  )
}
