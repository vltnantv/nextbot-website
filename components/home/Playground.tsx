'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChatWidget } from '@/components/demo/ChatWidget'
import { Aura } from '@/components/motion/Aura'
import { Reveal } from '@/components/motion/Reveal'
import { CoreDemo } from './CoreDemo'
import { useEchoDemo } from './EchoDemo'
import type { DemoTab } from './parts'
import { EYEBROW, H1, H2, SECTION, SHADOW, TAG, TEXT, WRAP } from './refresh'

// REBUILD-PLAN.md §4.3 „Пробвайте сега“: three working demos in tabs - the real NEO (/api/chat), a CORE board
// and an ECHO reminder. Links with `data-demo-tab` anywhere on the page switch the tab and scroll here.

const TABS: { key: DemoTab; label: string }[] = [
  { key: 'neo', label: 'NEO · асистент' },
  { key: 'core', label: 'CORE · клиенти' },
  { key: 'echo', label: 'ECHO · напомняния' },
]

// `industry` is the context the real /api/chat uses.
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
    label: 'Дентална клиника',
    industry: 'dental',
    business: 'Дентален кабинет „Усмивка“',
    examples: ['Искам час за почистване на зъбен камък.', 'Колко струва преглед?'],
  },
  {
    key: 'realty',
    label: 'Агенция за имоти',
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

const HINT = 'rounded-[10px] border border-dashed border-line px-3 py-2.5 text-[14px] text-stone'
const SIDE_H = 'm-0 mt-1.5 font-display text-[clamp(20px,2vw,26px)] font-semibold leading-[1.2] tracking-[-0.02em] [text-wrap:balance]'

/** Explanation on the left, the demo on a cream background on the right; one column on a phone. */
function Stage({ id, active, side, main }: { id: DemoTab; active: boolean; side: React.ReactNode; main: React.ReactNode }) {
  return (
    <div
      id={`pane-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      hidden={!active}
      className={`relative z-[1] mt-5 overflow-hidden rounded-[20px] border border-line bg-white ${SHADOW} ${active ? 'grid' : ''} min-[860px]:min-h-[480px] min-[860px]:grid-cols-2`}
    >
      <div className="flex min-w-0 flex-col gap-4 border-b border-line p-5 sm:p-8 min-[860px]:border-b-0 min-[860px]:border-r">{side}</div>
      <div className="grid min-w-0 bg-cream p-4 sm:p-6">{main}</div>
    </div>
  )
}

/** `page`: used as the /demo page - the title becomes the h1. */
export function Playground({ initial = 'neo', page = false }: { initial?: DemoTab; page?: boolean }) {
  const [tab, setTab] = useState<DemoTab>(initial)
  const [biz, setBiz] = useState<(typeof INDUSTRIES)[number]['key']>('auto')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const echo = useEchoDemo()
  const current = INDUSTRIES.find((i) => i.key === biz)!

  // Any link with data-demo-tab (hero shelf, product cards) opens its tab here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[data-demo-tab]') as HTMLAnchorElement | null
      const next = a?.dataset.demoTab as DemoTab | undefined
      if (!a || !next || !TABS.some((t) => t.key === next)) return
      e.preventDefault()
      setTab(next)
      document.getElementById('probvaite')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', '#probvaite')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduce])

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length
    setTab(TABS[next].key)
    tabs.current[next]?.focus()
  }

  const title = 'Не ни вярвайте.'
  return (
    <section id="probvaite" className={`${SECTION} overflow-hidden ${page ? '!pt-10 min-[900px]:!pt-14' : ''}`}>
      <Aura className="left-1/2 top-[40%] z-0 h-[min(900px,90vw)] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-[30%]" opacity={0.45} />
      <div className={`${WRAP} relative z-[1]`}>
        <Reveal soft className="flex max-w-[760px] flex-col gap-4">
          {page ? (
            <h1 className={H1}>Пробвайте продуктите, преди да говорим.</h1>
          ) : (
            <>
              <span className={TAG}>Пробвайте сега</span>
              <h2 className={H2}>
                {title} <span className="text-stone">Тествайте.</span>
              </h2>
            </>
          )}
          <p className={`${TEXT} text-stone`}>
            Всичко тук работи. Пишете на асистента, местете клиенти в системата, изпратете си напомняне. Данните са измислени, продуктите са истински.
          </p>
        </Reveal>

        <div role="tablist" aria-label="Продукт" className="relative z-[1] mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-[24px] border border-line bg-white p-1">
          {TABS.map((t, i) => {
            const on = t.key === tab
            return (
              <button
                key={t.key}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={on}
                aria-controls={`pane-${t.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`rounded-full px-[18px] py-2.5 text-[14px] font-semibold transition-colors ${on ? 'bg-ink text-cream' : 'text-stone hover:text-ink'}`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <Stage
          id="neo"
          active={tab === 'neo'}
          side={
            <>
              <div>
                <span className={EYEBROW}>NEO</span>
                <h3 className={SIDE_H}>Задайте въпрос, както би го задал ваш клиент.</h3>
              </div>
              <p className="m-0 text-[16px] text-stone">Асистентът е обучен с данните на измислена фирма. Изберете каква и питайте за цени, часове, наличности.</p>
              <div role="group" aria-label="Бранш" className="flex flex-wrap gap-1.5">
                {INDUSTRIES.map((ind) => {
                  const on = ind.key === biz
                  return (
                    <button
                      key={ind.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setBiz(ind.key)}
                      className={`rounded-full border px-3 py-[7px] text-[13px] font-semibold transition-colors ${
                        on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-stone hover:text-ink'
                      }`}
                    >
                      {ind.label}
                    </button>
                  )
                })}
              </div>
              <p className={`m-0 ${HINT}`}>Опитайте: „има ли лизинг“, „колко струва“, „свободен час утре“, или напишете нещо, което не знае.</p>
            </>
          }
          main={
            <div className="self-start overflow-hidden rounded-[20px] border border-line bg-white">
              {/* key: a new conversation for each industry. This is the real NEO, not a simulation. */}
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
          }
        />

        <Stage
          id="core"
          active={tab === 'core'}
          side={
            <>
              <div>
                <span className={EYEBROW}>CORE</span>
                <h3 className={SIDE_H}>Това вижда продавачът сутрин. И това вижда собственикът.</h3>
              </div>
              <p className="m-0 text-[16px] text-stone">
                Кликнете върху статуса, за да го смените. Кликнете върху клиента, за да видите историята. Превключете на „Собственик“, за да видите целия
                екип.
              </p>
              <p className={`m-0 ${HINT}`}>Пример с измислени данни.</p>
              <a
                href="https://demo.nextbot.me"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 self-start text-[15px] font-semibold text-ink no-underline"
              >
                Пълното демо на CORE <span aria-hidden="true">→</span>
              </a>
            </>
          }
          main={
            <div className="self-start">
              <CoreDemo />
            </div>
          }
        />

        <Stage
          id="echo"
          active={tab === 'echo'}
          side={
            <>
              <div>
                <span className={EYEBROW}>ECHO</span>
                <h3 className={SIDE_H}>Напомнянето, което клиентът ви получава ден преди часа.</h3>
              </div>
              {echo.form}
            </>
          }
          main={<div className="self-center">{echo.phone}</div>}
        />
      </div>
    </section>
  )
}
