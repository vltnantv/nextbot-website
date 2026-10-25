import { LogoMark } from '@/components/brand/LogoMark'

// Shown briefly while a page loads: the NextBot mark, softly pulsing, on the cream background.
export default function Loading() {
  return (
    <div role="status" aria-label="Зареждане…" className="flex min-h-[60vh] items-center justify-center bg-cream text-ink">
      <LogoMark size={28} className="animate-pulse motion-reduce:animate-none" />
    </div>
  )
}
