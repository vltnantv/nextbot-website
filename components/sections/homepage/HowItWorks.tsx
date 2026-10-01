'use client'

import { useLanguage } from '@/lib/i18n'

const copy = {
  en: {
    label: 'Process',
    headline: 'How it works.',
    steps: [
      {
        num: '01',
        title: 'We learn your business',
        desc: 'One call. We understand your workflows, tools, and customers.',
      },
      {
        num: '02',
        title: 'We build and train NEO',
        desc: 'Configured for your business. Connected to your calendar, CRM, and messaging.',
      },
      {
        num: '03',
        title: 'NEO goes live',
        desc: 'Handles customer communication autonomously. You get weekly reports.',
      },
    ],
  },
  bg: {
    label: 'Процес',
    headline: 'Как работи.',
    steps: [
      {
        num: '01',
        title: 'Опознаваме бизнеса ви',
        desc: 'Едно обаждане. Разбираме работните ви процеси, инструменти и клиенти.',
      },
      {
        num: '02',
        title: 'Изграждаме и обучаваме NEO',
        desc: 'Конфигуриран за вашия бизнес. Свързан с календара, CRM-а и комуникационните ви канали.',
      },
      {
        num: '03',
        title: 'NEO тръгва на живо',
        desc: 'Управлява комуникацията с клиенти автономно. Получавате седмични отчети.',
      },
    ],
  },
}

const stepDelays = ['0s', '0.15s', '0.3s']

export function HowItWorks() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="how-it-works" className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="animate-on-scroll">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-nb-accent uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {t.headline}
            </h2>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {t.steps.map((step, i) => (
            <div
              key={i}
              className="animate-on-scroll relative grid grid-cols-[auto_1fr] gap-8 sm:gap-12"
              style={{ transitionDelay: stepDelays[i] }}
            >
              {/* Number + connecting line */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-nb-accent bg-nb-bg flex items-center justify-center shadow-[0_0_24px_rgba(249,115,22,0.2)]">
                  <span className="text-[1.5rem] sm:text-[2rem] font-bold font-mono text-nb-accent">{step.num}</span>
                </div>
                {i < t.steps.length - 1 && (
                  <div className="w-0.5 flex-1 mt-4 min-h-[60px] bg-nb-accent/30" />
                )}
              </div>

              {/* Content */}
              <div className="pt-3 sm:pt-5">
                <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[0.95rem] text-nb-text-secondary leading-[1.7] max-w-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
