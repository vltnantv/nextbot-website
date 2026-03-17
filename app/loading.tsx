export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-nb-cream flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-nb-gold/5 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="w-8 h-8 rounded-full border border-nb-border border-t-nb-gold/40 animate-spin" style={{ animationDuration: '0.8s' }} />
      </div>
    </div>
  )
}
