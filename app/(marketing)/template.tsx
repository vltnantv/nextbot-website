'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE, PAGE } from '@/lib/motion'

// Page transition (MOTION.md): short fade and 12 px slide, 250 ms - only when moving between pages.
// The very first page load is not animated, so it is never hidden while JavaScript loads.
let firstRender = true

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const animateIn = !firstRender && !reduce
  firstRender = false
  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: PAGE.y } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: PAGE.duration, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
