'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EASE } from '@/lib/motion'
import { ExampleTag } from './ExampleTag'

// Hotels signature (copy/UNIQUE.md „Пет въпроса“): five question cards; clicking one turns it into NEO's
// answer. The questions are from UNIQUE.md; the room answer is the example from copy/branshove.md,
// the others are illustrations for a made-up hotel (labelled „Пример“).

const QA = [
  { q: 'Има ли паркинг?', a: 'Да, има паркинг към хотела.' },
  { q: 'В колко е закуската?', a: 'Закуската е от 7:30 до 10:00.' },
  { q: 'Допускате ли домашни любимци?', a: 'Да, с предварително уговаряне.' },
  { q: 'Колко е до центъра?', a: 'На 10 минути пеша.' },
  { q: 'Има ли свободна стая?', a: 'За кои дати? Ще проверя наличността и ще предам заявката на рецепцията.' },
]

export function FiveQuestions() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<number[]>([])
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))

  return (
    <div className="flex flex-col gap-6">
      <ExampleTag />
      <ul className="m-0 grid list-none gap-4 p-0 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-5">
        {QA.map((item, i) => {
          const on = open.includes(i)
          return (
            <li key={item.q}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`relative flex h-full min-h-[150px] w-full flex-col gap-2 overflow-hidden rounded-card border p-5 text-left shadow-soft transition-colors ${
                  on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink hover:border-ink'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {on ? (
                    <motion.span
                      key="a"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex flex-col gap-2"
                    >
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                        <span className="h-2 w-2 rounded-full bg-online" aria-hidden="true" /> NEO
                      </span>
                      <span className="text-[16px] leading-snug">{item.a}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="q"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="font-display text-[19px] font-semibold leading-snug tracking-[-0.01em]"
                    >
                      {item.q}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
