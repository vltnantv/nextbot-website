'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import { useEffect, useRef, useState } from 'react'

function TimelineStep({ step, index, total }: { step: { num: string; phase: string; title: string; desc: string }; index: number; total: number }) {
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
          className={`w-10 h-10 rounded-full border bg-[#09090b] flex items-center justify-center text-[0.7rem] font-mono transition-all duration-700 ease-out ${
            visible
              ? 'border-indigo-500/30 text-indigo-400/70 scale-100 shadow-[0_0_12px_rgba(99,102,241,0.1)]'
              : 'border-white/[0.06] text-zinc-700 scale-75 opacity-0'
          }`}
        >
          {step.num}
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 my-2 overflow-hidden">
            <div
              className={`w-full h-full bg-gradient-to-b from-indigo-500/10 to-white/[0.04] transition-all duration-1000 ease-out origin-top ${
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
        <span className="text-[0.65rem] text-zinc-600 uppercase tracking-[0.2em] font-medium">{step.phase}</span>
        <h3 className="text-[1.1rem] font-medium text-white mt-2 mb-3">{step.title}</h3>
        <p className="text-sm text-zinc-500 leading-[1.7] max-w-lg">{step.desc}</p>
      </div>
    </div>
  )
}

const copy = {
  en: {
    label: 'Process',
    headline: 'How we work.',
    sub: 'A clear, repeatable process — from first conversation to live AI systems running across your business.',
    steps: [
      {
        num: '01',
        phase: 'Day 1',
        title: 'Discovery Call',
        desc: 'We learn how your business operates — where leads come from, how you handle inquiries, what tools you use. No pitch, just understanding.',
      },
      {
        num: '02',
        phase: 'Days 2 — 4',
        title: 'Audit & Roadmap',
        desc: 'We map your customer journey, identify automation opportunities across chat, messaging, and voice, and deliver a prioritized implementation plan with projected impact.',
      },
      {
        num: '03',
        phase: 'Weeks 1 — 2',
        title: 'Build & Train',
        desc: 'We configure Neo for your text channels or Aria for voice — trained on your products, pricing, FAQs, and tone. Connected to your CRM, calendar, and workflows.',
      },
      {
        num: '04',
        phase: 'Week 3',
        title: 'Test & Launch',
        desc: 'Controlled rollout with real conversations. We fine-tune responses, test edge cases, and validate integrations before going fully live.',
      },
      {
        num: '05',
        phase: 'Ongoing',
        title: 'Optimize & Scale',
        desc: 'Weekly performance reviews. We analyze conversations, improve conversion rates, expand to new channels, and ensure your AI keeps getting smarter.',
      },
    ],
    products: {
      title: 'What gets deployed',
      neo: { name: 'Neo', desc: 'Handles website chat, WhatsApp, Messenger, and Instagram. Qualifies leads, answers questions, books meetings — 24/7 in text.', tag: 'Text AI' },
      aria: { name: 'Aria', desc: 'Answers inbound phone calls with natural voice. Routes, books, qualifies, and resolves — without putting anyone on hold.', tag: 'Voice AI' },
    },
  },
  bg: {
    label: 'Процес',
    headline: 'Как работим.',
    sub: 'Ясен, повторяем процес — от първия разговор до работещи AI системи в целия ви бизнес.',
    steps: [
      {
        num: '01',
        phase: 'Ден 1',
        title: 'Първоначален разговор',
        desc: 'Научаваме как работи вашият бизнес — откъде идват клиентите, как обработвате запитвания, какви инструменти ползвате. Без продажби, само разбиране.',
      },
      {
        num: '02',
        phase: 'Дни 2 — 4',
        title: 'Одит & Пътна карта',
        desc: 'Картографираме клиентския път, идентифицираме възможности за автоматизация в чат, месинджър и глас, и доставяме приоритизиран план с прогнозирано въздействие.',
      },
      {
        num: '03',
        phase: 'Седмици 1 — 2',
        title: 'Изграждане & Обучение',
        desc: 'Конфигурираме Neo за текстовите ви канали или Aria за глас — обучени на вашите продукти, цени, ЧЗВ и тон. Свързани с CRM, календар и работни процеси.',
      },
      {
        num: '04',
        phase: 'Седмица 3',
        title: 'Тест & Пускане',
        desc: 'Контролирано стартиране с реални разговори. Фино настройваме отговорите, тестваме крайни случаи и валидираме интеграциите преди пълно пускане.',
      },
      {
        num: '05',
        phase: 'Постоянно',
        title: 'Оптимизация & Мащабиране',
        desc: 'Седмични прегледи на производителността. Анализираме разговори, подобряваме конверсията, разширяваме към нови канали и гарантираме, че AI-ят ви става все по-умен.',
      },
    ],
    products: {
      title: 'Какво се внедрява',
      neo: { name: 'Neo', desc: 'Обработва чат на сайта, WhatsApp, Messenger и Instagram. Квалифицира лийдове, отговаря на въпроси, букира срещи — 24/7 в текст.', tag: 'Текстов AI' },
      aria: { name: 'Aria', desc: 'Отговаря на входящи обаждания с естествен глас. Насочва, букира, квалифицира и решава — без да кара никого да чака.', tag: 'Гласов AI' },
    },
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
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        {/* Steps — timeline */}
        <div className="mt-16 space-y-0">
          {t.steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} total={t.steps.length} />
          ))}
        </div>

        {/* What gets deployed */}
        <AnimateIn delay={200}>
          <div className="mt-8">
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-8">{t.products.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
              <div className="bg-[#09090b] p-8 sm:p-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-[1.05rem] font-medium text-white">{t.products.neo.name}</span>
                  <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400/80">{t.products.neo.tag}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-[1.7]">{t.products.neo.desc}</p>
              </div>
              <div className="bg-[#09090b] p-8 sm:p-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-[1.05rem] font-medium text-white">{t.products.aria.name}</span>
                  <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400/80">{t.products.aria.tag}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-[1.7]">{t.products.aria.desc}</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
