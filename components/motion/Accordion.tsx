'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { ACCORDION, EASE } from '@/lib/motion'

/**
 * Question that opens smoothly (MOTION.md: height with AnimatePresence, 250 ms; the plus turns to ×).
 * Built on <details>, so without JavaScript it still opens and closes natively.
 * With JS the click is handled here: <details> stays open until the closing animation has finished.
 */
export function Accordion({ q, children }: { q: string; children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false) // what the visitor sees
  const [detailsOpen, setDetailsOpen] = useState(false) // native <details> state

  return (
    <details open={detailsOpen} className="border-b border-line py-5">
      <summary
        className="flex cursor-pointer list-none justify-between gap-4 text-[18px] font-medium [&::-webkit-details-marker]:hidden"
        onClick={(e) => {
          e.preventDefault()
          if (open) setOpen(false)
          else {
            setDetailsOpen(true)
            setOpen(true)
          }
          if (reduce && open) setDetailsOpen(false)
        }}
      >
        {q}
        <motion.span
          aria-hidden="true"
          className="text-[22px] leading-none"
          animate={{ rotate: open ? 45 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: ACCORDION.duration, ease: EASE }}
        >
          +
        </motion.span>
      </summary>
      <AnimatePresence initial={false} onExitComplete={() => setDetailsOpen(false)}>
        {open && (
          <motion.div
            key="answer"
            className="overflow-hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: ACCORDION.duration, ease: EASE }}
          >
            <p className="mb-0 pt-3 text-stone">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Without JavaScript <details> shows this native copy; with JS it is replaced by the animated one above. */}
      <noscript>
        <p className="mb-0 pt-3 text-stone">{children}</p>
      </noscript>
    </details>
  )
}
