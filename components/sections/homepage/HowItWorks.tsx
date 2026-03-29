'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import { useEffect, useRef, useState } from 'react'

function TimelineStep({ step, index, total }: { step: { num: string; title: string; desc: string }; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className="group relative grid grid-cols-[auto_1fr] gap-6 sm:gap-10">
      {/* Timeline node + line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full border bg-nb-bg flex items-center justify-center text-[0.7rem] font-mono transition-all duration-700 ease-out ${
            visible
              ? 'border-nb-accent/30 text-nb-accent scale-100 shadow-[0_0_12px_rgba(249,115,22,0.15)]'
              : 'border-nb-border text-nb-text-muted scale-75 opacity-0'
          }`}
        >
          {step.num}
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 my-2 overflow-hidden">
            <div
              className={`w-full h-full bg-gradient-to-b from-nb-accent/10 to-nb-border transition-all duration-1000 ease-out origin-top ${
                visible ? 'scale-y-100' : 'scale-y-0'
              }`}
              style={{ transitionDelay: `${200}ms` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`pb-10 sm:pb-14 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h3 className="text-[1.1rem] font-medium text-white mt-2 mb-3">{step.title}</h3>
        <p className="text-sm text-nb-text-secondary leading-[1.7] max-w-lg">{step.desc}</p>
      </div>
    </div>
  )
}

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
        title: 'NEO стартира',
        desc: 'Управлява комуникацията с клиенти автономно. Получавате седмични отчети.',
      },
    ],
  },
}

export function HowItWorks() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="how-it-works" className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-nb-accent uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {t.headline}
            </h2>
          </div>
        </AnimateIn>

        {/* Steps — timeline */}
        <div className="mt-16 space-y-0">
          {t.steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} total={t.steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
