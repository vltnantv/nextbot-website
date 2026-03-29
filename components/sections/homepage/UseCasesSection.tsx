'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'Use Cases',
    headline: 'Built for industries where speed and automation drive revenue.',
    cases: [
      {
        industry: 'Dental & Medical Clinics',
        problem: 'Phones ring constantly with appointment requests, rescheduling, and basic questions. Staff spend hours on calls instead of patient care.',
        solution: 'AI handles inbound calls and messages 24/7 — books appointments, answers FAQs, sends reminders, and escalates only when needed.',
      },
      {
        industry: 'Fitness & Wellness Centers',
        problem: 'Leads from Instagram and Google ads go cold because no one responds fast enough. Membership inquiries get lost.',
        solution: 'AI responds instantly to every inquiry, qualifies leads, books trial sessions, and follows up automatically — even outside business hours.',
      },
      {
        industry: 'Restaurants & Hospitality',
        problem: 'Reservation requests, menu questions, and event bookings come in across phone, Instagram, and Google. Most go unanswered.',
        solution: 'AI manages reservations, answers questions across all channels, and confirms bookings automatically — in any language.',
      },
      {
        industry: 'B2B Services & Agencies',
        problem: 'Sales team spends too much time qualifying leads that never convert. Pipeline moves slowly.',
        solution: 'AI qualifies inbound leads using your criteria, books discovery calls with the right prospects, and keeps your pipeline moving 24/7.',
      },
    ],
  },
  bg: {
    label: 'Приложения',
    headline: 'Създаден за индустрии, където скоростта и автоматизацията движат приходите.',
    cases: [
      {
        industry: 'Дентални и медицински клиники',
        problem: 'Телефоните звънят непрекъснато със заявки за часове, пренасрочване и основни въпроси. Персоналът прекарва часове в обаждания вместо в грижа за пациентите.',
        solution: 'AI обработва входящи обаждания и съобщения 24/7 — записва часове, отговаря на въпроси, изпраща напомняния и ескалира само при нужда.',
      },
      {
        industry: 'Фитнес и уелнес центрове',
        problem: 'Лийдовете от Instagram и Google реклами изстиват, защото никой не отговаря достатъчно бързо. Запитванията за членство се губят.',
        solution: 'AI отговаря мигновено на всяко запитване, квалифицира лийдове, записва пробни сесии и проследява автоматично — дори извън работно време.',
      },
      {
        industry: 'Ресторанти и хотелиерство',
        problem: 'Заявки за резервации, въпроси за менюто и организиране на събития идват по телефон, Instagram и Google. Повечето остават без отговор.',
        solution: 'AI управлява резервации, отговаря на въпроси по всички канали и потвърждава резервации автоматично — на всеки език.',
      },
      {
        industry: 'B2B услуги и агенции',
        problem: 'Екипът по продажби прекарва твърде много време в квалификация на лийдове, които никога не конвертират. Pipeline-ът се движи бавно.',
        solution: 'AI квалифицира входящи лийдове по вашите критерии, записва discovery срещи с правилните перспективи и поддържа pipeline-а ви активен 24/7.',
      },
    ],
  },
}

export function UseCasesSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-t border-nb-border">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-nb-navy max-w-3xl text-balance">
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="mt-16 space-y-0 divide-y divide-nb-border">
          {t.cases.map((c, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-6 lg:gap-12">
                <div>
                  <h3 className="text-[0.95rem] font-medium text-nb-navy">{c.industry}</h3>
                </div>
                <div>
                  <p className="text-[0.7rem] text-nb-text-muted uppercase tracking-[0.15em] font-medium mb-2">Problem</p>
                  <p className="text-sm text-nb-text-secondary leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="text-[0.7rem] text-nb-gold uppercase tracking-[0.15em] font-medium mb-2">Solution</p>
                  <p className="text-sm text-nb-text-secondary leading-relaxed">{c.solution}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
