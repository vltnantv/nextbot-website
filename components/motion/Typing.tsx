'use client'

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, TYPING, VIEWPORT } from '@/lib/motion'

export type ChatLine = { who: 'u' | 'b'; text: string }

const USER = 'self-end max-w-[80%] rounded-[18px_18px_4px_18px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug'
const BOT = 'self-start max-w-[84%] rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-2.5 text-[15px] leading-snug'
const POP = {
  initial: { opacity: 0, y: 10, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.5, ease: EASE },
}

/**
 * Chat example where messages arrive one by one, with „пише…“ before every answer (MOTION.md „Typing“).
 * Starts when it scrolls into view. `loop` replays it (homepage hero, as in the mockup).
 * The server renders the finished conversation, so it is complete without JavaScript and with
 * reduced motion. Pauses while off-screen or when the tab is hidden.
 */
export function Typing({
  lines,
  timeLabel,
  doneLabel,
  loop = false,
  className = '',
}: {
  lines: ChatLine[]
  timeLabel?: string
  doneLabel?: string
  loop?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  // step k: lines[0..k) are shown; `typing` = the bot is "writing" lines[k]
  const [count, setCount] = useState(lines.length)
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce || !inView) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const tick = () => (document.hidden ? timers.push(setTimeout(tick, 300)) : r())
        timers.push(setTimeout(tick, ms))
      })
    const run = async () => {
      setStarted(true)
      do {
        setCount(0)
        setTyping(false)
        await wait(TYPING.pauseMs)
        for (let i = 0; i < lines.length && !cancelled; i++) {
          if (lines[i].who === 'b') {
            setTyping(true)
            await wait(TYPING.typingMs)
            setTyping(false)
          }
          setCount(i + 1)
          await wait(TYPING.pauseMs + 300)
        }
        if (loop) await wait(TYPING.typingMs * 3)
      } while (loop && !cancelled)
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [reduce, inView, loop, lines])

  const anim = started ? POP : {}
  return (
    <div ref={ref} className={`box-border flex flex-col gap-2.5 bg-[#FCFAF7] px-[18px] pb-[22px] pt-5 ${className}`}>
      {timeLabel && <div className="self-center text-[12px] text-stone">{timeLabel}</div>}
      <AnimatePresence initial={false} mode="popLayout">
        {lines.slice(0, count).map((m, i) => (
          <motion.div key={`${i}-${m.text}`} className={m.who === 'u' ? USER : BOT} {...anim}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <motion.div key="typing" className="self-start rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-3" {...POP}>
            <span className="typing" aria-label="пише…">
              <span />
              <span />
              <span />
            </span>
          </motion.div>
        )}
        {doneLabel && count === lines.length && !typing && (
          <motion.div key="done" className="flex items-center gap-1.5 self-start pl-1 text-[12px] text-online-text" {...anim}>
            <span className="h-1.5 w-1.5 rounded-full bg-online" />
            {doneLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
