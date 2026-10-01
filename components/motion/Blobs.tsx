'use client'

import { motion, useReducedMotion } from 'framer-motion'

// BRAND.md: 2–3 large blurred blobs in warm tones, drifting slowly (20–30 s, ease-in-out, endless).
const BLOBS = [
  { color: '#F1E4D3', size: 520, top: '-8%', left: '-6%', x: 60, y: 40, duration: 26 },
  { color: '#E9EFE6', size: 460, top: '30%', left: '62%', x: -50, y: 50, duration: 22 },
  { color: '#F6E9E1', size: 420, top: '68%', left: '8%', x: 40, y: -45, duration: 29 },
]

/** Decorative background behind the marketing pages. Hidden from screen readers. */
export function Blobs() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((b) => (
        <motion.div
          key={b.color}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            filter: 'blur(100px)',
            opacity: 0.9,
          }}
          animate={reduce ? undefined : { x: [0, b.x, 0], y: [0, b.y, 0] }}
          transition={reduce ? undefined : { duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
