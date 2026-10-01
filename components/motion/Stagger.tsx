'use client'

import { stagger, useAnimate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { EASE, REVEAL, STAGGER, VIEWPORT } from '@/lib/motion'

/**
 * Parent that lets its direct children float in one after another, 80 ms apart (MOTION.md „каскада“).
 * `onLoad` starts right away (hero) instead of on scroll. Hidden start is CSS-only
 * (.js [data-stagger] > *), so the content is visible without JavaScript.
 */
export function Stagger({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  onLoad = false,
  scale,
  lift = false,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
  delay?: number
  onLoad?: boolean
  /** start scale, e.g. 0.98 for the final call */
  scale?: number
  /** slide only, no fade: for hero text, so it counts as painted right away (LCP) */
  lift?: boolean
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, VIEWPORT)
  const reduce = useReducedMotion()
  const go = onLoad || inView

  useEffect(() => {
    if (!go || reduce || !scope.current) return
    animate(
      ':scope > *',
      { ...(lift ? {} : { opacity: [0, 1] }), y: [REVEAL.y, 0], ...(scale ? { scale: [scale, 1] } : {}) },
      { duration: REVEAL.duration, ease: EASE, delay: stagger(STAGGER, { startDelay: delay }) },
    )
  }, [go, reduce, animate, scope, delay, scale, lift])

  const El = Tag as 'div'
  return (
    <El ref={scope} data-stagger={lift ? 'lift' : ''} className={className}>
      {children}
    </El>
  )
}
