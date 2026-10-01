'use client'

import { useAnimate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { EASE, REVEAL, VIEWPORT } from '@/lib/motion'

/**
 * Float-in once when scrolled into view (MOTION.md: opacity 0→1, y 24→0, 700 ms, once, margin -80px).
 * Same behaviour as `whileInView`, but the hidden start is CSS-only (.js [data-reveal]), so the server
 * HTML - and a browser without JavaScript - shows the content. Reduced motion: no animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  id,
  scale,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'header'
  id?: string
  /** start scale, e.g. 0.98 for the final call */
  scale?: number
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, VIEWPORT)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !scope.current) return
    animate(scope.current, { opacity: [0, 1], y: [REVEAL.y, 0], ...(scale ? { scale: [scale, 1] } : {}) }, { duration: REVEAL.duration, ease: EASE, delay })
  }, [inView, reduce, animate, scope, delay, scale])

  const El = Tag as 'div'
  return (
    <El ref={scope} id={id} data-reveal="" className={className}>
      {children}
    </El>
  )
}
