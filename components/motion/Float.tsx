'use client'

import { useAnimate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Endless gentle up-and-down float (mockup .nb-float*: 6 px, 6–7 s, ease-in-out).
 * `phase` starts the cycle part-way through (the mockup's negative animation-delay),
 * so neighbouring cards never move in step. Reduced motion: still.
 */
export function Float({
  children,
  className,
  distance = 6,
  duration = 6,
  phase = 0,
}: {
  children: React.ReactNode
  className?: string
  distance?: number
  duration?: number
  phase?: number
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !scope.current) return
    const controls = animate(
      scope.current,
      { y: [0, -distance, 0] },
      { duration, repeat: Infinity, ease: 'easeInOut' },
    )
    if (phase) controls.time = phase % duration
    return () => controls.stop()
  }, [reduce, animate, scope, distance, duration, phase])

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
