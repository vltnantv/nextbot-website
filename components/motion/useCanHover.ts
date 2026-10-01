'use client'

import { useEffect, useState } from 'react'
import { HOVER_QUERY } from '@/lib/motion'

/** True only on devices with a real mouse (hover: hover). Tilt and Magnetic use it. */
export function useCanHover() {
  const [can, setCan] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY)
    const update = () => setCan(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return can
}
