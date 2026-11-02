import { Logo } from '@/components/brand/Logo'

// Shown briefly while a page loads: the logo on the cream background, gently fading (still with reduced motion).
export default function Loading() {
  return (
    <div role="status" aria-label="Зареждане…" className="flex min-h-[60vh] items-center justify-center bg-cream">
      <Logo size={23} className="animate-pulse motion-reduce:animate-none" />
    </div>
  )
}
