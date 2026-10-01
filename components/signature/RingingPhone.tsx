'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE } from '@/lib/motion'
import { ExampleTag } from './ExampleTag'

// ARIA signature (copy/UNIQUE.md „Звънящ телефон“): a big phone that trembles and shows a sound wave.
// Click: the wave becomes text on the screen, line by line, then turns into a card „Бележка за вас“.
// Not a recording - labelled „Пример, не е запис.“ Without JavaScript the note is shown (<noscript>).

const LINES = ['Здравейте, обажда се…', 'иска час за четвъртък.']
const BARS = [0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.75, 0.5, 0.95, 0.6, 0.3, 0.65]

type Stage = 'ring' | 'text' | 'note'

function Note() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-[18px] border border-line bg-white p-5 text-left shadow-[0_12px_32px_rgba(31,29,26,.10)]">
      <span className="font-display text-[18px] font-semibold">Бележка за вас</span>
      <span className="text-[15px] leading-snug text-stone">{LINES.join(' ')}</span>
    </div>
  )
}

export function RingingPhone() {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState<Stage>('ring')
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (stage !== 'text') return
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((n) => n + 1), reduce ? 0 : 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStage('note'), reduce ? 0 : 1100)
    return () => clearTimeout(t)
  }, [stage, shown, reduce])

  const answer = () => {
    setShown(0)
    setStage(stage === 'note' ? 'ring' : 'text')
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        type="button"
        onClick={answer}
        aria-label={stage === 'note' ? 'Отначало' : 'ARIA вдига'}
        // a soft tremble every few seconds while it rings (2°, never fast spinning)
        animate={stage === 'ring' && !reduce ? { rotate: [0, -2, 2, -2, 2, 0, 0] } : { rotate: 0 }}
        transition={stage === 'ring' && !reduce ? { duration: 1.6, times: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 1], repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
        className="relative flex h-[440px] w-[230px] flex-col items-center rounded-[40px] border-[10px] border-ink bg-cream px-4 pb-6 pt-10 shadow-[0_24px_60px_rgba(31,29,26,.18)]"
      >
        <span aria-hidden="true" className="absolute top-3 h-1.5 w-14 rounded-full bg-ink/80" />
        <span className="font-display text-[22px] font-semibold">ARIA</span>

        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {stage === 'ring' && (
              <motion.div key="wave" exit={{ opacity: 0 }} className="flex h-24 items-center gap-1" aria-hidden="true">
                {BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    className="block h-20 w-1.5 origin-center rounded-full bg-ink"
                    initial={false}
                    animate={reduce ? { scaleY: h } : { scaleY: [h * 0.4, h, h * 0.5, h * 0.9, h * 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
                  />
                ))}
              </motion.div>
            )}
            {stage === 'text' && (
              <motion.div key="text" exit={{ opacity: 0 }} className="flex w-full flex-col gap-2 text-left text-[16px] leading-snug" aria-live="polite">
                {LINES.slice(0, shown).map((l) => (
                  <motion.span key={l} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                    {l}
                  </motion.span>
                ))}
              </motion.div>
            )}
            {stage === 'note' && (
              <motion.div key="note" className="w-full" initial={reduce ? false : { opacity: 0, scale: 0.9, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <Note />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage === 'ring' && (
          <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-online text-white shadow-[0_8px_20px_rgba(31,122,76,.35)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
            </svg>
          </span>
        )}
      </motion.button>
      <noscript>
        <div className="w-[260px]">
          <Note />
        </div>
      </noscript>
      <ExampleTag>Пример, не е запис.</ExampleTag>
    </div>
  )
}
