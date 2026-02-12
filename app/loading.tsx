export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nextbot-midnight">
      {/* Nextbot logo with pulse animation */}
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center animate-pulse rounded-2xl bg-gradient-to-br from-nextbot-cyan to-nextbot-ocean">
          <span className="text-3xl font-bold leading-none text-white">N</span>
        </div>
        <p className="text-sm text-white/60">Зареждане...</p>
      </div>
    </div>
  );
}
