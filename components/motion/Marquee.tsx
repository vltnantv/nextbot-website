import { MARQUEE_SECONDS } from '@/lib/motion'

/**
 * Slow strip that moves sideways (MOTION.md: 60 s, pauses on hover, still with reduced motion).
 * A plain CSS transform loop: it runs on the compositor, costs no JavaScript and starts on first paint.
 * Children are rendered twice for a seamless loop; the copy is hidden from screen readers.
 */
export function Marquee({ children, className = '', label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <section aria-label={label} className={`marquee-wrap overflow-hidden ${className}`}>
      <div className="marquee" style={{ animationDuration: `${MARQUEE_SECONDS}s` }}>
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </div>
    </section>
  )
}
