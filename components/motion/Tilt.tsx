'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

// Mockup .nb-tilt: perspective(900px) rotateX(3deg) rotateY(-3deg) translateY(-4px), .35 s ease-out curve
const HOVER = {
  rotateX: 3,
  rotateY: -3,
  y: -4,
  boxShadow: '0 1px 2px rgba(31,29,26,.04), 0 26px 50px rgba(31,29,26,.10)',
}
const TRANSITION = { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const }

/** Card that tilts slightly in 3D and lifts on hover (mouse only - touch devices do not get stuck in hover). */
export function Tilt({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const reduce = useReducedMotion()
  const cls = cn('group rounded-card', className)
  const props = reduce
    ? {}
    : { style: { transformPerspective: 900 }, whileHover: HOVER, transition: TRANSITION }
  if (href) {
    return (
      <MotionLink href={href} className={cls} {...props}>
        {children}
      </MotionLink>
    )
  }
  return (
    <motion.div className={cls} {...props}>
      {children}
    </motion.div>
  )
}
