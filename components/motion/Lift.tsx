'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Card that lifts 3 px with a slightly stronger shadow on hover, 200 ms (BRAND.md). */
export function Lift({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const base = cn('rounded-card border border-line bg-white shadow-soft', className)
  if (reduce) return <div className={base}>{children}</div>

  return (
    <motion.div
      className={base}
      whileHover={{
        y: -3,
        boxShadow: '0 2px 4px rgba(31,29,26,.05), 0 18px 40px rgba(31,29,26,.09)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
