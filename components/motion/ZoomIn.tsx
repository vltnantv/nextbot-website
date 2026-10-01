'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { useMounted } from './useMounted'

/** Final block grows into place while scrolling: scale .92→1, radius 48→28 px (mockup .nb-zoom). */
export function ZoomIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.45'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 28])
  return (
    <motion.div ref={ref} className={cn('rounded-[28px]', className)} style={mounted && !reduce ? { scale, borderRadius } : undefined}>
      {children}
    </motion.div>
  )
}
