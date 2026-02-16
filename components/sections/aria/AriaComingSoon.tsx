'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'
import { useState, useRef, useCallback } from 'react'

const copy = {
  en: {
    badge: 'Coming Soon',
    label: 'Voice AI',
    headline: 'Aria answers your phone calls with AI.',
    sub: 'A voice AI assistant that handles inbound calls with natural conversation. Understands context, speaks 12+ languages, and integrates with your systems — 24/7.',
    waitlistTitle: 'Join the early access list',
    waitlistSub: 'Be the first to deploy Aria when it launches.',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Join Waitlist',
    submitting: 'Submitting...',
    successMessage: 'You\'re on the list. We\'ll notify you when Aria launches.',
    errorMessage: 'Something went wrong. Please try again.',
    howTitle: 'How Aria Works',
    howHeadline: 'From ring to resolution in seconds.',
    steps: [
      { num: '01', title: 'Customer Calls', desc: 'An inbound call reaches your business number. Aria picks up instantly — no hold time, no voicemail.' },
      { num: '02', title: 'Aria Understands', desc: 'Natural language processing identifies intent, detects language, and retrieves context from your knowledge base.' },
      { num: '03', title: 'Speaks Naturally', desc: 'Aria responds with a natural voice in the caller\'s language. Handles questions, takes bookings, routes calls.' },
      { num: '04', title: 'Systems Updated', desc: 'CRM updated. Calendar synced. Transcript logged. Your team has full visibility without picking up the phone.' },
    ],
    capLabel: 'Capabilities',
    capHeadline: 'What Aria does on every call.',
    capabilities: [
      { title: 'Natural Voice', desc: 'Speaks Bulgarian, English, German, and 12+ languages with natural intonation and pacing.' },
      { title: 'Context Awareness', desc: 'Understands the intent behind questions. Maintains context across the entire conversation.' },
      { title: 'Call Recording', desc: 'Every call is recorded and transcribed automatically. Full searchable history for your team.' },
      { title: 'Calendar Booking', desc: 'Books appointments directly into Google Calendar or Outlook. Handles rescheduling and reminders.' },
      { title: 'Smart Routing', desc: 'Routes calls to the right department or person based on intent. Escalates urgent matters instantly.' },
      { title: 'Unlimited Lines', desc: 'Scale to as many concurrent calls as needed. No busy signals, no missed calls.' },
    ],
    useCasesLabel: 'Use Cases',
    useCasesHeadline: 'Built for businesses that miss calls.',
    useCases: [
      { title: 'Reservations', desc: 'Hotels and restaurants: accept and confirm bookings automatically, even at 2 AM.' },
      { title: 'Appointment Booking', desc: 'Clinics, salons, and services: book directly into the calendar without staff involvement.' },
      { title: 'FAQ Handling', desc: 'Answer repetitive questions about hours, pricing, availability — without burdening your team.' },
      { title: 'Lead Capture', desc: 'Collect caller information, qualify leads, and send structured data to your CRM.' },
    ],
    pricingLabel: 'Preliminary Pricing',
    pricingHeadline: 'Simple voice AI pricing.',
    pricingSub: 'Final pricing may adjust at launch.',
    plans: [
      {
        name: 'Voice Starter', price: '€99', period: '/month',
        desc: 'For small businesses handling basic call automation.',
        features: ['200 minutes/month', '1 phone line', 'Bulgarian + English', 'Basic call routing', 'Call transcription'],
      },
      {
        name: 'Voice Pro', price: '€249', period: '/month',
        desc: 'For businesses that need advanced voice automation.',
        features: ['1,000 minutes/month', '5 phone lines', 'All 12+ languages', 'Advanced routing', 'CRM integration', 'Calendar booking', 'Priority support'],
        highlight: true, badge: 'Recommended',
      },
    ],
    launchLabel: 'Expected Launch',
    launchDate: 'Q3 2026',
    ctaHeadline: 'Meanwhile, deploy Neo today.',
    ctaSub: 'Neo handles text-based conversations across chat, WhatsApp, and messaging — available now.',
    ctaButton: 'Explore Neo',
  },
  bg: {
    badge: 'Скоро',
    label: 'Гласов AI',
    headline: 'Aria отговаря на обажданията ви с AI.',
    sub: 'Гласов AI асистент, който обработва входящи обаждания с естествен разговор. Разбира контекст, говори 12+ езика и се интегрира с вашите системи — 24/7.',
    waitlistTitle: 'Запишете се за ранен достъп',
    waitlistSub: 'Бъдете първите, които ще внедрят Aria при стартиране.',
    emailPlaceholder: 'вашият@имейл.com',
    submitButton: 'Запиши ме',
    submitting: 'Изпращане...',
    successMessage: 'Вие сте в списъка. Ще ви уведомим при стартиране.',
    errorMessage: 'Възникна грешка. Моля, опитайте отново.',
    howTitle: 'Как работи Aria',
    howHeadline: 'От позвъняване до решение за секунди.',
    steps: [
      { num: '01', title: 'Клиентът се обажда', desc: 'Входящо обаждане достига бизнес номера ви. Aria отговаря мигновено — без чакане, без гласова поща.' },
      { num: '02', title: 'Aria разбира', desc: 'Обработка на естествен език идентифицира намерение, разпознава език и извлича контекст от базата ви знания.' },
      { num: '03', title: 'Говори естествено', desc: 'Aria отговаря с естествен глас на езика на обаждащия. Обработва въпроси, приема резервации, насочва обаждания.' },
      { num: '04', title: 'Системите се актуализират', desc: 'CRM е актуализиран. Календарът е синхронизиран. Транскрипцията е записана. Пълна видимост за екипа ви.' },
    ],
    capLabel: 'Възможности',
    capHeadline: 'Какво прави Aria при всяко обаждане.',
    capabilities: [
      { title: 'Естествен глас', desc: 'Говори български, английски, немски и 12+ езика с естествена интонация и темпо.' },
      { title: 'Контекстна осъзнатост', desc: 'Разбира намерението зад въпросите. Поддържа контекст през целия разговор.' },
      { title: 'Запис на обаждания', desc: 'Всяко обаждане се записва и транскрибира автоматично. Пълна история за екипа ви.' },
      { title: 'Резервиране в календар', desc: 'Букира часове директно в Google Calendar или Outlook. Управлява пренасрочване и напомняния.' },
      { title: 'Умно насочване', desc: 'Насочва обаждания към правилния отдел или човек. Ескалира спешни случаи мигновено.' },
      { title: 'Неограничени линии', desc: 'Скалирайте до колкото едновременни обаждания ви трябват. Без заето, без пропуснати обаждания.' },
    ],
    useCasesLabel: 'Приложения',
    useCasesHeadline: 'Създадена за бизнеси, които пропускат обаждания.',
    useCases: [
      { title: 'Резервации', desc: 'Хотели и ресторанти: приемайте и потвърждавайте резервации автоматично, дори в 2 сутринта.' },
      { title: 'Записване за часове', desc: 'Клиники, салони и услуги: букирайте директно в календара без участие на персонал.' },
      { title: 'Често задавани въпроси', desc: 'Отговаряйте на повтарящи се въпроси за работно време, цени, наличност — без да натоварвате екипа.' },
      { title: 'Улавяне на лийдове', desc: 'Събирайте информация от обаждащите, квалифицирайте лийдове и изпращайте структурирани данни към CRM.' },
    ],
    pricingLabel: 'Предварителни цени',
    pricingHeadline: 'Просто ценообразуване за гласов AI.',
    pricingSub: 'Окончателните цени може да се променят при стартиране.',
    plans: [
      {
        name: 'Voice Starter', price: '€99', period: '/месец',
        desc: 'За малки бизнеси с базова автоматизация на обаждания.',
        features: ['200 минути/месец', '1 телефонна линия', 'Български + английски', 'Базово насочване', 'Транскрипция на обаждания'],
      },
      {
        name: 'Voice Pro', price: '€249', period: '/месец',
        desc: 'За бизнеси с нужда от напреднала гласова автоматизация.',
        features: ['1,000 минути/месец', '5 телефонни линии', 'Всички 12+ езика', 'Напреднало насочване', 'CRM интеграция', 'Резервиране в календар', 'Приоритетна поддръжка'],
        highlight: true, badge: 'Препоръчан',
      },
    ],
    launchLabel: 'Очаквано стартиране',
    launchDate: 'Q3 2026',
    ctaHeadline: 'Междувременно, внедрете Neo днес.',
    ctaSub: 'Neo обработва текстови разговори чрез чат, WhatsApp и месинджър — наличен сега.',
    ctaButton: 'Разгледайте Neo',
  },
}

function AriaPricingCard({ plan }: { plan: typeof copy.en.plans[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#09090b] p-8 sm:p-10 h-full flex flex-col min-w-[280px] snap-center rounded-2xl md:rounded-none border border-white/[0.06] md:border-0 group/card overflow-hidden"
    >
      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(168,85,247,0.08), transparent 60%)',
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(168,85,247,0.15), transparent 60%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[1rem] font-medium text-white">{plan.name}</h3>
          {'badge' in plan && plan.badge && (
            <span className="text-[0.58rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400/80">{plan.badge}</span>
          )}
        </div>
        <div className="mt-4 mb-2">
          <span className="text-[2.25rem] font-semibold text-white tracking-tight">{plan.price}</span>
          <span className="text-sm text-zinc-600 ml-1">{plan.period}</span>
        </div>
        <p className="text-sm text-zinc-600 mb-8">{plan.desc}</p>
        <ul className="space-y-3 flex-1">
          {plan.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[0.82rem] text-zinc-400">
              <svg className="w-3.5 h-3.5 mt-0.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AriaComingSoon() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/aria-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(251,191,36,0.04),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.06] shadow-[0_0_20px_rgba(251,191,36,0.1)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[0.75rem] text-amber-400/90 font-medium tracking-wide">{t.badge}</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-3xl text-balance">
              {t.headline}
            </h1>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p className="mt-7 text-[1.1rem] sm:text-[1.2rem] text-zinc-400 max-w-xl leading-[1.7] font-light">
              {t.sub}
            </p>
          </AnimateIn>

          {/* Waitlist */}
          <AnimateIn delay={300}>
            <div className="mt-12 max-w-md">
              <p className="text-sm text-zinc-500 mb-4">{t.waitlistSub}</p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-lg bg-white text-zinc-950 text-sm font-medium hover:bg-zinc-100 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'loading' ? t.submitting : t.submitButton}
                </button>
              </form>
              {status === 'success' && <p className="mt-3 text-sm text-emerald-400/70">{t.successMessage}</p>}
              {status === 'error' && <p className="mt-3 text-sm text-red-400/70">{t.errorMessage}</p>}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.howTitle}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.howHeadline}</h2>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {t.steps.map((step, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <div className="bg-[#09090b] p-8 h-full flex flex-col">
                  <span className="text-sm font-mono text-zinc-700 mb-6">{step.num}</span>
                  <h3 className="text-[1.05rem] font-medium text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-600 leading-[1.7] flex-1">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-28 sm:py-36 border-y border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-purple-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.capLabel}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.capHeadline}</h2>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {t.capabilities.map((cap, i) => (
              <AnimateIn key={i} delay={i * 60}>
                <div className="bg-[#09090b] p-8 h-full">
                  <h3 className="text-[0.95rem] font-medium text-white mb-3">{cap.title}</h3>
                  <p className="text-sm text-zinc-600 leading-[1.7]">{cap.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.useCasesLabel}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.useCasesHeadline}</h2>
          </AnimateIn>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {t.useCases.map((uc, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="bg-[#09090b] p-8 sm:p-10 h-full">
                  <h3 className="text-[1.05rem] font-medium text-white mb-3">{uc.title}</h3>
                  <p className="text-sm text-zinc-500 leading-[1.7]">{uc.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[0.7rem] text-purple-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.pricingLabel}</p>
              <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">{t.pricingHeadline}</h2>
              <p className="mt-4 text-[1.05rem] text-zinc-500 leading-[1.7]">{t.pricingSub}</p>
            </div>
          </AnimateIn>

          <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-px md:bg-white/[0.04] md:rounded-2xl md:overflow-hidden overflow-x-auto snap-x snap-mandatory -mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 pb-4 md:pb-0 max-w-3xl md:mx-auto scrollbar-hide">
            {t.plans.map((plan, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <AriaPricingCard plan={plan} />
              </AnimateIn>
            ))}
          </div>

          {/* Launch Date */}
          <AnimateIn delay={200}>
            <div className="mt-20 text-center">
              <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-3">{t.launchLabel}</p>
              <p className="text-[2.5rem] sm:text-[3.5rem] font-semibold tracking-tight text-white">{t.launchDate}</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <AnimateIn>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">{t.ctaHeadline}</h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 max-w-lg mx-auto leading-[1.7]">{t.ctaSub}</p>
            <div className="mt-10">
              <Link href="/neo" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
                {t.ctaButton}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
