import { LiveDot } from '@/components/brand/LiveDot'

// Shown briefly while a page loads: the breathing "online" dot on the cream background.
export default function Loading() {
  return (
    <div role="status" aria-label="Зареждане…" className="flex min-h-[60vh] items-center justify-center bg-cream">
      <LiveDot className="h-3 w-3" />
    </div>
  )
}
