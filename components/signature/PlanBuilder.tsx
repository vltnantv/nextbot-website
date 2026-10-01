'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EASE } from '@/lib/motion'
import { PLANS, eur, type Plan } from '@/lib/prices'
import { CTA } from '@/lib/site-nav'
import { BTN_PRIMARY } from '@/components/home/ui'
import { saveNote } from '@/components/forms/note'

// /ceni signature (copy/UNIQUE.md „Калкулатор“): switches for channels, people in CORE, ECHO and ARIA.
// Shows which package fits and its price - every number from lib/prices.ts. The rules follow the package
// contents in copy/ceni-zanas-razgovor.md: Старт = сайт и 1 канал, до 2 души; Растеж = всички канали,
// до 10 души, ECHO; Про = ARIA, повече хора. „Запазете разговор“ carries the choice to /razgovor as a note.

type Channels = 'one' | 'all'
type People = 2 | 10 | 11

const plan = (id: Plan['id']) => PLANS.find((p) => p.id === id)!

function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[15px] font-medium">{label}</span>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => {
          const on = o.value === value
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] font-medium transition-colors ${
                on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function PlanBuilder() {
  const reduce = useReducedMotion()
  const [channels, setChannels] = useState<Channels>('one')
  const [people, setPeople] = useState<People>(2)
  const [echo, setEcho] = useState<'no' | 'yes'>('no')
  const [aria, setAria] = useState<'no' | 'yes'>('no')

  const fit = aria === 'yes' || people > 10 ? plan('pro') : echo === 'yes' || channels === 'all' || people > 2 ? plan('growth') : plan('start')

  const choice = [
    `Пакет: ${fit.name}`,
    channels === 'one' ? 'Сайт и 1 канал' : 'Всички канали',
    `CORE: ${people === 2 ? 'до 2 души' : people === 10 ? 'до 10 души' : 'повече'}`,
    echo === 'yes' ? 'ECHO' : null,
    aria === 'yes' ? 'ARIA' : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="grid gap-8 rounded-[28px] border border-line bg-white p-7 shadow-soft sm:p-10 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-6">
        <Choice
          label="Канали"
          value={channels}
          onChange={setChannels}
          options={[
            { value: 'one', label: 'Сайт и 1 канал' },
            { value: 'all', label: 'Всички канали' },
          ]}
        />
        <Choice
          label="Души в CORE"
          value={people}
          onChange={setPeople}
          options={[
            { value: 2, label: 'до 2' },
            { value: 10, label: 'до 10' },
            { value: 11, label: 'повече' },
          ]}
        />
        <Choice
          label="ECHO"
          value={echo}
          onChange={setEcho}
          options={[
            { value: 'no', label: 'Не' },
            { value: 'yes', label: 'Да' },
          ]}
        />
        <Choice
          label="ARIA"
          value={aria}
          onChange={setAria}
          options={[
            { value: 'no', label: 'Не' },
            { value: 'yes', label: 'Да' },
          ]}
        />
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-[20px] bg-cream-deep p-7" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={fit.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <span className="font-display text-[28px] font-semibold tracking-[-0.02em]">{fit.name}</span>
            <span className="flex items-baseline gap-1.5">
              {fit.from && <span className="text-[15px] text-stone">от</span>}
              <span className="font-display text-[44px] font-semibold tracking-[-0.02em]">{eur(fit.monthly)}</span>
              <span className="text-[15px] text-stone">/месец</span>
            </span>
            <span className="text-[15px] text-stone">настройка {fit.setup === null ? 'по договаряне' : eur(fit.setup)}</span>
          </motion.div>
        </AnimatePresence>
        <Link href={CTA.href} onClick={() => saveNote(choice)} className={`${BTN_PRIMARY} btn-shine self-start px-[26px] py-[15px] text-[16px]`}>
          {CTA.label}
        </Link>
      </div>
    </div>
  )
}
