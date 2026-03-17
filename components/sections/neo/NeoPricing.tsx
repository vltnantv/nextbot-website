'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'
import { useRef, useCallback } from 'react'

const copy = {
  en: {
    label: 'Pricing',
    headline: 'Simple, transparent pricing.',
    sub: 'Start with what you need. Scale as you grow. No hidden fees.',
    plans: [
      {
        name: 'Starter', price: 'from €297', period: '/month',
        desc: 'For small businesses getting started with AI automation.',
        features: ['AI chat on your website', 'WhatsApp + Messenger', 'Unlimited conversations', 'Bulgarian + English', 'Appointment booking', 'FAQ automation', 'Email support (48h)'],
        cta: 'Book a Call', href: '/book-demo', highlight: false,
      },
      {
        name: 'Professional', price: 'from €497', period: '/month',
        desc: 'For growing businesses that need multi-channel automation.',
        features: ['Everything in Starter', 'Instagram + Telegram', 'All 12+ languages', 'CRM integration', 'Calendar booking', 'Automated follow-ups', 'Priority support (<4h)', 'Monthly performance review'],
        cta: 'Book a Call', href: '/book-demo', highlight: true, badge: 'Most Popular',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '',
        desc: 'Full AI infrastructure with custom requirements.',
        features: ['Everything in Professional', 'Unlimited channels + voice', 'Custom AI training', 'Custom integrations', 'Dedicated account manager', '99.9% uptime SLA', 'White-label option'],
        cta: 'Contact Us', href: '/book-demo', highlight: false,
      },
    ],
  },
  bg: {
    label: 'Ценообразуване',
    headline: 'Просто, прозрачно ценообразуване.',
    sub: 'Започнете с каквото ви трябва. Скалирайте докато растете.',
    plans: [
      {
        name: 'Starter', price: 'от €297', period: '/месец',
        desc: 'За малки бизнеси, започващи с AI автоматизация.',
        features: ['AI чат на сайта ви', 'WhatsApp + Messenger', 'Неограничени разговори', 'Български + английски', 'Записване на часове', 'FAQ автоматизация', 'Email поддръжка (48ч)'],
        cta: 'Запази обаждане', href: '/book-demo', highlight: false,
      },
      {
        name: 'Professional', price: 'от €497', period: '/месец',
        desc: 'За растящи бизнеси с мулти-канална автоматизация.',
        features: ['Всичко от Starter', 'Instagram + Telegram', 'Всички 12+ езика', 'CRM интеграция', 'Резервиране в календар', 'Автоматични follow-ups', 'Приоритетна поддръжка (<4ч)', 'Месечен преглед на резултатите'],
        cta: 'Запази обаждане', href: '/book-demo', highlight: true, badge: 'НАЙ-ПОПУЛЯРЕН',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '',
        desc: 'Пълна AI инфраструктура с персонализирани изисквания.',
        features: ['Всичко от Professional', 'Неограничени канали + глас', 'Персонализирано AI обучение', 'Custom интеграции', 'Персонален мениджър', '99.9% uptime SLA', 'White-label опция'],
        cta: 'Свържи се', href: '/book-demo', highlight: false,
      },
    ],
  },
}

function PricingCard({ plan }: { plan: typeof copy.en.plans[number] }) {
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
      className="relative bg-nb-cream p-8 sm:p-10 h-full flex flex-col min-w-[280px] snap-center rounded-2xl md:rounded-none border border-nb-border md:border-0 group/card overflow-hidden"
    >
      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(201,168,76,0.08), transparent 60%)',
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(201,168,76,0.15), transparent 60%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[1rem] font-medium text-nb-navy">{plan.name}</h3>
          {'badge' in plan && plan.badge && (
            <span className="text-[0.58rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-nb-gold text-nb-navy">{plan.badge}</span>
          )}
        </div>
        <div className="mt-4 mb-2">
          <span className="text-[2.25rem] font-semibold text-nb-navy tracking-tight">{plan.price}</span>
          {plan.period && <span className="text-sm text-nb-text-muted ml-1">{plan.period}</span>}
        </div>
        <p className="text-sm text-nb-text-muted mb-8">{plan.desc}</p>
        <ul className="space-y-3 mb-10 flex-1">
          {plan.features.map((f, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[0.82rem] text-nb-text-secondary">
              <svg className="w-3.5 h-3.5 mt-0.5 text-nb-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <Link href={plan.href} className={`inline-flex items-center justify-center px-6 py-3 text-[0.85rem] font-medium rounded-lg transition-colors ${plan.highlight ? 'bg-nb-navy text-nb-cream hover:bg-nb-navy-mid' : 'border border-nb-border text-nb-text-secondary hover:border-nb-gold hover:text-nb-navy'}`}>
          {plan.cta}
        </Link>
      </div>
    </div>
  )
}

export function NeoPricing() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="pricing" className="py-28 sm:py-36 border-t border-nb-border">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[0.7rem] text-nb-gold uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-nb-navy">{t.headline}</h2>
            <p className="mt-4 text-[1.05rem] text-nb-text-secondary leading-[1.7]">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-px md:bg-nb-border md:rounded-2xl md:overflow-hidden overflow-x-auto snap-x snap-mandatory -mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-hide">
          {t.plans.map((plan, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <PricingCard plan={plan} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
