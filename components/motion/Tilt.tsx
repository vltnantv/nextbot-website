'use client'

import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SPRING, TILT } from '@/lib/motion'
import { useCanHover } from './useCanHover'

const MotionLink = motion.create(Link)
const SHADOW = '0 1px 2px rgba(31,29,26,.04), 0 26px 50px rgba(31,29,26,.10)'

/**
 * Card that tilts up to 4° toward the cursor and lifts 4 px, with a stronger shadow (MOTION.md).
 * Mouse only: on touch devices and with reduced motion it is a plain card.
 */
export function Tilt({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const px = useMotionValue(0) // -0.5 … 0.5 across the card
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT.maxDeg, TILT.maxDeg]), SPRING)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT.maxDeg, -TILT.maxDeg]), SPRING)
  const live = canHover && !reduce

  const cls = cn('group rounded-card', className)
  const props = live
    ? {
        style: { rotateX, rotateY, transformPerspective: 900 },
        whileHover: { y: -TILT.lift, boxShadow: SHADOW },
        transition: SPRING,
        onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width - 0.5)
          py.set((e.clientY - r.top) / r.height - 0.5)
        },
        onPointerLeave: () => {
          px.set(0)
          py.set(0)
        },
      }
    : {}

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
