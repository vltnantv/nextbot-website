'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'
import Link from 'next/link'

const copy = {
  en: {
    label: 'Platform',
    headline: 'The complete AI communication platform.',
    sub: 'NextBot builds AI systems that automate how businesses communicate with customers — across every channel, in every language, 24/7.',
    sections: [
      {
        label: 'Technology',
        title: 'How it works under the hood.',
        items: [
          { title: 'NLP Engine', desc: 'Transformer-based architecture that recognizes intent, extracts key information, and maintains conversation context across sessions.' },
          { title: 'Multilingual Processing', desc: 'Automatic language detection and native response generation in 12+ languages. No configuration needed — it just works.' },
          { title: 'Knowledge Base', desc: 'Your FAQ, product catalog, pricing, and business rules are indexed and retrieved in real-time to generate accurate responses.' },
          { title: 'Response Pipeline', desc: 'Message received (<100ms) > Intent classified (<200ms) > Context retrieved (<300ms) > Response generated (<400ms) > Total: under 1 second.' },
        ],
      },
      {
        label: 'Integrations',
        title: 'Connects to your existing systems.',
        items: [
          { title: 'CRM', desc: 'HubSpot, Salesforce. Creates leads, updates contacts, tracks communication history. Full bidirectional sync.' },
          { title: 'Calendar', desc: 'Google Calendar, Outlook, Calendly. Checks availability, books meetings, handles rescheduling and reminders.' },
          { title: 'Communication', desc: 'WhatsApp Business API, Facebook Messenger, Instagram DM, Telegram, Web Chat Widget. Unified conversation context.' },
          { title: 'Custom', desc: 'REST API, Webhooks, OAuth 2.0, Zapier (5000+ apps). Build any integration you need.' },
        ],
      },
      {
        label: 'Security',
        title: 'Enterprise-grade security and compliance.',
        items: [
          { title: 'Encryption', desc: 'TLS 1.3 in transit, AES-256 at rest. AWS KMS for key management. All data encrypted end-to-end.' },
          { title: 'Infrastructure', desc: 'AWS EU-Central-1 (Frankfurt). Auto-scaling, multi-region backups, 99.9% uptime SLA.' },
          { title: 'Compliance', desc: 'GDPR compliant. SOC 2 Type II. ISO 27001. Regular penetration testing. Bug bounty program.' },
          { title: 'Data Control', desc: 'Your data stays in the EU. 30-day data deletion on request. Full audit logs. Role-based access control.' },
        ],
      },
      {
        label: 'Use Cases',
        title: 'Built for businesses that need to respond faster.',
        items: [
          { title: 'Hotels & Tourism', desc: 'Accept bookings 24/7, answer availability questions instantly, send confirmations and reminders. +40% more reservations.' },
          { title: 'E-commerce', desc: 'Product support at any hour, order tracking, returns handling, size and compatibility help. +18% conversion rate.' },
          { title: 'Real Estate', desc: 'Qualify leads automatically, share property details, schedule viewings. 100% response rate, +300% qualified leads.' },
          { title: 'Professional Services', desc: 'Book appointments, answer FAQ, route inquiries. Reduce support tickets by 70%.' },
        ],
      },
    ],
    ctaHeadline: 'Ready to deploy?',
    ctaSub: 'Book a 20-minute call and see how NextBot can automate your customer communication.',
    cta1: 'Book a Demo',
    cta2: 'View Pricing',
  },
  bg: {
    label: 'Платформа',
    headline: 'Пълната AI комуникационна платформа.',
    sub: 'NextBot изгражда AI системи, които автоматизират комуникацията на бизнеси с клиенти — по всеки канал, на всеки език, 24/7.',
    sections: [
      {
        label: 'Технология',
        title: 'Как работи отвътре.',
        items: [
          { title: 'NLP двигател', desc: 'Transformer-базирана архитектура, която разпознава намерение, извлича ключова информация и поддържа контекст на разговора.' },
          { title: 'Многоезична обработка', desc: 'Автоматично разпознаване на език и генериране на естествен отговор на 12+ езика. Без конфигурация — просто работи.' },
          { title: 'База знания', desc: 'Вашите FAQ, продуктов каталог, цени и бизнес правила се индексират и извличат в реално време за точни отговори.' },
          { title: 'Pipeline за отговор', desc: 'Получаване (<100ms) > Класификация (<200ms) > Контекст (<300ms) > Генериране (<400ms) > Общо: под 1 секунда.' },
        ],
      },
      {
        label: 'Интеграции',
        title: 'Свързва се с вашите съществуващи системи.',
        items: [
          { title: 'CRM', desc: 'HubSpot, Salesforce. Създава лийдове, обновява контакти, проследява комуникация. Пълна двупосочна синхронизация.' },
          { title: 'Календар', desc: 'Google Calendar, Outlook, Calendly. Проверява наличност, букира срещи, управлява пренасрочване и напомняния.' },
          { title: 'Комуникация', desc: 'WhatsApp Business API, Facebook Messenger, Instagram DM, Telegram, Web Chat. Единен контекст на разговора.' },
          { title: 'Custom', desc: 'REST API, Webhooks, OAuth 2.0, Zapier (5000+ приложения). Изградете всяка интеграция, от която имате нужда.' },
        ],
      },
      {
        label: 'Сигурност',
        title: 'Сигурност и съответствие на enterprise ниво.',
        items: [
          { title: 'Криптиране', desc: 'TLS 1.3 при транспорт, AES-256 в покой. AWS KMS за управление на ключове. Всички данни криптирани end-to-end.' },
          { title: 'Инфраструктура', desc: 'AWS EU-Central-1 (Frankfurt). Auto-scaling, multi-region backups, 99.9% uptime SLA.' },
          { title: 'Съответствие', desc: 'GDPR compliant. SOC 2 Type II. ISO 27001. Регулярни penetration тестове. Bug bounty програма.' },
          { title: 'Контрол на данни', desc: 'Вашите данни остават в ЕС. Изтриване до 30 дни при заявка. Пълни одитни логове. RBAC.' },
        ],
      },
      {
        label: 'Приложения',
        title: 'Създадена за бизнеси, които трябва да отговарят по-бързо.',
        items: [
          { title: 'Хотели и туризъм', desc: 'Приемайте резервации 24/7, отговаряйте на въпроси за наличност мигновено. +40% повече резервации.' },
          { title: 'E-commerce', desc: 'Продуктова поддръжка по всяко време, проследяване на поръчки, връщания. +18% conversion rate.' },
          { title: 'Недвижими имоти', desc: 'Квалифицирайте лийдове автоматично, споделяйте детайли, планирайте огледи. +300% квалифицирани лийдове.' },
          { title: 'Професионални услуги', desc: 'Букирайте часове, отговаряйте на FAQ, насочвайте запитвания. -70% support tickets.' },
        ],
      },
    ],
    ctaHeadline: 'Готови за внедряване?',
    ctaSub: 'Запазете 20-минутно обаждане и вижте как NextBot може да автоматизира комуникацията с клиенти.',
    cta1: 'Запази демо',
    cta2: 'Вижте цените',
  },
}

export default function LearnMorePage() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <AnimateIn>
            <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h1 className="text-[2rem] sm:text-[3rem] lg:text-[3.75rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white max-w-3xl text-balance">{t.headline}</h1>
            <p className="mt-7 text-[1.1rem] text-zinc-400 max-w-xl leading-[1.7] font-light">{t.sub}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Sections */}
      {t.sections.map((section, si) => (
        <section key={si} className={`py-28 sm:py-36 ${si % 2 === 0 ? '' : 'border-y border-white/[0.04]'}`}>
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
            <AnimateIn>
              <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{section.label}</p>
              <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{section.title}</h2>
            </AnimateIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <AnimateIn key={i} delay={i * 80}>
                  <div className="bg-[#09090b] p-8 sm:p-10 h-full">
                    <h3 className="text-[1.05rem] font-medium text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-[1.7]">{item.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-28 sm:py-36 border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <AnimateIn>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">{t.ctaHeadline}</h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 max-w-lg mx-auto leading-[1.7]">{t.ctaSub}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 text-[0.9rem] font-medium rounded-lg hover:bg-zinc-100 transition-colors">
                {t.cta1}
              </Link>
              <Link href="/neo#pricing" className="inline-flex items-center gap-2 px-7 py-3.5 text-zinc-400 text-[0.9rem] font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all">
                {t.cta2}
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
