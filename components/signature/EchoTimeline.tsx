'use client'

import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { useMounted } from '@/components/motion/useMounted'
import { Stagger } from '@/components/motion/Stagger'
import { ExampleTag } from './ExampleTag'

// ECHO signature (copy/UNIQUE.md „Времева линия“): a vertical line with 4 points that draws itself while
// you scroll: Ден 0 „Посещение“ → Ден 1 „Как мина?“ → Ден 30 „Напомняне“ → Ден 180 „Отдавна не сме се
// виждали“, each with a short message. Messages for Ден 1 and Ден 30 are the examples from copy/echo.md.
// Server / no JS / reduced motion: the line is fully drawn.

const STEPS: { day: string; title: string; message?: string }[] = [
  { day: 'Ден 0', title: 'Посещение' },
  {
    day: 'Ден 1',
    title: 'Как мина?',
    message: 'Здравейте! Как мина посещението? Ако сте доволна, ще ни помогне отзив тук: [връзка към Google].',
  },
  {
    day: 'Ден 30',
    title: 'Напомняне',
    message: 'Здравейте, Мария! Напомняме Ви за утре в 10:30 ч. Ако не можете да дойдете, отговорете тук и ще преместим часа.',
  },
  { day: 'Ден 180', title: 'Отдавна не сме се виждали' },
]

export function EchoTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })

  return (
    <div ref={ref} className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
      <ExampleTag>Пример за настройка</ExampleTag>
      <div className="relative pl-12">
        {/* the line: a track and an ink line that grows with the scroll (scaleY = transform only) */}
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-[2px] bg-line" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-3 left-[11px] top-3 w-[2px] origin-top bg-ink"
          style={mounted && !reduce ? { scaleY: scrollYProgress } : undefined}
        />
        <Stagger as="ol" className="m-0 flex list-none flex-col gap-10 p-0">
          {STEPS.map((s) => (
            <li key={s.day} className="relative flex flex-col gap-3">
              <span aria-hidden="true" className="absolute -left-12 top-0.5 h-6 w-6 rounded-full border-[3px] border-cream bg-ink shadow-[0_0_0_1px_#E2D9CC]" />
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[15px] font-semibold text-online-text">{s.day}</span>
                <span className="font-display text-[22px] font-semibold tracking-[-0.02em]">{s.title}</span>
              </span>
              {s.message && (
                <span className="max-w-[520px] self-start rounded-[18px] rounded-tl-[6px] border border-line bg-white px-4 py-3 text-[16px] leading-snug shadow-soft">
                  {s.message}
                </span>
              )}
            </li>
          ))}
        </Stagger>
      </div>
    </div>
  )
}
