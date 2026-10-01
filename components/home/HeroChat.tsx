'use client'

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const USER = 'self-end max-w-[80%] rounded-[18px_18px_4px_18px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug'
const BOT = 'self-start max-w-[84%] rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-2.5 text-[15px] leading-snug'

// Script from design/homepage-mockup.html: one step every 1.3 s, 0…10, then again.
const SCRIPT = [
  { at: 1, who: 'u', text: 'Здравейте, има ли свободен час утре?' },
  { at: 3, who: 'b', text: 'Здравейте! Утре има в 10:30 и 14:00. Кой час ви е удобен?' },
  { at: 4, who: 'u', text: '10:30, благодаря.' },
  { at: 6, who: 'b', text: 'Записах ви за утре в 10:30. Ще получите напомняне вечерта.' },
] as const
const TYPING_AT = [2, 5]
const DONE_AT = 7
const LAST_STEP = 10
const STEP_MS = 1300

// mockup .nb-pop
const POP = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.5, ease: [0.2, 0.9, 0.3, 1.2] as const },
}

/**
 * The live chat in the hero: message → „пише…“ → answer, on a loop.
 * The server renders the finished conversation (step 7), so it is complete without JavaScript
 * and with reduced motion. The loop pauses while off-screen or when the tab is hidden.
 */
export function HeroChat() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [step, setStep] = useState(DONE_AT)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce || !inView) return
    if (!started) {
      setStarted(true)
      setStep(0)
    }
    const timer = setInterval(() => {
      if (document.hidden) return
      setStep((s) => (s >= LAST_STEP ? 0 : s + 1))
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [reduce, inView, started])

  const shown = SCRIPT.filter((m) => step >= m.at)
  const typing = TYPING_AT.includes(step)

  return (
    <div
      ref={ref}
      aria-live="off"
      className="box-border flex min-h-[330px] flex-col gap-2.5 bg-[#FCFAF7] px-[18px] pb-[22px] pt-5"
    >
      <div className="self-center text-[12px] text-stone">Неделя, 22:47</div>
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map((m) => (
          <motion.div key={m.at} layout="position" className={m.who === 'u' ? USER : BOT} {...(started ? POP : {})}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key="typing"
            className="self-start rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-3"
            {...POP}
          >
            <span className="typing" aria-label="пише…">
              <span />
              <span />
              <span />
            </span>
          </motion.div>
        )}
        {step >= DONE_AT && (
          <motion.div
            key="done"
            className="flex items-center gap-1.5 self-start pl-1 text-[12px] text-online-text"
            {...(started ? POP : {})}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-online" />
            отговорено за 4 сек. · записано в CORE
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
