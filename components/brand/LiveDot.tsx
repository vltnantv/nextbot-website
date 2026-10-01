'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

/** The green "online" dot. Breathes every 3 s: scale 1→1.25, opacity .6→1 (MOTION.md). Still with reduced motion. */
export function LiveDot({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className={cn('inline-block shrink-0 rounded-full bg-online', className)}
      style={style}
      animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
      transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: EASE }}
    />
  )
}
