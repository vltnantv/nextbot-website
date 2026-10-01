'use client'

import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Products',
    headline: 'Our Products',
    subLabel: '— Our first product',
    neo: {
      name: 'NEO',
      status: 'Live',
      desc: 'AI assistant that responds to your customers 24/7 — across chat, WhatsApp, and phone. Qualifies leads, books appointments, answers questions. Voice available as add-on.',
      features: ['Responds to customers 24/7', 'Books appointments automatically', 'Works on chat, WhatsApp, and phone'],
      cta: 'Learn More',
      href: '/neo',
    },
  },
  bg: {
    label: 'Продукти',
    headline: 'Нашите продукти',
    subLabel: '— Първият ни продукт',
    neo: {
      name: 'NEO',
      status: 'Live',
      desc: 'AI асистент, който отговаря на клиентите ви 24/7 — чрез чат, WhatsApp и телефон. Квалифицира лийдове, записва часове, отговаря на въпроси. Гласът е наличен като добавка.',
      features: ['Отговаря на клиенти 24/7', 'Записва часове автоматично', 'Работи в чат, WhatsApp и телефон'],
      cta: 'Научи повече',
      href: '/neo',
    },
  },
}

export function Products() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="animate-on-scroll">
          <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">
            {t.headline}
          </h2>
        </div>

        <div className="mt-16 max-w-[600px]">
          <p className="text-[0.75rem] text-nb-text-muted tracking-wide mb-4">{t.subLabel}</p>
          <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <Link href={t.neo.href} className="block group">
              <div className="bg-nb-surface border border-nb-border border-t-2 border-t-nb-accent rounded-2xl p-12 hover:bg-nb-surface-el transition-colors duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[0.65rem] text-nb-text-muted font-mono uppercase tracking-widest">{t.neo.name}</span>
                  <span className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-nb-accent/20 text-nb-accent">
                    {t.neo.status}
                  </span>
                </div>
                <p className="text-[0.95rem] text-nb-text-secondary leading-[1.7] mb-8">{t.neo.desc}</p>
                <ul className="space-y-3 mb-8">
                  {t.neo.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-nb-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-nb-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-[0.95rem] font-semibold text-white group-hover:text-nb-accent transition-colors">
                  {t.neo.cta} →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
