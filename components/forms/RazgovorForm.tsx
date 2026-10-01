'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BTN_PRIMARY } from '@/components/home/ui'
import { EASE } from '@/lib/motion'
import { CALL_DAYS, CALL_TIMES } from '@/lib/booking'
import { COMPANY, telHref } from '@/lib/company'
import { INPUT, LABEL } from './fields'
import { clearNote, takeNote } from './note'

// /razgovor signature + form (copy/UNIQUE.md „Часове“, copy/ceni-zanas-razgovor.md „Форма“).
// With CALL_TIMES set: the next working days, then the times of the chosen day; picking a time slides the form in.
// Without them: the form is shown at once with a free „Удобен час“ field.
// Fields: име, телефон, имейл (по желание), бизнес и бранш, удобен час, consent (not pre-ticked).

const WEEKDAY = new Intl.DateTimeFormat('bg-BG', { weekday: 'short' })
const DAY = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'numeric' })
const label = (d: Date) => `${WEEKDAY.format(d)} ${DAY.format(d)}`

function workingDays(n: number) {
  const out: Date[] = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
  }
  return out
}

export function RazgovorForm() {
  const reduce = useReducedMotion()
  const withSlots = CALL_TIMES.length > 0
  const [days, setDays] = useState<Date[]>([]) // after mount: dates depend on the visitor's clock
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null)
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  useEffect(() => {
    if (withSlots) {
      const list = workingDays(CALL_DAYS)
      setDays(list)
      setActiveDay(label(list[0]))
    }
    setNote(takeNote())
  }, [withSlots])

  const showForm = !withSlots || slot !== null

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setState('sending')
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email,
          company: f.business,
          preferredDate: slot?.day ?? '',
          preferredTime: slot?.time ?? f.time ?? '',
          message: f.note ?? '',
          consent: f.consent === 'on',
        }),
      })
      if (!res.ok) throw new Error()
      clearNote()
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className="m-0 rounded-[24px] border border-line bg-white p-8 font-display text-[24px] font-semibold leading-snug">
        Благодарим! Ще се обадим до един работен ден. Ако е спешно, наберете{' '}
        <a href={telHref(COMPANY.phone)} className="whitespace-nowrap text-ink underline decoration-line decoration-2 underline-offset-4">
          {COMPANY.phone}
        </a>
        .
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* days depend on the visitor's clock, so the picker appears after hydration; without JavaScript the
          page still offers „Друг начин“ (phone and Viber) */}
      {withSlots && days.length > 0 && (
        <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 shadow-soft sm:p-7">
          {/* 1. day */}
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Ден">
            {days.map((d) => {
              const day = label(d)
              const on = activeDay === day
              return (
                <button
                  key={day}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setActiveDay(day)}
                  className={`flex min-h-14 flex-col items-center justify-center rounded-[14px] border px-1 py-2 text-[14px] leading-tight transition-colors ${
                    on ? 'border-ink bg-ink text-cream' : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  <span className="font-medium">{WEEKDAY.format(d)}</span>
                  <span className={on ? 'text-cream/80' : 'text-stone'}>{DAY.format(d)}</span>
                </button>
              )
            })}
          </div>
          {/* 2. time on that day */}
          <div className="grid grid-cols-4 gap-2 min-[500px]:grid-cols-8" role="radiogroup" aria-label="Час">
            {CALL_TIMES.map((time) => {
              const on = slot?.day === activeDay && slot.time === time
              return (
                <button
                  key={time}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={!activeDay}
                  onClick={() => activeDay && setSlot({ day: activeDay, time })}
                  className={`min-h-11 rounded-full border text-[14px] font-medium tabular-nums transition-colors disabled:opacity-40 ${
                    on ? 'border-ink bg-ink text-cream' : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-7 shadow-soft sm:p-9"
          >
            {slot && (
              <p className="m-0 text-[16px]">
                Удобен час: <strong>{slot.day}, {slot.time}</strong>
              </p>
            )}
            <div className="grid gap-5 min-[700px]:grid-cols-2">
              <label className={LABEL}>
                Име
                <input name="name" required autoComplete="name" className={INPUT} />
              </label>
              <label className={LABEL}>
                Телефон
                <input name="phone" type="tel" required autoComplete="tel" className={INPUT} />
              </label>
              <label className={LABEL}>
                Имейл (по желание)
                <input name="email" type="email" autoComplete="email" className={INPUT} />
              </label>
              <label className={LABEL}>
                Бизнес и бранш
                <input name="business" required autoComplete="organization" className={INPUT} />
              </label>
              {!withSlots && (
                <label className={LABEL}>
                  Удобен час
                  <input name="time" className={INPUT} />
                </label>
              )}
            </div>
            {note && (
              <label className={LABEL}>
                Бележка
                <textarea name="note" defaultValue={note} rows={2} className={INPUT} />
              </label>
            )}
            <label className="flex items-start gap-3 text-[15px]">
              <input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[#1F1D1A]" />
              <span>
                Съгласен съм да се свържете с мен във връзка с този разговор.{' '}
                <Link href="/poveritelnost" className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">
                  Политика за поверителност
                </Link>
              </span>
            </label>
            <button type="submit" disabled={state === 'sending'} className={`${BTN_PRIMARY} btn-shine self-start px-[26px] py-[15px] text-[16px] disabled:opacity-60`}>
              Запазете разговор
            </button>
            {/* error text is not in the copy - the shortest honest message */}
            {state === 'error' && (
              <p role="alert" className="m-0 text-[15px] text-[#9A3B2E]">
                Не успяхме да изпратим. Опитайте отново.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
