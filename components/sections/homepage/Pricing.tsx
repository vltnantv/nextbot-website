'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Pricing',
    headline: 'Simple, transparent pricing.',
    plans: [
      {
        name: 'Starter',
        price: '€297',
        period: '/month',
        from: 'from',
        target: 'Small businesses, 1 location',
        features: [
          'AI chat on website',
          'WhatsApp integration',
          'Appointment booking',
          'FAQ automation',
          'Unlimited conversations',
          'Basic analytics',
        ],
        cta: 'Book a Call',
        href: '/book-demo',
        badge: null,
        highlighted: false,
      },
      {
        name: 'Growth',
        price: '€497',
        period: '/month',
        from: 'from',
        target: 'Growing businesses, up to 3 locations',
        features: [
          'Everything in Starter',
          'Voice AI (Aria Beta)',
          'CRM integration',
          'Automated follow-ups',
          'Priority support',
          'Monthly performance review',
        ],
        cta: 'Book a Call',
        href: '/book-demo',
        badge: 'Most Popular',
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        from: '',
        target: 'Chains, franchises, large operations',
        features: [
          'Everything in Growth',
          'Custom AI training',
          'Dedicated account manager',
          'Custom integrations',
          'SLA guarantee',
          'White-label option',
        ],
        cta: 'Contact Us',
        href: '/book-demo',
        badge: null,
        highlighted: false,
      },
    ],
  },
  bg: {
    label: 'Ценообразуване',
    headline: 'Ясно ценообразуване.',
    plans: [
      {
        name: 'Starter',
        price: '€297',
        period: '/месец',
        from: 'от',
        target: 'Малки бизнеси, 1 локация',
        features: [
          'AI чат на сайта',
          'WhatsApp интеграция',
          'Записване на часове',
          'FAQ автоматизация',
          'Неограничени разговори',
          'Базова аналитика',
        ],
        cta: 'Запази обаждане',
        href: '/book-demo',
        badge: null,
        highlighted: false,
      },
      {
        name: 'Growth',
        price: '€497',
        period: '/месец',
        from: 'от',
        target: 'Растящи бизнеси, до 3 локации',
        features: [
          'Всичко от Starter',
          'Гласов AI (Aria Бета)',
          'CRM интеграция',
          'Автоматични follow-ups',
          'Приоритетна поддръжка',
          'Месечен преглед на резултатите',
        ],
        cta: 'Запази обаждане',
        href: '/book-demo',
        badge: 'НАЙ-ПОПУЛЯРЕН',
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: 'По запитване',
        period: '',
        from: '',
        target: 'Вериги, франчайзи, големи операции',
        features: [
          'Всичко от Growth',
          'Custom AI обучение',
          'Персонален акаунт мениджър',
          'Custom интеграции',
          'SLA гаранция',
          'White-label опция',
        ],
        cta: 'Свържете се',
        href: '/book-demo',
        badge: null,
        highlighted: false,
      },
    ],
  },
}

export function Pricing() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-nb-border">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-nb-navy max-w-2xl">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-nb-border rounded-2xl overflow-hidden">
          {t.plans.map((plan, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className={`bg-nb-cream p-8 sm:p-10 h-full flex flex-col relative ${plan.highlighted ? 'ring-2 ring-nb-gold' : ''}`}>
                {plan.badge && (
                  <span className="absolute top-6 right-6 text-[0.6rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-nb-gold text-nb-navy">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-[1.1rem] font-medium text-nb-navy mb-4">{plan.name}</h3>

                <div className="mb-2">
                  {plan.from && (
                    <span className="text-sm text-nb-text-muted mr-1">{plan.from}</span>
                  )}
                  <span className="text-[2.25rem] font-semibold text-nb-navy tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-nb-text-muted ml-1">{plan.period}</span>
                  )}
                </div>

                <p className="text-sm text-nb-text-muted mb-8">{plan.target}</p>

                <ul className="space-y-3 flex-1 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.82rem] text-nb-text-secondary">
                      <svg className="w-3.5 h-3.5 mt-0.5 text-nb-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.85rem] font-medium rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-nb-navy text-nb-cream hover:bg-nb-navy-mid'
                      : 'border border-nb-border text-nb-text-secondary hover:border-nb-gold hover:text-nb-navy'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
