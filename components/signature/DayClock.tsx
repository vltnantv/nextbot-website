'use client'

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE } from '@/lib/motion'
import { useMounted } from '@/components/motion/useMounted'

// Homepage signature (copy/UNIQUE.md „Часовник на деня“), inside the NEO section (DESIGN-REFRESH.md §4: signatures
// stay, as part of the sections). Hairline rows, no cards.: a day strip 08:00–24:00. While you scroll an
// arrow moves along it and at 12:40, 19:15, 22:47 and 23:58 a client message pops up, each „отговорено“.
// The messages are illustrations reused from copy/ (home, neo, branshove) and the block is labelled „Пример“.
// Server / no JS / reduced motion: the whole day is shown, arrow at the end.

const START = 8
const END = 24
const MOMENTS = [
  { time: '12:40', text: 'Здравейте, има ли свободен час утре?' },
  { time: '19:15', text: 'Има ли лизинг за този Golf?' },
  { time: '22:47', text: 'Здравейте, колко струва почистване на зъби?' },
  { time: '23:58', text: 'Имате ли стая за 2 нощувки?' },
].map((m) => {
  const [h, min] = m.time.split(':').map(Number)
  return { ...m, at: (h + min / 60 - START) / (END - START) }
})
const TICKS = ['08:00', '12:00', '16:00', '20:00', '24:00']

const clock = (p: number) => {
  const mins = Math.round((START + p * (END - START)) * 60)
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
}

export function DayClock() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const live = mounted && !reduce
  // 0 when the block enters the lower part of the screen, 1 when its last card is fully on screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.95'] })
  const x = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const time = useTransform(scrollYProgress, clock)
  const [reached, setReached] = useState(MOMENTS.length)

  const update = (v: number) => setReached(MOMENTS.filter((m) => v >= m.at - 0.005).length)
  useMotionValueEvent(scrollYProgress, 'change', (v) => live && update(v))
  useEffect(() => {
    if (live) update(scrollYProgress.get())
    else setReached(MOMENTS.length)
  }, [live, scrollYProgress])

  return (
    <div ref={ref} className="flex flex-col gap-10">
      {/* the strip; on narrow screens it stays under the header while the cards scroll past */}
      <div className="relative z-10 bg-cream pb-3 pt-9 max-[999px]:sticky max-[999px]:top-[88px]" aria-hidden="true">
        <div className="relative h-2 rounded-full bg-line">
          <motion.div
            className="absolute inset-0 origin-left rounded-full bg-ink"
            style={live ? { scaleX: scrollYProgress } : undefined}
          />
          {MOMENTS.map((m, i) => (
            <span
              key={m.time}
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream bg-stone"
              style={{ left: `${m.at * 100}%` }}
            >
              <span
                className="absolute inset-0 rounded-full bg-online transition-opacity duration-300 motion-reduce:transition-none"
                style={{ opacity: i < reached ? 1 : 0 }}
              />
            </span>
          ))}
          {/* moving arrow: a full-width layer translated by the scroll progress (transform only) */}
          <motion.div className="pointer-events-none absolute inset-0" style={live ? { x } : { x: '100%' }}>
            <span className="absolute -top-9 -translate-x-1/2 rounded-full bg-ink px-2.5 py-1 text-[13px] font-medium tabular-nums text-cream">
              {live ? <motion.span>{time}</motion.span> : '24:00'}
            </span>
            <span className="absolute -top-[9px] h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-ink" />
          </motion.div>
        </div>
        <div className="mt-3 flex justify-between text-[13px] tabular-nums text-stone">
          {TICKS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* the messages of the day */}
      <ol className="m-0 grid list-none gap-4 p-0 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-4">
        {MOMENTS.map((m, i) => {
          const on = i < reached
          return (
            <motion.li
              key={m.time}
              aria-hidden={!on || undefined}
              initial={false}
              animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col gap-2.5 border-t border-line pt-4"
            >
              <span className="font-display text-[15px] font-semibold tabular-nums text-stone">{m.time}</span>
              <span className="self-start rounded-[18px] rounded-tl-[6px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug">{m.text}</span>
              <span className="text-[13px] font-medium text-online-text">✓ отговорено</span>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
