'use client'

import Link from 'next/link'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-cream px-6 text-center text-ink">
      <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold leading-[1.12] tracking-[-0.02em]">
        Нещо се обърка.
      </h1>
      <p className="m-0 max-w-[480px] text-[17px] text-stone">
        Опитайте отново. Ако проблемът остане, пишете ни на info@nextbot.me.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-transform hover:-translate-y-px"
        >
          Опитайте отново
        </button>
        <Link href="/" className="rounded-full border border-[#D9D0C2] px-6 py-3.5 font-medium text-ink">
          Към началото
        </Link>
      </div>
    </main>
  )
}
