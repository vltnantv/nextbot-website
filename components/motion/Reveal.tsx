'use client'

import { useAnimate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Section floats in once when it scrolls into view: opacity 0→1, y 16→0, 600 ms ease-out (BRAND.md).
 * Always one plain element. The hidden start comes from CSS and applies only when JavaScript runs
 * (.js [data-reveal]), so without JS - and for search engines - the content is simply visible.
 * The animation uses explicit keyframes, so it never depends on reading the start value.
 * Reduced motion: no animation; CSS keeps the element visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li'
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !scope.current) return
    animate(scope.current, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, ease: 'easeOut', delay })
  }, [inView, reduce, animate, scope, delay])

  const El = Tag as 'div'
  return (
    <El ref={scope} data-reveal="" className={className}>
      {children}
    </El>
  )
}
