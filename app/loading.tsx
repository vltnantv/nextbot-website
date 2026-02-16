export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#09090b] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-indigo-500/5 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="w-8 h-8 rounded-full border border-white/[0.06] border-t-indigo-400/40 animate-spin" style={{ animationDuration: '0.8s' }} />
      </div>
    </div>
  )
}
