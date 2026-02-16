'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Products',
    headline: 'AI systems for every business function.',
    products: [
      {
        name: 'AI Sales Assistant',
        tag: 'Neo',
        desc: 'Captures and qualifies leads in real time across chat, WhatsApp, and messaging. Responds instantly, understands context, books meetings, and syncs with your CRM.',
        features: ['Instant lead response', 'Multi-channel support', 'Lead qualification', 'CRM sync', 'Meeting booking'],
        status: 'Live',
        href: '/neo',
      },
      {
        name: 'AI Voice Assistant',
        tag: 'Aria',
        desc: 'Handles inbound phone calls with natural voice AI. Answers questions, qualifies callers, routes to the right team, and logs every interaction automatically.',
        features: ['Natural voice AI', 'Call qualification', 'Smart routing', 'Call transcription', '12+ languages'],
        status: 'Coming Soon',
        href: '/aria',
      },
      {
        name: 'AI Workflow Engine',
        tag: 'Automation',
        desc: 'Automated sequences that trigger based on customer behavior. Follow-up emails, lead nurturing, appointment reminders, and escalation — all running autonomously.',
        features: ['Email automation', 'Follow-up sequences', 'Trigger-based actions', 'Lead nurturing', 'Escalation rules'],
        status: 'In Development',
        href: '/book-demo',
      },
      {
        name: 'Integrations',
        tag: 'Connect',
        desc: 'Pre-built connections to CRM, calendar, email, phone, and business tools. Custom API integration for proprietary systems. Data flows in real time.',
        features: ['HubSpot, Pipedrive', 'Google Calendar', 'WhatsApp Business API', 'Custom webhooks', 'REST API access'],
        status: 'Live',
        href: '/documentation',
      },
    ],
  },
  bg: {
    label: 'Продукти',
    headline: 'AI системи за всяка бизнес функция.',
    products: [
      {
        name: 'AI асистент за продажби',
        tag: 'Neo',
        desc: 'Улавя и квалифицира лийдове в реално време чрез чат, WhatsApp и месинджър. Отговаря мигновено, разбира контекст, резервира срещи и синхронизира с CRM.',
        features: ['Мигновен отговор', 'Мулти-канална поддръжка', 'Квалификация', 'CRM синхронизация', 'Резервиране'],
        status: 'Live',
        href: '/neo',
      },
      {
        name: 'AI гласов асистент',
        tag: 'Aria',
        desc: 'Управлява входящи телефонни обаждания с естествен гласов AI. Отговаря на въпроси, квалифицира обаждащите се и ги насочва към правилния екип.',
        features: ['Естествен гласов AI', 'Квалификация на обаждания', 'Интелигентно маршрутизиране', 'Транскрипция', '12+ езика'],
        status: 'Скоро',
        href: '/aria',
      },
      {
        name: 'AI двигател за автоматизация',
        tag: 'Automation',
        desc: 'Автоматизирани секвенции, задействани от поведението на клиента. Follow-up имейли, nurturing, напомняния и ескалация — всичко работи автономно.',
        features: ['Email автоматизация', 'Follow-up секвенции', 'Trigger-базирани действия', 'Lead nurturing', 'Правила за ескалация'],
        status: 'В разработка',
        href: '/book-demo',
      },
      {
        name: 'Интеграции',
        tag: 'Connect',
        desc: 'Готови връзки с CRM, календар, имейл, телефон и бизнес инструменти. Custom API интеграция за собствени системи.',
        features: ['HubSpot, Pipedrive', 'Google Calendar', 'WhatsApp Business API', 'Custom webhooks', 'REST API достъп'],
        status: 'Live',
        href: '/documentation',
      },
    ],
  },
}

const statusStyles: Record<string, string> = {
  'Live': 'bg-emerald-500/10 text-emerald-400/80',
  'Coming Soon': 'bg-zinc-800 text-zinc-500',
  'Скоро': 'bg-zinc-800 text-zinc-500',
  'In Development': 'bg-amber-500/10 text-amber-400/70',
  'В разработка': 'bg-amber-500/10 text-amber-400/70',
}

export function Products() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.products.map((product, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <Link href={product.href} className="block bg-[#09090b] p-8 sm:p-10 h-full group hover:bg-white/[0.015] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.65rem] text-zinc-600 font-mono uppercase tracking-widest">{product.tag}</span>
                  <span className={`text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${statusStyles[product.status] || 'bg-zinc-800 text-zinc-500'}`}>
                    {product.status}
                  </span>
                </div>
                <h3 className="text-[1.15rem] font-medium text-white mb-3 group-hover:text-blue-50 transition-colors">{product.name}</h3>
                <p className="text-sm text-zinc-600 leading-[1.7] mb-6">{product.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, j) => (
                    <span key={j} className="text-[0.68rem] text-zinc-700 border border-white/[0.04] rounded px-2 py-0.5">{f}</span>
                  ))}
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
