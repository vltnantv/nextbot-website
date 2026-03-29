'use client'

import { useLanguage } from '@/lib/i18n'
import { AnimateIn } from '@/components/AnimateIn'

const copy = {
  en: {
    label: 'In Action',
    headline: 'See how Neo handles a real conversation.',
    scenarios: [
      {
        title: 'Dental Clinic',
        messages: [
          { role: 'customer', text: 'Zdraveyte, iskam da zapisha chas za pregled.' },
          { role: 'neo', text: 'Zdraveyte! Za koy den Vi e udobno — srqda ili chetvurtuk?' },
          { role: 'customer', text: 'Srqda sled 17:00.' },
          { role: 'neo', text: 'Imame svoboden chas v srqda v 17:30 s d-r Petrova. Da go zapisha li?' },
          { role: 'customer', text: 'Da, blagodarya.' },
          { role: 'neo', text: 'Chasut e zapisan. Shte poluchite potvrzhdenie na telefona si.' },
        ],
      },
      {
        title: 'Fitness Center',
        messages: [
          { role: 'customer', text: 'Kolko struva mesеchen abonament?' },
          { role: 'neo', text: 'Imame tri varianta — Basic (49лв), Standard (79лв) i Premium (99лв). Iskate li da zapishem bezplatna probna trenirovka?' },
          { role: 'customer', text: 'Da, mozhe.' },
          { role: 'neo', text: 'Za koy den Vi e udobno? Imame svobodni chasove utre ot 10:00 do 12:00.' },
        ],
      },
    ],
  },
  bg: {
    label: 'В действие',
    headline: 'Вижте как Neo управлява реален разговор.',
    scenarios: [
      {
        title: 'Дентална клиника',
        messages: [
          { role: 'customer', text: 'Здравейте, искам да запиша час за преглед.' },
          { role: 'neo', text: 'Здравейте! За кой ден Ви е удобно — сряда или четвъртък?' },
          { role: 'customer', text: 'Сряда след 17:00.' },
          { role: 'neo', text: 'Имаме свободен час в сряда в 17:30 с д-р Петрова. Да го запиша ли?' },
          { role: 'customer', text: 'Да, благодаря.' },
          { role: 'neo', text: 'Часът е записан. Ще получите потвърждение на телефона си.' },
        ],
      },
      {
        title: 'Фитнес център',
        messages: [
          { role: 'customer', text: 'Колко струва месечен абонамент?' },
          { role: 'neo', text: 'Имаме три варианта — Basic (49лв), Standard (79лв) и Premium (99лв). Искате ли да запишем безплатна пробна тренировка?' },
          { role: 'customer', text: 'Да, може.' },
          { role: 'neo', text: 'За кой ден Ви е удобно? Имаме свободни часове утре от 10:00 до 12:00.' },
        ],
      },
    ],
  },
}

export function NeoDemo() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="py-28 sm:py-36 border-y border-nb-border">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <AnimateIn>
          <p className="text-[0.7rem] text-nb-accent uppercase tracking-[0.2em] font-medium mb-5">{t.label}</p>
          <h2 className="text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white max-w-2xl">{t.headline}</h2>
        </AnimateIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.scenarios.map((scenario, i) => (
            <AnimateIn key={i} delay={i * 120}>
              <div className="rounded-2xl border border-nb-border overflow-hidden h-full">
                <div className="px-6 py-4 border-b border-nb-border bg-nb-surface-el">
                  <h3 className="text-sm font-medium text-white">{scenario.title}</h3>
                </div>
                <div className="p-6 space-y-4 bg-nb-surface">
                  {scenario.messages.map((msg, j) => (
                    <div key={j} className={`flex ${msg.role === 'neo' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] rounded-xl px-4 py-2.5 ${msg.role === 'neo' ? 'bg-nb-surface-el border border-nb-border' : 'bg-nb-accent/10 border border-nb-accent/10'}`}>
                        <p className={`text-[0.82rem] leading-relaxed ${msg.role === 'neo' ? 'text-white' : 'text-nb-text-secondary'}`}>{msg.text}</p>
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
