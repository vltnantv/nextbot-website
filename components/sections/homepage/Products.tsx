'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Products',
    headline: 'Our Products',
    products: [
      {
        name: 'NEO',
        desc: 'AI assistant that responds to your customers 24/7 — across chat, WhatsApp, and phone. Qualifies leads, books appointments, answers questions. Voice available as add-on.',
        status: 'Live',
        href: '/neo',
        hasLink: true,
        cta: 'Learn More',
      },
      {
        name: 'Next Product',
        desc: "We're working on it.",
        status: 'Coming Soon',
        href: '',
        hasLink: false,
        cta: '',
      },
    ],
  },
  bg: {
    label: 'Продукти',
    headline: 'Нашите продукти',
    products: [
      {
        name: 'NEO',
        desc: 'AI асистент, който отговаря на клиентите ви 24/7 — чрез чат, WhatsApp и телефон. Квалифицира лийдове, записва часове, отговаря на въпроси. Гласът е наличен като добавка.',
        status: 'Live',
        href: '/neo',
        hasLink: true,
        cta: 'Научи повече',
      },
      {
        name: 'Следващ продукт',
        desc: 'Работим по него.',
        status: 'Скоро',
        href: '',
        hasLink: false,
        cta: '',
      },
    ],
  },
}

export function Products() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-nb-border rounded-2xl overflow-hidden">
          {t.products.map((product, i) => {
            const content = (
              <div className={`bg-nb-surface p-8 sm:p-10 h-full ${product.hasLink ? 'group hover:bg-nb-surface-el transition-colors duration-300' : ''}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.65rem] text-nb-text-muted font-mono uppercase tracking-widest">{product.name}</span>
                  <span className={`text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    product.status === 'Live'
                      ? 'bg-nb-accent/20 text-nb-accent'
                      : 'bg-nb-surface-el text-nb-text-muted border border-nb-border'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-sm text-nb-text-secondary leading-[1.7] mb-6">{product.desc}</p>
                {product.hasLink && product.cta && (
                  <span className="text-sm font-medium text-white group-hover:text-nb-accent transition-colors">
                    {product.cta} →
                  </span>
                )}
              </div>
            )

            return (
              <AnimateIn key={i} delay={i * 80}>
                {product.hasLink ? (
                  <Link href={product.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
