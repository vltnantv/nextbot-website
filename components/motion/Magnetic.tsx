'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { MAGNETIC, SPRING } from '@/lib/motion'
import { useCanHover } from './useCanHover'

/** Wraps the primary button so it follows the cursor slightly, up to 6 px (MOTION.md). Mouse only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)
  if (!canHover || reduce) return <span className={`inline-flex ${className ?? ''}`}>{children}</span>

  return (
    <motion.span
      className={`inline-flex ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
        x.set(Math.max(-1, Math.min(1, dx)) * MAGNETIC.max)
        y.set(Math.max(-1, Math.min(1, dy)) * MAGNETIC.max)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
