'use client'

import { useAnimate, useReducedMotion } from 'framer-motion'
import { useLayoutEffect } from 'react'
import { EASE, PAGE } from '@/lib/motion'

// Page transition (MOTION.md): short fade and 12 px slide, 250 ms - only when moving between pages.
// The server always renders the page visible (no inline opacity), so it reads without JavaScript.
// In the browser the first page load is not animated; later navigations animate in before paint.
let clientNavigated = false

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const [scope, animate] = useAnimate<HTMLDivElement>()

  useLayoutEffect(() => {
    const animateIn = clientNavigated && !reduce
    clientNavigated = true
    if (animateIn && scope.current) {
      animate(scope.current, { opacity: [0, 1], y: [PAGE.y, 0] }, { duration: PAGE.duration, ease: EASE })
    }
    // run once per page (the template remounts on every navigation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={scope}>{children}</div>
}
