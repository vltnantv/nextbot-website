'use client'

import { stagger, useAnimate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { EASE, REVEAL, VIEWPORT } from '@/lib/motion'
import { GUARANTEE_DAYS, SETUP_DAYS } from '@/lib/prices'

// /za-nas signature (copy/UNIQUE.md „Две колони“): what we promise and what we don't. The rows appear
// taking turns from the two sides. Hidden start is CSS-only (.js [data-stagger] > *), so no-JS shows all.

const YES = [
  'отговор на български',
  'човек на телефона',
  `настройка за ${SETUP_DAYS} дни`,
  `връщане на таксата за настройка до ${GUARANTEE_DAYS} дни`,
  'без годишен договор',
]
const NO = ['да замени вас', 'да знае всичко', 'да върши чудеса за една вечер', 'измислени отзиви и числа']

function Column({ title, items, yes, scope }: { title: string; items: string[]; yes: boolean; scope: React.Ref<HTMLUListElement> }) {
  return (
    <div className={`flex flex-col gap-5 rounded-[24px] p-7 sm:p-9 ${yes ? 'bg-ink text-cream' : 'border border-line bg-white'}`}>
      <h2 className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">{title}</h2>
      <ul ref={scope} data-stagger="" className="m-0 flex list-none flex-col gap-3 p-0">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[18px] leading-snug">
            <span aria-hidden="true" className={`mt-0.5 shrink-0 ${yes ? 'text-online' : 'text-stone'}`}>
              {yes ? '✓' : '×'}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Promises() {
  const [left, animateLeft] = useAnimate<HTMLUListElement>()
  const [right, animateRight] = useAnimate<HTMLUListElement>()
  const inView = useInView(left, VIEWPORT)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce) return
    // taking turns: left row 1, right row 1, left row 2 …
    const step = 0.16
    const keyframes = (x: number) => ({ opacity: [0, 1], x: [x, 0], y: [REVEAL.y / 2, 0] })
    animateLeft(':scope > *', keyframes(-16), { duration: 0.6, ease: EASE, delay: stagger(step * 2) })
    animateRight(':scope > *', keyframes(16), { duration: 0.6, ease: EASE, delay: stagger(step * 2, { startDelay: step }) })
  }, [inView, reduce, animateLeft, animateRight])

  return (
    <div className="grid gap-5 min-[800px]:grid-cols-2">
      <Column title="Обещаваме" items={YES} yes scope={left} />
      <Column title="Не обещаваме" items={NO} yes={false} scope={right} />
    </div>
  )
}
