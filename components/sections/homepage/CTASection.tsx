'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    headline: 'Start converting more leads this month.',
    sub: 'Book a 30-minute strategy session. We\'ll analyze your current lead flow and show you exactly where AI can increase your close rate — with projected numbers.',
    cta: 'Book Your Strategy Call',
    note: 'Free consultation. No commitment required.',
    trust: ['Free operational audit', 'Custom ROI projection', 'No long-term contracts'],
  },
  bg: {
    headline: 'Започнете да конвертирате повече лийдове този месец.',
    sub: 'Запазете 30-минутна стратегическа сесия. Ще анализираме текущия поток от лийдове и ще ви покажем къде AI може да увеличи процента на затваряне — с прогнозирани числа.',
    cta: 'Запази стратегическа консултация',
    note: 'Безплатна консултация. Без ангажимент.',
    trust: ['Безплатен оперативен одит', 'Персонализирана ROI прогноза', 'Без дългосрочни договори'],
  },
}

export function CTASection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-2xl">
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7]">{t.sub}</p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/book-demo"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 text-[0.95rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors duration-200"
              >
                {t.cta}
                <svg className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <p className="mt-5 text-sm text-zinc-700">{t.note}</p>

            <div className="mt-10 flex flex-wrap gap-6">
              {t.trust.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
                  <div className="w-4 h-4 rounded-full border border-white/[0.08] flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
