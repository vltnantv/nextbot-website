'use client'

import { useRef, useState } from 'react'
import { ChatWidget } from '@/components/demo/ChatWidget'
import { Float } from '@/components/motion/Float'
import { Reveal } from '@/components/motion/Reveal'
import { EYEBROW, H, H2, WRAP } from './ui'

// Industries from the mockup. `industry` is the context the real /api/chat uses.
const INDUSTRIES = [
  {
    key: 'auto',
    label: 'Автокъща',
    industry: 'autodealer',
    business: 'Автокъща „Демо“',
    examples: ['Има ли лизинг за Golf-а от обявата?', 'Може ли оглед в събота сутрин?'],
  },
  {
    key: 'clinic',
    label: 'Клиника',
    industry: 'dental',
    business: 'Дентален кабинет „Усмивка“',
    examples: ['Искам час за почистване на зъбен камък.', 'Колко струва преглед?'],
  },
  {
    key: 'realty',
    label: 'Имоти',
    industry: 'realestate',
    business: 'Агенция за имоти „Демо“',
    examples: ['Може ли оглед на двустайния в Лозенец в събота?', 'Има ли тристайни до 200 000 €?'],
  },
  {
    key: 'hotel',
    label: 'Хотел',
    industry: 'hotel',
    business: 'Семеен хотел „Демо“',
    examples: ['Имате ли стая за двама за 2 нощувки от петък?', 'Закуската включена ли е?'],
  },
] as const

/** `page`: used as the /demo page - the title becomes the h1 (copy/UNIQUE.md „Демо“). */
export function TryIt({ page = false }: { page?: boolean }) {
  const [active, setActive] = useState<(typeof INDUSTRIES)[number]['key']>('auto')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = INDUSTRIES.find((i) => i.key === active)!

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + INDUSTRIES.length) % INDUSTRIES.length
    setActive(INDUSTRIES[next].key)
    tabs.current[next]?.focus()
  }

  return (
    <section id="demo" className={`relative z-[1] ${page ? 'pb-[104px] pt-14' : 'py-[104px]'}`}>
      <div className={`${WRAP} grid items-center gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[900px]:gap-12`}>
        <Reveal className="flex min-w-0 flex-col gap-5">
          <div id="branshove" className="flex flex-col gap-5">
            {page ? (
              <h1 className={`${H} text-[clamp(38px,5vw,64px)] leading-[1.04]`}>Пишете му както би писал ваш клиент.</h1>
            ) : (
              <>
                <span className={EYEBROW}>Пробвайте сами</span>
                <h2 className={H2}>Пишете му както би писал ваш клиент.</h2>
              </>
            )}
            <p className="m-0 text-stone">Изберете бранш и пишете. Отговаря истинският NEO.</p>
            <div role="tablist" aria-label="Бранш" className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind, i) => {
                const on = ind.key === active
                return (
                  <button
                    key={ind.key}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${ind.key}`}
                    aria-selected={on}
                    aria-controls="demo-chat"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(ind.key)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={
                      'min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] font-medium transition-transform duration-200 hover:-translate-y-px motion-reduce:transition-none ' +
                      (on ? 'border-ink bg-ink text-cream' : 'border-[#D9D0C2] bg-white text-ink')
                    }
                  >
                    {ind.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <Float className="min-w-0" duration={6}>
          <div
            id="demo-chat"
            role="tabpanel"
            aria-labelledby={`tab-${current.key}`}
            className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_1px_2px_rgba(31,29,26,.04),0_24px_60px_rgba(31,29,26,.08)]"
          >
            {/* key: a new conversation for each industry */}
            <ChatWidget
              key={current.key}
              variant="inline"
              industry={current.industry}
              tone="friendly"
              language="bg"
              botName="NEO"
              businessName={current.business}
              welcomeMessage={`Здравейте! Аз съм NEO от ${current.business}. С какво мога да помогна?`}
              quickActions={[...current.examples]}
              accentColor="#1F1D1A"
            />
          </div>
        </Float>
      </div>
    </section>
  )
}
