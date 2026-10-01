'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BTN_PRIMARY } from '@/components/home/ui'
import { INPUT, LABEL } from './fields'

// ARIA waiting list (copy/aria-studio.md „Форма за списъка“): име, телефон или имейл, бизнес.
// Sent to /api/aria-waitlist. After sending: the sentence from the hero note („Ще ви пишем, когато е готов.“).
export function WaitlistForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setState('sending')
    try {
      const res = await fetch('/api/aria-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, contact: data.contact, business: data.business }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className="m-0 rounded-card border border-line bg-white p-7 font-display text-[22px] font-semibold">
        Ще ви пишем, когато е готов.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-7 shadow-soft sm:p-9">
      <label className={LABEL}>
        Име
        <input name="name" required autoComplete="name" className={INPUT} />
      </label>
      <label className={LABEL}>
        Телефон или имейл
        <input name="contact" required autoComplete="email" className={INPUT} />
      </label>
      <label className={LABEL}>
        Бизнес
        <input name="business" required autoComplete="organization" className={INPUT} />
      </label>
      <button type="submit" disabled={state === 'sending'} className={`${BTN_PRIMARY} btn-shine self-start px-[26px] py-[15px] text-[16px] disabled:opacity-60`}>
        Запишете ме
      </button>
      {/* error text is not in the copy - the shortest honest message */}
      {state === 'error' && (
        <p role="alert" className="m-0 text-[15px] text-[#9A3B2E]">
          Не успяхме да изпратим. Опитайте отново.
        </p>
      )}
      <p className="m-0 text-[14px] text-stone">
        Използваме данните само за да ви пишем за ARIA.{' '}
        <Link href="/poveritelnost" className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">
          Политика за поверителност
        </Link>
      </p>
    </form>
  )
}
