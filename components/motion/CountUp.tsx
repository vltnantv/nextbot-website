'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, VIEWPORT } from '@/lib/motion'

/**
 * Number that counts up when it comes into view.
 * MOTION.md: ONLY for real, measured numbers. Not used anywhere until such numbers exist.
 * The final value is rendered on the server, so it is correct without JavaScript.
 */
export function CountUp({ value, duration = 1.2, format = (n: number) => String(Math.round(n)) }: { value: number; duration?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, value, { duration, ease: EASE, onUpdate: setShown })
    return () => c.stop()
  }, [inView, reduce, value, duration])

  return <span ref={ref}>{format(shown)}</span>
}
