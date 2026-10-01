'use client'

import { useAnimate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

/**
 * One-time entrance on page load (mockup .nb-in…: opacity 0→1, y 12→0, 0.7 s ease-out),
 * used for chat bubbles that arrive one after another via `delay`.
 * Visible without JavaScript: the hidden start is CSS-only (.js [data-appear]). Reduced motion: no animation.
 */
export function Appear({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !scope.current) return
    const c = animate(scope.current, { opacity: [0, 1], y: [12, 0] }, { duration: 0.7, ease: 'easeOut', delay })
    return () => c.stop()
  }, [reduce, animate, scope, delay])

  return (
    <div ref={scope} data-appear="" className={className}>
      {children}
    </div>
  )
}
