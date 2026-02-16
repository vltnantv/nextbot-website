'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'The Solution',
    headline: 'AI infrastructure that responds, qualifies, and converts — automatically.',
    sub: 'NextBot deploys intelligent systems across your lead flow. Every inquiry gets an instant, context-aware response. Every qualified lead gets routed to your team with full context. No manual work. No missed opportunities.',
    capabilities: [
      {
        title: 'Instant Lead Response',
        desc: 'Every inbound inquiry receives an intelligent response within 60 seconds — across chat, voice, email, and messaging platforms. Around the clock.',
      },
      {
        title: 'Intelligent Qualification',
        desc: 'AI evaluates each lead against your criteria — budget, timeline, intent, fit — and prioritizes high-value opportunities for your sales team.',
      },
      {
        title: 'Automated Pipeline',
        desc: 'From booking meetings to nurture sequences — your pipeline advances automatically. Leads move forward even when your team is offline.',
      },
    ],
  },
  bg: {
    label: 'Решението',
    headline: 'AI инфраструктура, която отговаря, квалифицира и конвертира — автоматично.',
    sub: 'NextBot внедрява интелигентни системи по целия поток от лийдове. Всяко запитване получава мигновен, контекстно-осъзнат отговор. Всеки квалифициран лийд се насочва към екипа ви с пълен контекст.',
    capabilities: [
      {
        title: 'Мигновен отговор на лийдове',
        desc: 'Всяко входящо запитване получава интелигентен отговор за под 60 секунди — чрез чат, глас, имейл и месинджър платформи. Денонощно.',
      },
      {
        title: 'Интелигентна квалификация',
        desc: 'AI оценява всеки лийд по вашите критерии — бюджет, времеви рамки, намерение, съвместимост — и приоритизира възможностите с висока стойност.',
      },
      {
        title: 'Автоматизиран pipeline',
        desc: 'От резервиране на срещи до nurture секвенции — pipeline-ът ви напредва автоматично. Лийдовете се движат дори когато екипът ви е офлайн.',
      },
    ],
  },
}

export function SolutionSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(59,130,246,0.03),transparent)]" />

      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] text-blue-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
            <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">
              {t.headline}
            </h2>
            <p className="mt-5 text-[1.05rem] text-zinc-500 leading-[1.7] max-w-2xl">{t.sub}</p>
          </div>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.capabilities.map((cap, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="group relative h-full">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-white/[0.05] h-full">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/[0.07] flex items-center justify-center mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-400/60" />
                  </div>
                  <h3 className="text-[1.05rem] font-medium text-white mb-3">{cap.title}</h3>
                  <p className="text-sm text-zinc-500 leading-[1.7]">{cap.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
