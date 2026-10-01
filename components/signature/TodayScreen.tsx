'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { EASE } from '@/lib/motion'
import { ExampleTag } from './ExampleTag'

// CORE signature (copy/UNIQUE.md „Екранът Днес“): a mock of the dashboard with 5 people to call today.
// „Обадих се“ really works: the row turns into „Готово“ and slides away; at the end „Днес сте свободни.“
// Names and reasons are illustrations (labelled „Пример“); the reasons echo copy/core.md and branshove.md.
// The list keeps the height of all 5 rows (measured on mount), so removing rows never moves the page below it.

const PEOPLE = [
  { id: 1, name: 'Мария П.', reason: 'обеща да реши до петък' },
  { id: 2, name: 'Иван Г.', reason: 'оглед в събота' },
  { id: 3, name: 'Елена С.', reason: 'каза „ще помисля“' },
  { id: 4, name: 'Георги Д.', reason: 'чака оферта' },
  { id: 5, name: 'Петя Н.', reason: 'ново запитване от NEO' },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .replace('.', '')

export function TodayScreen() {
  const reduce = useReducedMotion()
  const [rows, setRows] = useState(PEOPLE)
  const [done, setDone] = useState<number[]>([])
  const box = useRef<HTMLDivElement>(null)
  const [minH, setMinH] = useState<number>()
  useLayoutEffect(() => {
    const measure = () => {
      if (!box.current) return
      box.current.style.minHeight = ''
      setMinH(box.current.offsetHeight)
    }
    measure()
    // re-measure on resize only while the full list is still there
    const onResize = () => box.current?.querySelectorAll('li').length === PEOPLE.length && measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const call = (id: number) => {
    setDone((d) => [...d, id])
    setTimeout(() => setRows((r) => r.filter((p) => p.id !== id)), reduce ? 0 : 450)
  }

  return (
    <div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_1px_2px_rgba(31,29,26,.04),0_24px_60px_rgba(31,29,26,.10)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#F0EAE0] px-6 py-4">
        <span className="font-display text-[20px] font-semibold">Днес</span>
        <ExampleTag />
      </div>

      <div ref={box} className="relative" style={{ minHeight: minH }}>
        <ul className="m-0 flex list-none flex-col p-0">
          <AnimatePresence initial={false}>
            {rows.map((p) => {
              const isDone = done.includes(p.id)
              return (
                <motion.li
                  key={p.id}
                  layout={!reduce}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { x: '60%', opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-center gap-4 border-b border-[#F0EAE0] px-6 py-4 last:border-b-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-deep text-[14px] font-semibold">
                    {initials(p.name)}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[15px] text-stone">{p.reason}</span>
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    {isDone ? (
                      <motion.span
                        key="done"
                        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="shrink-0 rounded-full bg-online/15 px-4 py-2 text-[14px] font-medium text-online-text"
                      >
                        ✓ Готово
                      </motion.span>
                    ) : (
                      <motion.button
                        key="call"
                        type="button"
                        onClick={() => call(p.id)}
                        whileTap={reduce ? undefined : { scale: 0.96 }}
                        className="min-h-11 shrink-0 rounded-full border border-ink px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
                        aria-label={`Обадих се: ${p.name}`}
                      >
                        Обадих се
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {rows.length === 0 && (
            <motion.p
              key="free"
              role="status"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="absolute inset-0 m-0 flex items-center justify-center font-display text-[28px] font-semibold"
            >
              Днес сте свободни.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
