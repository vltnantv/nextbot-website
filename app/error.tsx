'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nb-bg">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-nb-accent text-white font-semibold hover:bg-nb-accent-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
