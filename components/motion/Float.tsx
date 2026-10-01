'use client'

import { useAnimate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Gentle up-and-down float for chat bubbles (BRAND.md: 4–6 px, 5–7 s, different delays).
 * `appear` fades the bubble in first, so bubbles arrive one after another.
 * Plain element: visible without JavaScript (hidden start only via .js [data-appear]).
 * Reduced motion: no movement, CSS keeps it visible.
 */
export function Float({
  children,
  className,
  distance = 5,
  duration = 6,
  delay = 0,
  appear = true,
}: {
  children: React.ReactNode
  className?: string
  distance?: number
  duration?: number
  delay?: number
  appear?: boolean
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !scope.current) return
    const el = scope.current
    const controls = [
      animate(el, { opacity: appear ? [0, 1] : 1 }, { duration: 0.5, delay, ease: 'easeOut' }),
      animate(el, { y: [0, -distance, 0] }, { duration, delay: delay + 0.5, repeat: Infinity, ease: 'easeInOut' }),
    ]
    return () => controls.forEach((c) => c.stop())
  }, [reduce, animate, scope, appear, delay, distance, duration])

  return (
    <div ref={scope} data-appear={appear ? '' : undefined} className={className}>
      {children}
    </div>
  )
}
