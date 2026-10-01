'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Mockup (design/homepage-mockup.html, .nb-dot): a soft ring grows out of the dot and fades, every 3 s.
const RING = ['0 0 0 0px rgba(31,157,99,0.35)', '0 0 0 6px rgba(31,157,99,0)', '0 0 0 0px rgba(31,157,99,0.35)']

/** The green "online" dot that breathes. Still when reduced motion is on. */
export function LiveDot({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className={cn('inline-block shrink-0 rounded-full bg-online', className)}
      style={style}
      animate={reduce ? undefined : { boxShadow: RING }}
      transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
