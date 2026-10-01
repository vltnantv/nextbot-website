'use client'

import { useEffect, useState } from 'react'

/** False on the server and during hydration, true afterwards. Scroll-linked styles are applied only
 *  once mounted, so the server HTML never contains a hidden (opacity 0) start state. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
