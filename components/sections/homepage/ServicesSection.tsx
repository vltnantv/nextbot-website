'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Capabilities',
    headline: 'Three systems. One growth engine.',
    services: [
      {
        num: '01',
        title: 'AI Sales Systems',
        desc: 'Automated lead capture, instant qualification, and intelligent follow-up sequences that convert prospects into customers — without manual effort from your team.',
        points: [
          'Multi-channel lead capture and routing',
          'AI-powered qualification scoring',
          'Automated follow-up sequences',
          'CRM integration and pipeline sync',
        ],
      },
      {
        num: '02',
        title: 'AI Customer Automation',
        desc: 'Handle inquiries, bookings, and support across every channel — 24/7. AI that understands context, speaks 12+ languages, and knows when to escalate.',
        points: [
          'Chat, voice, email, and messaging',
          'Natural language in 12+ languages',
          'Smart escalation to human agents',
          'Booking and scheduling automation',
        ],
      },
      {
        num: '03',
        title: 'Custom AI Infrastructure',
        desc: 'Purpose-built AI systems for your specific workflows. From data processing to decision automation — engineered for your industry and operational requirements.',
        points: [
          'Custom workflow automation',
          'API and system integration',
          'Industry-specific AI models',
          'Scalable cloud deployment',
        ],
      },
    ],
  },
  bg: {
    label: 'Възможности',
    headline: 'Три системи. Един двигател за растеж.',
    services: [
      {
        num: '01',
        title: 'AI системи за продажби',
        desc: 'Автоматично улавяне на лийдове, мигновена квалификация и интелигентни follow-up секвенции, които конвертират без ръчно усилие от екипа ви.',
        points: [
          'Мулти-канално улавяне и насочване на лийдове',
          'AI квалификация с точкуване',
          'Автоматизирани follow-up секвенции',
          'CRM интеграция и pipeline синхронизация',
        ],
      },
      {
        num: '02',
        title: 'AI автоматизация за клиенти',
        desc: 'Управлявайте запитвания, резервации и поддръжка по всеки канал — 24/7. AI, който разбира контекст, говори 12+ езика и знае кога да ескалира.',
        points: [
          'Чат, глас, имейл и съобщения',
          'Естествен език на 12+ езика',
          'Интелигентна ескалация към хора',
          'Автоматизация на резервации и график',
        ],
      },
      {
        num: '03',
        title: 'Персонализирана AI инфраструктура',
        desc: 'Целево изградени AI системи за вашите работни процеси. От обработка на данни до автоматизация на решения — проектирани за вашата индустрия.',
        points: [
          'Автоматизация на работни процеси',
          'API и системна интеграция',
          'Индустриално-специфични AI модели',
          'Скалируемо облачно внедряване',
        ],
      },
    ],
  },
}

export function ServicesSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-y border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 space-y-0 divide-y divide-white/[0.04]">
          {t.services.map((svc, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <div className="py-12 first:pt-0 last:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-16">
                  <div>
                    <span className="text-sm font-mono text-zinc-700 mb-4 block">{svc.num}</span>
                    <h3 className="text-[1.35rem] sm:text-[1.6rem] font-semibold text-white tracking-[-0.02em] mb-4">
                      {svc.title}
                    </h3>
                    <p className="text-[0.95rem] text-zinc-500 leading-[1.7] max-w-lg">{svc.desc}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <ul className="space-y-3">
                      {svc.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-zinc-500">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
