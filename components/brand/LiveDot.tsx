'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** The green "online" dot. Breathes slowly every 3 s (BRAND.md); still when reduced motion is on. */
export function LiveDot({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className={cn('inline-block rounded-full bg-online', className)}
      style={style}
      animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [1, 0.75, 1] }}
      transition={reduce ? undefined : { duration: 1.2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
    />
  )
}
