'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Technology',
    headline: 'Enterprise-grade AI infrastructure.',
    sub: 'Built on modern AI architecture with security, reliability, and performance at every layer.',
    specs: [
      {
        category: 'AI Models',
        items: ['GPT-4 class language models', 'Custom fine-tuned models per client', 'Multi-language NLU (12+ languages)', 'Intent classification & entity extraction'],
      },
      {
        category: 'Automation Engine',
        items: ['Event-driven workflow automation', 'Conditional branching & routing', 'Real-time lead scoring', 'Automated follow-up sequences'],
      },
      {
        category: 'Integration Layer',
        items: ['REST API & webhooks', 'CRM: HubSpot, Pipedrive, Salesforce', 'Messaging: WhatsApp, Messenger, Telegram', 'Calendar: Google, Outlook, Calendly'],
      },
      {
        category: 'Security & Compliance',
        items: ['GDPR compliant — data in EU', 'SOC 2 Type II certified', 'End-to-end encryption', '99.9% uptime SLA'],
      },
    ],
  },
  bg: {
    label: 'Технология',
    headline: 'AI инфраструктура на корпоративно ниво.',
    sub: 'Изградена на модерна AI архитектура със сигурност, надеждност и производителност на всеки слой.',
    specs: [
      {
        category: 'AI модели',
        items: ['Езикови модели клас GPT-4', 'Custom fine-tuned модели за клиент', 'Многоезично NLU (12+ езика)', 'Класификация на намерения & извличане'],
      },
      {
        category: 'Двигател за автоматизация',
        items: ['Event-driven автоматизация', 'Условно разклоняване & маршрутизация', 'Real-time scoring на лийдове', 'Автоматизирани follow-up секвенции'],
      },
      {
        category: 'Интеграционен слой',
        items: ['REST API & webhooks', 'CRM: HubSpot, Pipedrive, Salesforce', 'Messaging: WhatsApp, Messenger, Telegram', 'Календар: Google, Outlook, Calendly'],
      },
      {
        category: 'Сигурност & съответствие',
        items: ['GDPR съответствие — данни в ЕС', 'SOC 2 Type II сертификат', 'End-to-end криптиране', '99.9% uptime SLA'],
      },
    ],
  },
}

export function TechnologySection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-y border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-blue-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7]">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.specs.map((spec, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="bg-[#09090b] p-8 h-full">
                <h3 className="text-sm font-medium text-white mb-5">{spec.category}</h3>
                <ul className="space-y-2.5">
                  {spec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.78rem] text-zinc-600 leading-relaxed">
                      <span className="mt-[6px] w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
