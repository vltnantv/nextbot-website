'use client'

import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, VIEWPORT } from '@/lib/motion'
import { useMounted } from '@/components/motion/useMounted'
import { ExampleTag } from './ExampleTag'

// NEO signature (copy/UNIQUE.md „Нощна лента“): 20:00 → 07:00 with a „Час“ slider. Moving it shows the
// messages up to that hour, each answered by NEO. Messages and answers are reused from copy/ (neo, home,
// branshove); times and the morning summary are illustrations and labelled so.
// Every message keeps its place in the layout (only opacity/transform change), so nothing jumps.
// Server / no JS / reduced motion: the whole night is shown. With JS it plays once when scrolled into view.

const FROM = 20 * 60 // minutes after midnight
const SPAN = 11 * 60 // until 07:00

const NIGHT = [
  { time: '20:15', q: 'Здравейте, има ли свободен час утре?', a: 'Здравейте! Утре има в 10:30 и 14:00. Кой час ви е удобен?' },
  { time: '21:14', q: 'Има ли лизинг за този Golf?', a: 'Да, предлагаме лизинг. Искате ли да запазя час за оглед и разговор с търговец?' },
  { time: '22:47', q: 'Здравейте, колко струва почистване на зъби?', a: 'Здравейте! Почистването е 80 €. Искате ли да запазя час?' },
  { time: '23:58', q: 'Може ли оглед в събота?', a: 'Да. В събота има свободно в 11:00 и 14:00. Кой час ви е удобен?' },
  { time: '01:30', q: 'Имате ли стая за 2 нощувки?', a: 'За кои дати? Ще проверя наличността и ще предам заявката на рецепцията.' },
].map((m) => {
  const [h, min] = m.time.split(':').map(Number)
  return { ...m, at: (h * 60 + min - FROM + 1440) % 1440 }
})

const label = (v: number) => {
  const m = (FROM + v) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export function NightShift() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const [value, setValue] = useState(SPAN)
  const touched = useRef(false)
  const played = useRef(false)

  // with JS: start at 20:00 and play through the night once it is on screen, unless the visitor took over
  useEffect(() => {
    if (!mounted || reduce || played.current) return
    if (!inView) {
      if (!touched.current) setValue(0)
      return
    }
    played.current = true
    if (touched.current) return
    const controls = animate(0, SPAN, { duration: 6, ease: 'linear', onUpdate: (v) => !touched.current && setValue(Math.round(v)) })
    return () => controls.stop()
  }, [mounted, reduce, inView])

  const morning = value >= SPAN

  return (
    <div ref={ref} className="grid gap-10 rounded-[28px] bg-[#2E2924] p-7 text-cream sm:p-10 min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="flex flex-col gap-6">
        <ExampleTag dark>Пример, числата са илюстрация</ExampleTag>
        <span className="font-display text-[clamp(56px,8vw,88px)] font-semibold leading-none tracking-[-0.03em] tabular-nums" aria-hidden="true">
          {label(value)}
        </span>
        <label className="flex flex-col gap-3">
          <span className="text-[15px] text-[#D9D0C2]">Час</span>
          <input
            type="range"
            min={0}
            max={SPAN}
            step={1}
            value={value}
            aria-valuetext={label(value)}
            onPointerDown={() => (touched.current = true)}
            onKeyDown={() => (touched.current = true)}
            onChange={(e) => {
              touched.current = true
              setValue(Number(e.target.value))
            }}
            className="w-full cursor-pointer accent-[#F3EEE6]"
          />
          <span className="flex justify-between text-[13px] tabular-nums text-[#B5AB9C]" aria-hidden="true">
            <span>20:00</span>
            <span>24:00</span>
            <span>07:00</span>
          </span>
        </label>
        <motion.p
          initial={false}
          animate={{ opacity: morning ? 1 : 0, y: morning ? 0 : 8 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-hidden={!morning || undefined}
          className="m-0 font-display text-[22px] font-semibold leading-snug"
        >
          Сутринта: 4 записани часа и 2 телефона за обаждане.
        </motion.p>
      </div>

      <ol className="m-0 flex list-none flex-col gap-4 p-0">
        {NIGHT.map((m) => {
          const on = value >= m.at
          return (
            <motion.li
              key={m.time}
              initial={false}
              animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
              aria-hidden={!on || undefined}
              className="flex flex-col gap-2"
            >
              <span className="text-[12px] tabular-nums text-[#B5AB9C]">{m.time}</span>
              <span className="self-end rounded-[18px] rounded-br-[6px] bg-[#4A433B] px-3.5 py-2.5 text-[15px] leading-snug">{m.q}</span>
              <span className="max-w-[90%] self-start rounded-[18px] rounded-bl-[6px] bg-cream px-3.5 py-2.5 text-[15px] leading-snug text-ink">
                {m.a}
              </span>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
