'use client'

import { useEffect } from 'react'

/** Tells the safety net in app/layout.tsx that React is running, so animated content may stay hidden. */
export function HydrationMark() {
  useEffect(() => {
    ;(window as unknown as { __nbReady?: boolean }).__nbReady = true
  }, [])
  return null
}
