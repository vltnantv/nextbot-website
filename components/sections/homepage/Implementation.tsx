'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Implementation',
    headline: 'We don\'t just sell software. We deploy results.',
    sub: 'Every NextBot deployment includes full implementation, integration, and ongoing optimization. We work as an extension of your team until the system delivers measurable ROI.',
    services: [
      { title: 'Strategy & Audit', desc: 'Analyze your current operations, lead flow, and conversion bottlenecks. Define clear AI implementation targets with projected ROI.' },
      { title: 'Custom Configuration', desc: 'Build and train AI systems on your specific business context, tone, products, and qualification criteria.' },
      { title: 'Integration & Deployment', desc: 'Connect to your CRM, calendar, phone, and messaging systems. Deploy across all customer touchpoints.' },
      { title: 'Optimization & Support', desc: 'Ongoing monitoring, conversation quality improvement, and performance optimization based on real data. Priority support included.' },
    ],
    cta: 'Discuss Your Implementation',
  },
  bg: {
    label: 'Внедряване',
    headline: 'Ние не просто продаваме софтуер. Ние внедряваме резултати.',
    sub: 'Всяко NextBot внедряване включва пълна имплементация, интеграция и непрекъсната оптимизация. Работим като разширение на вашия екип, докато системата не постигне измерим ROI.',
    services: [
      { title: 'Стратегия & одит', desc: 'Анализираме операциите, потока от лийдове и бутилките в конверсията. Определяме ясни AI цели с прогнозиран ROI.' },
      { title: 'Персонализирана конфигурация', desc: 'Изграждаме и обучаваме AI системи на базата на вашия бизнес контекст, тон, продукти и критерии за квалификация.' },
      { title: 'Интеграция & внедряване', desc: 'Свързваме с CRM, календар, телефон и месинджър системи. Внедряваме по всички точки на контакт.' },
      { title: 'Оптимизация & поддръжка', desc: 'Текущо наблюдение, подобряване качеството на разговорите и оптимизация на производителността. Приоритетна поддръжка.' },
    ],
    cta: 'Обсъдете вашето внедряване',
  },
}

export function Implementation() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white text-balance">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.services.map((svc, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="bg-[#09090b] p-8 sm:p-10 h-full">
                <span className="text-[0.65rem] text-zinc-700 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[1.05rem] font-medium text-white mt-3 mb-3">{svc.title}</h3>
                <p className="text-sm text-zinc-600 leading-[1.7]">{svc.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={350}>
          <div className="mt-12">
            <Link
              href="/book-demo"
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/[0.14] rounded-lg px-6 py-3 transition-all"
            >
              {t.cta}
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
