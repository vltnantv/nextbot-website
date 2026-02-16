'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'How Neo Works',
    headline: 'From message to action in under one second.',
    steps: [
      { num: '01', title: 'Customer Messages', desc: 'A prospect sends a message through any connected channel — website chat, WhatsApp, Messenger, Instagram, or Telegram.' },
      { num: '02', title: 'Neo Understands', desc: 'AI analyzes the message, classifies intent, detects language, and retrieves relevant context from conversation history and your knowledge base.' },
      { num: '03', title: 'Intelligent Response', desc: 'Neo generates a contextual, natural response — answers questions, qualifies the lead, or takes action like booking a meeting.' },
      { num: '04', title: 'Systems Updated', desc: 'CRM is updated. Calendar is synced. Lead score is calculated. Follow-up is scheduled. Your team has full visibility without lifting a finger.' },
    ],
  },
  bg: {
    label: 'Как работи Neo',
    headline: 'От съобщение до действие за под една секунда.',
    steps: [
      { num: '01', title: 'Клиентът пише', desc: 'Перспективен клиент изпраща съобщение чрез свързан канал — уебсайт чат, WhatsApp, Messenger, Instagram или Telegram.' },
      { num: '02', title: 'Neo разбира', desc: 'AI анализира съобщението, класифицира намерението, разпознава езика и извлича контекст от историята и базата знания.' },
      { num: '03', title: 'Интелигентен отговор', desc: 'Neo генерира контекстуален, естествен отговор — отговаря на въпроси, квалифицира лийда или предприема действие.' },
      { num: '04', title: 'Системите се актуализират', desc: 'CRM е актуализиран. Календарът е синхронизиран. Lead score е изчислен. Follow-up е насрочен.' },
    ],
  },
}

export function NeoHowItWorks() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {t.steps.map((step, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <div className="bg-[#09090b] p-8 h-full flex flex-col">
                <span className="text-sm font-mono text-zinc-700 mb-6">{step.num}</span>
                <h3 className="text-[1.05rem] font-medium text-white mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-600 leading-[1.7] flex-1">{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}