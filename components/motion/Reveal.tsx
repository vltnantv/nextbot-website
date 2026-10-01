'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useMounted } from './useMounted'

/**
 * Scroll-linked float-in (mockup .nb-reveal: opacity 0→1, y 48→0, scale .98→1 while the block
 * enters the viewport). Works in every browser via Framer Motion's useScroll - the CSS
 * `animation-timeline: view()` in the mockup does not run in Safari or Firefox.
 * Server / no JS: plain visible element (hidden start only via .js [data-reveal] in CSS).
 * Reduced motion: plain element.
 */
export function Reveal({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mounted = useMounted()
  // entry 0% → cover 28%: from the top edge touching the viewport bottom until ~a third of the way up
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.62'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [48, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1])

  const Tag = motion[as] as typeof motion.div
  const live = mounted && !reduce
  return (
    <Tag ref={ref} data-reveal={reduce ? undefined : ''} className={className} style={live ? { opacity, y, scale } : undefined}>
      {children}
    </Tag>
  )
}
