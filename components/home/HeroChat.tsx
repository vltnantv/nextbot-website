'use client'

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const USER = 'self-end max-w-[80%] rounded-[18px_18px_4px_18px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug'
const BOT = 'self-start max-w-[84%] rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-2.5 text-[15px] leading-snug'

export type ChatLine = { who: 'u' | 'b'; text: string }

// Homepage script from design/homepage-mockup.html.
const HOME_SCRIPT: ChatLine[] = [
  { who: 'u', text: 'Здравейте, има ли свободен час утре?' },
  { who: 'b', text: 'Здравейте! Утре има в 10:30 и 14:00. Кой час ви е удобен?' },
  { who: 'u', text: '10:30, благодаря.' },
  { who: 'b', text: 'Записах ви за утре в 10:30. Ще получите напомняне вечерта.' },
]
const STEP_MS = 1300 // one step every 1.3 s

/** Turns lines into timed steps: a client line takes one step, a bot line „пише…“ + the answer. */
function timeline(lines: ChatLine[]) {
  let step = 0
  const timed = lines.map((l) => {
    step += l.who === 'b' ? 2 : 1
    return { ...l, at: step }
  })
  const typingAt = timed.filter((l) => l.who === 'b').map((l) => l.at - 1)
  return { timed, typingAt, end: step }
}

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
export function HeroChat({
  lines = HOME_SCRIPT,
  timeLabel = 'Неделя, 22:47',
  doneLabel = 'отговорено за 4 сек. · записано в CORE',
}: {
  lines?: ChatLine[]
  /** null hides the time above the conversation */
  timeLabel?: string | null
  /** null hides the green line after the last answer */
  doneLabel?: string | null
} = {}) {
  const { timed, typingAt, end } = timeline(lines)
  const DONE_AT = end + 1
  const LAST_STEP = end + 4
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [step, setStep] = useState(end + 1)
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
  }, [reduce, inView, started, LAST_STEP])

  const shown = timed.filter((m) => step >= m.at)
  const typing = typingAt.includes(step)

  return (
    <div
      ref={ref}
      aria-live="off"
      className="box-border flex min-h-[330px] flex-col gap-2.5 bg-[#FCFAF7] px-[18px] pb-[22px] pt-5"
    >
      {timeLabel && <div className="self-center text-[12px] text-stone">{timeLabel}</div>}
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
        {doneLabel && step >= DONE_AT && (
          <motion.div
            key="done"
            className="flex items-center gap-1.5 self-start pl-1 text-[12px] text-online-text"
            {...(started ? POP : {})}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-online" />
            {doneLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
