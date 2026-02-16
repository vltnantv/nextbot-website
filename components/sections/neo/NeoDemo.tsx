'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'In Action',
    headline: 'See how Neo handles a real conversation.',
    scenarios: [
      {
        title: 'Lead Qualification',
        messages: [
          { role: 'customer', text: 'Hi, I\'m interested in solar panels for my house.' },
          { role: 'neo', text: 'Hello! I\'d be happy to help. Could you tell me the approximate size of your roof in square meters?' },
          { role: 'customer', text: 'Around 80 sqm, south-facing.' },
          { role: 'neo', text: 'Excellent orientation for solar. Based on 80m\u00B2, you could generate approximately 12,000 kWh annually. Would you like to schedule a free on-site assessment? I have Thursday at 10:00 or Friday at 14:00.' },
          { role: 'customer', text: 'Thursday works.' },
          { role: 'neo', text: 'Done. Assessment booked for Thursday at 10:00. You\'ll receive a confirmation email shortly.' },
        ],
      },
      {
        title: 'Multilingual Support',
        messages: [
          { role: 'customer', text: 'Haben Sie freie Zimmer f\u00FCr n\u00E4chstes Wochenende?' },
          { role: 'neo', text: 'Ja, wir haben noch Verf\u00FCgbarkeiten. F\u00FCr wie viele G\u00E4ste und N\u00E4chte m\u00F6chten Sie buchen?' },
          { role: 'customer', text: '2 G\u00E4ste, 2 N\u00E4chte.' },
          { role: 'neo', text: 'Perfekt. Deluxe-Doppelzimmer mit Bergblick \u2014 \u20AC90 pro Nacht. Soll ich die Reservierung vornehmen?' },
        ],
      },
    ],
  },
  bg: {
    label: 'В действие',
    headline: 'Вижте как Neo управлява реален разговор.',
    scenarios: [
      {
        title: 'Квалификация на лийд',
        messages: [
          { role: 'customer', text: 'Здравейте, интересувам се от соларни панели за къщата ми.' },
          { role: 'neo', text: 'Здравейте! С удоволствие ще помогна. Каква е приблизителната площ на покрива в квадратни метри?' },
          { role: 'customer', text: 'Около 80 кв.м., южно изложение.' },
          { role: 'neo', text: 'Отлично изложение. При 80м\u00B2 южен покрив, бихте генерирали около 12,000 kWh годишно. Желаете ли безплатна оценка на място? Имам четвъртък в 10:00 или петък в 14:00.' },
          { role: 'customer', text: 'Четвъртък ми е удобно.' },
          { role: 'neo', text: 'Готово. Оценката е резервирана за четвъртък в 10:00. Ще получите потвърждение по имейл.' },
        ],
      },
      {
        title: 'Многоезична поддръжка',
        messages: [
          { role: 'customer', text: 'Haben Sie freie Zimmer f\u00FCr n\u00E4chstes Wochenende?' },
          { role: 'neo', text: 'Ja, wir haben Verf\u00FCgbarkeiten. F\u00FCr wie viele G\u00E4ste und N\u00E4chte?' },
          { role: 'customer', text: '2 G\u00E4ste, 2 N\u00E4chte.' },
          { role: 'neo', text: 'Perfekt. Deluxe-Doppelzimmer mit Bergblick \u2014 \u20AC90 pro Nacht. Reservierung vornehmen?' },
        ],
      },
    ],
  },
}

export function NeoDemo() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-y border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-indigo-400/60 uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.scenarios.map((scenario, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="rounded-2xl border border-white/[0.05] overflow-hidden h-full">
                <div className="px-6 py-4 border-b border-white/[0.04] bg-white/[0.015]">
                  <h3 className="text-sm font-medium text-white">{scenario.title}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {scenario.messages.map((msg, j) => (
                    <div key={j} className={`flex ${msg.role === 'neo' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] rounded-xl px-4 py-2.5 ${msg.role === 'neo' ? 'bg-white/[0.04] border border-white/[0.04]' : 'bg-indigo-500/10 border border-indigo-500/10'}`}>
                        <p className={`text-[0.82rem] leading-relaxed ${msg.role === 'neo' ? 'text-zinc-300' : 'text-indigo-200/80'}`}>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
