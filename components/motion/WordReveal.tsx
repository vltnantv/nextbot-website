'use client'

import { stagger, useAnimate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { EASE, WORDS, WORDS_FAST } from '@/lib/motion'

/**
 * Headline that appears word by word behind a mask (MOTION.md: y 100%→0, 60 ms between words).
 * Only for h1 and big h2s. Screen readers get the whole sentence; the words are visual only.
 * Without JavaScript the words are simply in place (hidden start only via .js [data-word]).
 */
export function WordReveal({
  text,
  as: Tag = 'h1',
  className,
  mutedFrom,
  delay = 0.1,
  fast = false,
}: {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  /** index of the first word shown in the muted colour (the homepage „Веднага.“) */
  mutedFrom?: number
  delay?: number
  /** DESIGN-REFRESH.md §6: shorter and quicker (homepage h1) */
  fast?: boolean
}) {
  const [scope, animate] = useAnimate<HTMLHeadingElement>()
  const reduce = useReducedMotion()
  const words = text.split(' ')

  useEffect(() => {
    if (reduce || !scope.current) return
    const w = fast ? WORDS_FAST : WORDS
    animate('[data-word]', { y: ['100%', '0%'] }, { duration: w.duration, ease: EASE, delay: stagger(w.stagger, { startDelay: delay }) })
  }, [reduce, animate, scope, delay, fast])

  return (
    <Tag ref={scope} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="mask-word">
            <span data-word="" className={`inline-block ${mutedFrom !== undefined && i >= mutedFrom ? 'text-stone' : ''}`}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
