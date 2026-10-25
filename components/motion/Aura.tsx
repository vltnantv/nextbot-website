// The one coloured thing on the site (BRAND.md „Аура“): a soft warm glow with light bars, placed behind
// the interactive demos. Pure CSS (.nb-aura in app/globals.css), stops with prefers-reduced-motion.
export function Aura({ className = '', style, opacity = 0.85 }: { className?: string; style?: React.CSSProperties; opacity?: number }) {
  return <div aria-hidden="true" className={`nb-aura pointer-events-none absolute rounded-full ${className}`} style={{ opacity, ...style }} />
}
