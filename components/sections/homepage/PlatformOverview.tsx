'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Platform',
    headline: 'One AI platform. Every customer touchpoint.',
    sub: 'NextBot connects to your existing tools and deploys AI systems across chat, email, voice, and workflows — all managed from a single platform.',
    layers: [
      {
        title: 'Channels',
        desc: 'Website chat, WhatsApp, Email, Phone, Messenger, Instagram',
        detail: 'AI engages customers on every channel they use — with consistent context across all of them.',
      },
      {
        title: 'AI Engine',
        desc: 'Natural language understanding, intent classification, context memory',
        detail: 'Our AI understands what customers mean, remembers conversation history, and makes intelligent decisions in real time.',
      },
      {
        title: 'Automation Layer',
        desc: 'Lead qualification, booking, follow-up, routing, escalation',
        detail: 'Automated workflows that qualify leads, schedule meetings, route inquiries, and trigger actions across your business systems.',
      },
      {
        title: 'Integrations',
        desc: 'CRM, Calendar, Email, Phone, Custom APIs',
        detail: 'Deep integration with your existing tools. Data flows automatically between NextBot and your business systems.',
      },
    ],
  },
  bg: {
    label: 'Платформа',
    headline: 'Една AI платформа. Всяка точка на контакт с клиента.',
    sub: 'NextBot се свързва с наличните ви инструменти и внедрява AI системи чрез чат, имейл, глас и работни процеси — управлявани от една платформа.',
    layers: [
      {
        title: 'Канали',
        desc: 'Уебсайт чат, WhatsApp, Email, Телефон, Messenger, Instagram',
        detail: 'AI ангажира клиентите по всеки канал, който използват — с последователен контекст навсякъде.',
      },
      {
        title: 'AI Двигател',
        desc: 'Разбиране на естествен език, класификация на намерения, контекстна памет',
        detail: 'AI-ът разбира какво имат предвид клиентите, помни историята на разговора и взема интелигентни решения в реално време.',
      },
      {
        title: 'Автоматизация',
        desc: 'Квалификация на лийдове, резервации, follow-up, маршрутизация, ескалация',
        detail: 'Автоматизирани работни процеси, които квалифицират лийдове, планират срещи и задействат действия в бизнес системите ви.',
      },
      {
        title: 'Интеграции',
        desc: 'CRM, Календар, Email, Телефон, Custom API',
        detail: 'Дълбока интеграция с наличните ви инструменти. Данните се движат автоматично между NextBot и вашите системи.',
      },
    ],
  },
}

export function PlatformOverview() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="platform" className="py-28 sm:py-36 border-b border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-blue-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        {/* Architecture visualization */}
        <div className="mt-16 space-y-0">
          {t.layers.map((layer, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="group grid grid-cols-1 lg:grid-cols-[200px_1fr] border-t border-white/[0.04] first:border-t-0">
                <div className="py-8 lg:py-10">
                  <span className="text-[0.65rem] text-zinc-700 uppercase tracking-[0.2em] font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[1.05rem] font-medium text-white mt-1">{layer.title}</h3>
                </div>
                <div className="pb-8 lg:py-10 lg:pl-10 lg:border-l lg:border-white/[0.04]">
                  <p className="text-sm text-zinc-400 font-medium font-mono tracking-wide">{layer.desc}</p>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-lg">{layer.detail}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
