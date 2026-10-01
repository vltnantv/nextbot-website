'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BLOBS as B } from '@/lib/motion'
import { useMounted } from './useMounted'

// MOTION.md: 3 blurred blobs (80–120 px) in warm tones, drifting 20–30 s (CSS .blob-drift-*),
// fixed behind the content, moving a little with the scroll (parallax 40–80 px), will-change: transform.
const BLOBS = [
  { color: '#F1E4D3', size: 560, blur: 110, pos: { top: '-12%', right: '-8%' }, drift: 'blob-drift-1', parallax: B.parallax[1] },
  { color: '#E9EFE6', size: 480, blur: 100, pos: { top: '38%', left: '-14%' }, drift: 'blob-drift-2', parallax: B.parallax[0] },
  { color: '#F6E9E1', size: 440, blur: 90, pos: { bottom: '-14%', right: '-6%' }, drift: 'blob-drift-3', parallax: (B.parallax[0] + B.parallax[1]) / 2 },
]

function Blob({ b }: { b: (typeof BLOBS)[number] }) {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -b.parallax])
  return (
    <motion.div className="absolute will-change-transform" style={{ ...b.pos, ...(mounted && !reduce ? { y } : {}) }}>
      <div
        className={`rounded-full will-change-transform ${b.drift}`}
        style={{ width: b.size, height: b.size, background: b.color, filter: `blur(${b.blur}px)`, opacity: 0.75 }}
      />
    </motion.div>
  )
}

/** Decorative background, fixed behind every marketing page. Hidden from screen readers. */
export function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((b) => (
        <Blob key={b.color} b={b} />
      ))}
    </div>
  )
}
