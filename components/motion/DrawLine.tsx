'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { DRAW, EASE, VIEWPORT } from '@/lib/motion'
import { useMounted } from './useMounted'

/**
 * Line that draws itself with pathLength 0→1 in 1.2 s when it comes into view (MOTION.md).
 * Horizontal by default (steps); `arrow` adds a head for connections like Сайт → CORE → ECHO.
 * Server / no JS / reduced motion: the line is simply there.
 */
export function DrawLine({ className, arrow = false, delay = 0 }: { className?: string; arrow?: boolean; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const live = mounted && !reduce
  const draw = (d: number) =>
    // remounted (key) once live, so the path starts at 0 and draws when it comes into view
    live ? { initial: { pathLength: 0 }, animate: inView ? { pathLength: 1 } : undefined, transition: { duration: DRAW.duration, ease: EASE, delay: d } } : {}

  // No viewBox: the line spans 100% of the width without stretching, so pathLength is measured
  // correctly in Safari too. The arrow head is a small nested svg pinned to the right end.
  return (
    <svg ref={ref} className={className} width="100%" height="12" aria-hidden="true" fill="none" overflow="visible">
      <line x1="0" y1="6" x2="100%" y2="6" stroke="#E2D9CC" strokeWidth="2" />
      <motion.line key={live ? 'live' : 'static'} x1="0" y1="6" x2="100%" y2="6" stroke="#1F1D1A" strokeWidth="2" {...draw(delay)} />
      {arrow && (
        <svg x="100%" y="6" overflow="visible">
          <motion.path key={live ? 'live-arrow' : 'static-arrow'} d="M-6 -4 L0 0 L-6 4" stroke="#1F1D1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...draw(delay + DRAW.duration * 0.8)} />
        </svg>
      )}
    </svg>
  )
}
