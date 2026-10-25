'use client'

import { useEffect, useRef, useState } from 'react'

// REBUILD-PLAN.md §4.3 „Таб ECHO“: a form on the left, the client's phone on the right. The message updates
// as you type; „Изпрати тестово“ only plays the delivery - nothing is sent anywhere.

type Kind = 'rem' | 'rev'
type Phase = 'idle' | 'sending' | 'sent'

const FIELD = 'w-full min-w-0 rounded-[10px] border border-line bg-white px-3 py-2.5 text-[15px] font-medium text-ink'
const LABEL = 'flex min-w-0 flex-col gap-1.5 text-[13px] font-semibold text-stone'

function message(kind: Kind, name: string, service: string, time: string) {
  const first = name.trim().split(/\s+/)[0] || 'клиент'
  const svc = service.trim() || 'преглед'
  if (kind === 'rev') {
    return `Здравейте, ${first}! Благодарим, че бяхте при нас за ${svc}. Ако сте доволни, ще се радваме на отзив в Google: g.page/usmivka. Отнема 30 секунди и ни помага много. Екипът на „Усмивка“`
  }
  return `Здравейте, ${first}! Напомняме за вашия час за ${svc} утре в ${time || '10:30'} в клиника „Усмивка“, ул. „Шипка“ 14. Ако не можете, отговорете с „не“ и ще ви предложим друг час. До утре!`
}

/** State of the ECHO demo; returns the form (left side of the stage) and the phone (right side). */
export function useEchoDemo() {
  const [name, setName] = useState('Мария Петрова')
  const [service, setService] = useState('почистване на зъби')
  const [time, setTime] = useState('10:30')
  const [channel, setChannel] = useState<'Viber' | 'SMS'>('Viber')
  const [kind, setKind] = useState<Kind>('rem')
  const [phase, setPhase] = useState<Phase>('idle')
  const [delivered, setDelivered] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // a new message is not delivered yet
  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v)
    setDelivered(false)
  }

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle') return
    setPhase('sending')
    setDelivered(false)
    timers.current.push(
      window.setTimeout(() => {
        setPhase('sent')
        setDelivered(true)
      }, 900),
      window.setTimeout(() => setPhase('idle'), 3200),
    )
  }

  return {
    form: (
      <form onSubmit={send} className="flex flex-col gap-3">
        <label className={LABEL}>
          Клиент
          <input className={FIELD} value={name} onChange={(e) => edit(setName)(e.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={LABEL}>
            Услуга
            <input className={FIELD} value={service} onChange={(e) => edit(setService)(e.target.value)} />
          </label>
          <label className={LABEL}>
            Час
            <input className={FIELD} type="time" value={time} onChange={(e) => edit(setTime)(e.target.value)} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className={LABEL}>
            Канал
            <select className={FIELD} value={channel} onChange={(e) => edit(setChannel)(e.target.value as 'Viber' | 'SMS')}>
              <option>Viber</option>
              <option>SMS</option>
            </select>
          </label>
          <label className={LABEL}>
            Тип
            <select className={FIELD} value={kind} onChange={(e) => edit(setKind)(e.target.value as Kind)}>
              <option value="rem">Напомняне ден преди</option>
              <option value="rev">Молба за отзив след това</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={phase !== 'idle'}
          className="mt-1 inline-flex items-center justify-center self-start rounded-[10px] bg-ink px-4 py-2.5 text-[14px] font-semibold text-cream transition-transform duration-200 hover:-translate-y-px disabled:opacity-80 motion-reduce:transition-none"
        >
          {phase === 'sending' ? 'Изпраща се…' : phase === 'sent' ? 'Изпратено ✓' : 'Изпрати тестово'}
        </button>
      </form>
    ),
    phone: (
      <div aria-label="Телефон на клиента" className="mx-auto grid aspect-[9/16.5] w-full max-w-[300px] rounded-[34px] bg-ink p-3.5">
        <div className="flex h-full flex-col gap-2.5 overflow-hidden rounded-[24px] bg-cream px-3.5 py-4">
          <span className="text-center text-[11px] font-semibold text-stone">утре · 09:00</span>
          <span className="text-[12px] font-bold">Дентална клиника „Усмивка“ · {channel}</span>
          <p aria-live="polite" className="m-0 rounded-2xl rounded-tl-[4px] border border-line bg-white px-3 py-2.5 text-[13px] leading-[1.4]">
            {message(kind, name, service, time)}
          </p>
          <span className={`self-end text-[11px] font-semibold text-stone transition-opacity duration-300 ${delivered ? 'opacity-100' : 'opacity-0'}`}>
            доставено ✓
          </span>
        </div>
      </div>
    ),
  }
}
