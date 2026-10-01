'use client'

import { useAnimate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { FLOAT } from '@/lib/motion'

/** Gentle up-and-down float, 6 px, 6–8 s, endless (MOTION.md). `phase` starts part-way through the cycle. */
export function Float({
  children,
  className,
  duration = FLOAT.minDuration,
  phase = 0,
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  phase?: number
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !scope.current) return
    const c = animate(scope.current, { y: [0, -FLOAT.distance, 0] }, { duration, repeat: Infinity, ease: 'easeInOut' })
    if (phase) c.time = phase % duration
    return () => c.stop()
  }, [reduce, animate, scope, duration, phase])

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
