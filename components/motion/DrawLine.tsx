'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMounted } from './useMounted'

/** 2 px line that draws itself from left to right while scrolling into view (mockup .nb-line). */
export function DrawLine() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.5'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div ref={ref} className="mb-2.5 h-0.5 bg-[#E2D9CC]">
      <motion.div className="h-0.5 origin-left bg-ink" style={mounted && !reduce ? { scaleX } : undefined} />
    </div>
  )
}
