'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMounted } from './useMounted'

// From design/homepage-mockup.html: blur 90 px, opacity .75; drift is CSS (.blob-drift-*),
// the whole layer moves up 420 px over the full page scroll (parallax, mockup .nb-par).
const BLOBS = [
  { color: '#F1E4D3', size: 560, pos: { top: -120, right: -80 }, drift: 'blob-drift-1' },
  { color: '#E9EFE6', size: 480, pos: { top: 420, left: -160 }, drift: 'blob-drift-2' },
  { color: '#F6E9E1', size: 440, pos: { top: 2300, right: -120 }, drift: 'blob-drift-3' },
  { color: '#F1E4D3', size: 400, pos: { top: 3900, left: -100 }, drift: 'blob-drift-2' },
]

/** Decorative background layer behind the page content. Hidden from screen readers. */
export function Blobs() {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -420])
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={mounted && !reduce ? { y } : undefined}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${b.drift}`}
          style={{ width: b.size, height: b.size, background: b.color, filter: 'blur(90px)', opacity: 0.75, ...b.pos }}
        />
      ))}
    </motion.div>
  )
}
