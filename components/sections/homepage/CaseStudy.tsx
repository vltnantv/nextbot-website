'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Case Study',
    headline: 'Regional solar provider increases qualified pipeline 3.2x in 90 days.',
    context: {
      industry: 'Solar & Renewable Energy',
      size: '45 employees',
      timeline: '90 days',
    },
    sections: [
      {
        tag: 'Challenge',
        text: 'A mid-size solar installation company was losing 60% of inbound leads due to slow response times. Their 8-person sales team couldn\'t keep up with inquiry volume from digital campaigns. Most leads went cold before anyone reached out. Cost per acquisition was climbing while close rates declined.',
      },
      {
        tag: 'Solution',
        text: 'NextBot deployed an AI sales system that instantly responds to every inbound lead across web chat, phone, and email. The AI qualifies prospects based on property type, roof condition, energy usage, and budget — then books qualified leads directly into the sales team\'s calendar with full context.',
      },
    ],
    results: [
      { value: '3.2x', label: 'Qualified leads per month', detail: '45 → 144 qualified leads' },
      { value: '<30s', label: 'Average first response', detail: 'Down from 4.5 hours' },
      { value: '67%', label: 'Lower acquisition cost', detail: 'Same ad spend, more conversions' },
      { value: '€240K', label: 'Additional pipeline value', detail: 'In the first 90 days' },
    ],
    quote: 'NextBot transformed how we handle inbound leads. The ROI was obvious within the first month — we\'re capturing opportunities that would have been lost entirely.',
    attribution: 'Head of Sales — Regional Solar Provider',
  },
  bg: {
    label: 'Казус',
    headline: 'Регионален соларен доставчик увеличава квалифицирания pipeline 3.2 пъти за 90 дни.',
    context: {
      industry: 'Соларна & възобновяема енергия',
      size: '45 служителя',
      timeline: '90 дни',
    },
    sections: [
      {
        tag: 'Предизвикателство',
        text: 'Средно голяма соларна компания губеше 60% от входящите лийдове заради бавно време за отговор. 8-човешкият екип по продажби не можеше да се справи с обема запитвания. Повечето лийдове изстиваха преди някой да се свърже.',
      },
      {
        tag: 'Решение',
        text: 'NextBot внедри AI система за продажби, която мигновено отговаря на всеки входящ лийд чрез уеб чат, телефон и имейл. AI квалифицира перспективите на база тип имот, покривно състояние, потребление и бюджет — и резервира квалифицираните директно в календара на екипа.',
      },
    ],
    results: [
      { value: '3.2x', label: 'Квалифицирани лийдове на месец', detail: '45 → 144 квалифицирани лийда' },
      { value: '<30с', label: 'Средно време за първи отговор', detail: 'Намалено от 4.5 часа' },
      { value: '67%', label: 'По-ниска цена за придобиване', detail: 'Същ бюджет, повече конверсии' },
      { value: '€240K', label: 'Допълнителна pipeline стойност', detail: 'За първите 90 дни' },
    ],
    quote: 'NextBot трансформира начина, по който управляваме входящите лийдове. ROI-то беше очевидно още в първия месец — улавяме възможности, които иначе щяха да бъдат загубени изцяло.',
    attribution: 'Директор продажби — Регионален соларен доставчик',
  },
}

export function CaseStudy() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white max-w-3xl text-balance">
            {t.headline}
          </h2>
        </AnimateIn>

        {/* Context bar */}
        <AnimateIn delay={100}>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-600">
            <span>{t.context.industry}</span>
            <span className="text-zinc-800">|</span>
            <span>{t.context.size}</span>
            <span className="text-zinc-800">|</span>
            <span>{t.context.timeline}</span>
          </div>
        </AnimateIn>

        {/* Challenge / Solution */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.sections.map((section, i) => (
            <AnimateIn key={i} delay={150 + i * 80}>
              <div className="p-8 rounded-2xl border border-white/[0.05] h-full">
                <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.15em] font-medium mb-4">{section.tag}</p>
                <p className="text-[0.95rem] text-zinc-400 leading-[1.7]">{section.text}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Results */}
        <AnimateIn delay={300}>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {t.results.map((r, i) => (
              <div key={i} className="bg-[#09090b] p-8">
                <div className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-white leading-none">
                  {r.value}
                </div>
                <div className="mt-2 text-sm text-zinc-400 font-medium">{r.label}</div>
                <div className="mt-1 text-xs text-zinc-700">{r.detail}</div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Quote */}
        <AnimateIn delay={400}>
          <div className="mt-16 max-w-2xl">
            <blockquote className="text-[1.15rem] sm:text-[1.3rem] text-zinc-300 leading-[1.6] font-light">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-zinc-600">{t.attribution}</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
