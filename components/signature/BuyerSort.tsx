'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { SPRING } from '@/lib/motion'
import { eur } from '@/lib/prices'
import { ExampleTag } from './ExampleTag'

// Real estate signature (copy/UNIQUE.md „Карти на купувачи“): three buyer cards (бюджет, район, срок) in
// random order; „Подреди“ sorts them by readiness with a layout animation. Values are made up: „Пример“.

const BUYERS = [
  { id: 'b', budget: 150000, area: 'Младост', term: 'до 3 месеца', rank: 2 },
  { id: 'c', budget: 80000, area: 'Център', term: 'до 1 година', rank: 3 },
  { id: 'a', budget: 95000, area: 'Лозенец', term: 'до 1 месец', rank: 1 },
]

export function BuyerSort() {
  const reduce = useReducedMotion()
  const [sorted, setSorted] = useState(false)
  const list = sorted ? [...BUYERS].sort((x, y) => x.rank - y.rank) : BUYERS

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ExampleTag />
        <button
          type="button"
          onClick={() => setSorted((s) => !s)}
          aria-pressed={sorted}
          className="min-h-11 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-cream"
        >
          Подреди
        </button>
      </div>
      <ol className="m-0 grid list-none gap-5 p-0 min-[800px]:grid-cols-3" aria-live="polite">
        {list.map((b, i) => (
          <motion.li
            key={b.id}
            layout={!reduce}
            transition={SPRING}
            className={`flex flex-col gap-3 rounded-card border bg-white p-6 shadow-soft ${sorted && i === 0 ? 'border-ink' : 'border-line'}`}
          >
            <motion.span
              initial={false}
              animate={{ opacity: sorted ? 1 : 0 }}
              className="font-display text-[15px] font-semibold text-online-text"
              aria-hidden={!sorted || undefined}
            >
              {i + 1}
            </motion.span>
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[16px]">
              <dt className="text-stone">Бюджет</dt>
              <dd className="m-0 font-medium">{eur(b.budget)}</dd>
              <dt className="text-stone">Район</dt>
              <dd className="m-0 font-medium">{b.area}</dd>
              <dt className="text-stone">Срок</dt>
              <dd className="m-0 font-medium">{b.term}</dd>
            </dl>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
