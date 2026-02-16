'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Capabilities',
    headline: 'What Neo does for your business.',
    capabilities: [
      { title: 'Instant Lead Response', desc: 'Every inquiry receives an intelligent, contextual response in under 1 second. No lead waits.', detail: 'Neo understands the question, considers your business context, and generates a relevant, natural response every time.' },
      { title: 'Lead Qualification', desc: 'Neo evaluates each lead against your criteria — budget, timeline, needs, location — and scores them automatically.', detail: 'Qualified leads are routed directly to sales with full conversation context. Unqualified leads receive appropriate responses.' },
      { title: 'Meeting Booking', desc: 'When a lead is qualified, Neo checks your calendar availability and books the meeting directly.', detail: 'Integrates with Google Calendar, Outlook, and Calendly. Handles timezone detection, rescheduling, and reminders.' },
      { title: 'Multilingual Intelligence', desc: 'Neo automatically detects the customer\'s language and responds natively. 12+ languages supported.', detail: 'Bulgarian, English, German, Russian, French, Spanish, Italian, Greek, Turkish, Romanian, Polish, and more.' },
      { title: 'Context Memory', desc: 'Neo remembers the entire conversation history. Follow-up questions and multi-turn dialogues are handled naturally.', detail: 'Context persists across sessions and channels. Start on WhatsApp, continue on your website — seamless experience.' },
      { title: 'Human Handoff', desc: 'When a conversation requires human judgment, Neo transfers to your team with complete context.', detail: 'Your team picks up exactly where the AI left off. No information loss. Configurable escalation rules per topic.' },
    ],
  },
  bg: {
    label: 'Възможности',
    headline: 'Какво прави Neo за вашия бизнес.',
    capabilities: [
      { title: 'Мигновен отговор на лийдове', desc: 'Всяко запитване получава интелигентен, контекстуален отговор за под 1 секунда.', detail: 'Neo разбира въпроса, съобразява бизнес контекста и генерира релевантен отговор всеки път.' },
      { title: 'Квалификация на лийдове', desc: 'Neo оценява всеки лийд спрямо вашите критерии — бюджет, времева рамка, нужди, локация.', detail: 'Квалифицираните лийдове се насочват директно към продажбите с пълен контекст на разговора.' },
      { title: 'Резервиране на срещи', desc: 'Когато лийдът е квалифициран, Neo проверява наличността в календара ви и резервира директно.', detail: 'Интегрира се с Google Calendar, Outlook и Calendly. Управлява часови зони и напомняния.' },
      { title: 'Многоезичен интелект', desc: 'Neo автоматично разпознава езика на клиента и отговаря на него. 12+ езика поддържани.', detail: 'Български, английски, немски, руски, френски, испански, италиански, гръцки, турски и още.' },
      { title: 'Контекстна памет', desc: 'Neo помни цялата история на разговора. Последващи въпроси се обработват естествено.', detail: 'Контекстът се запазва между сесии и канали. Безпроблемно изживяване навсякъде.' },
      { title: 'Предаване на човек', desc: 'Когато разговорът изисква човешка преценка, Neo предава на екипа ви с пълен контекст.', detail: 'Екипът продължава точно от там, където AI спря. Конфигурируеми правила за ескалация.' },
    ],
  },
}

export function NeoCapabilities() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-b border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h2>
        </AnimateIn>

        <div className="mt-16 space-y-0 divide-y divide-white/[0.04]">
          {t.capabilities.map((cap, i) => (
            <AnimateIn key={i} delay={i * 60}>
              <div className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16">
                <div>
                  <span className="text-[0.65rem] text-zinc-700 font-mono mb-2 block">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[1.15rem] font-medium text-white mb-3">{cap.title}</h3>
                  <p className="text-[0.95rem] text-zinc-400 leading-[1.7]">{cap.desc}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-zinc-600 leading-[1.7]">{cap.detail}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
