'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Use Cases',
    headline: 'Built for industries where speed and automation drive revenue.',
    cases: [
      {
        industry: 'Solar & Energy',
        problem: 'High volume of inbound inquiries from digital campaigns. Slow qualification process loses most leads.',
        solution: 'AI qualifies leads by property type, roof condition, and budget in real time. Books qualified consultations automatically.',
      },
      {
        industry: 'Home Services',
        problem: 'Missed calls and slow response times during peak hours. Customers book with the first company that answers.',
        solution: 'AI handles every inquiry instantly across phone, chat, and messaging. Schedules appointments and sends confirmations.',
      },
      {
        industry: 'B2B Services',
        problem: 'Manual lead qualification wastes sales team time on unqualified prospects. Pipeline velocity is slow.',
        solution: 'AI scores and qualifies leads using your criteria. Routes high-value opportunities directly to sales with full context.',
      },
      {
        industry: 'Hospitality',
        problem: 'Multilingual guest inquiries overflow front desk capacity. Booking questions go unanswered for hours.',
        solution: 'AI responds in 12+ languages, handles booking inquiries, and integrates with reservation systems 24/7.',
      },
    ],
  },
  bg: {
    label: 'Приложения',
    headline: 'Създаден за индустрии, където скоростта и автоматизацията движат приходите.',
    cases: [
      {
        industry: 'Соларна енергия',
        problem: 'Голям обем входящи запитвания от дигитални кампании. Бавната квалификация губи повечето лийдове.',
        solution: 'AI квалифицира лийдове по тип имот, покривно състояние и бюджет в реално време. Автоматично резервира консултации.',
      },
      {
        industry: 'Домашни услуги',
        problem: 'Пропуснати обаждания и бавни отговори в пиковите часове. Клиентите избират първата компания, която отговори.',
        solution: 'AI управлява всяко запитване мигновено чрез телефон, чат и съобщения. Планира срещи и изпраща потвърждения.',
      },
      {
        industry: 'B2B услуги',
        problem: 'Ръчната квалификация хаби времето на екипа за некачествени лийдове. Pipeline-ът се движи бавно.',
        solution: 'AI точкува и квалифицира лийдове по вашите критерии. Насочва възможностите с висока стойност директно към продажбите.',
      },
      {
        industry: 'Хотелиерство',
        problem: 'Многоезични запитвания от гости натоварват рецепцията. Въпросите за резервации остават неотговорени с часове.',
        solution: 'AI отговаря на 12+ езика, управлява запитвания за резервации и се интегрира с резервационни системи 24/7.',
      },
    ],
  },
}

export function UseCasesSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-zinc-600 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white max-w-3xl text-balance">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 space-y-0 divide-y divide-white/[0.04]">
          {t.cases.map((c, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-6 lg:gap-12">
                <div>
                  <h3 className="text-[0.95rem] font-medium text-white">{c.industry}</h3>
                </div>
                <div>
                  <p className="text-[0.7rem] text-zinc-700 uppercase tracking-[0.15em] font-medium mb-2">Problem</p>
                  <p className="text-sm text-zinc-500 leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="text-[0.7rem] text-blue-400/50 uppercase tracking-[0.15em] font-medium mb-2">Solution</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{c.solution}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
