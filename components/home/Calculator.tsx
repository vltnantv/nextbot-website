'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Aura } from '@/components/motion/Aura'
import { Reveal } from '@/components/motion/Reveal'
import { PLANS } from '@/lib/prices'
import { SectionHead } from './parts'
import { CARD, SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.4 „Сметката“: four sliders and an honest answer - lost profit per month against the
// CORE + NEO price (from lib/prices.ts). When the numbers are small, it says so.

const fmt = (n: number) => Math.round(n).toLocaleString('bg-BG')
const bundle = PLANS.find((p) => p.id === 'bundle')!

type Slider = { key: 'q' | 'o' | 'l' | 'p'; label: string; note: string; min: number; max: number; step: number; unit: string }

const SLIDERS: Slider[] = [
  { key: 'q', label: 'Запитвания на месец', note: 'писма, чат, обаждания', min: 10, max: 400, step: 10, unit: '' },
  { key: 'o', label: 'Извън работно време', note: 'вечер, уикенд, обед', min: 0, max: 80, step: 5, unit: ' %' },
  { key: 'l', label: 'От тях не се връщат, ако никой не отговори', note: 'пишат на конкурента', min: 10, max: 90, step: 5, unit: ' %' },
  { key: 'p', label: 'Печалба от един клиент', note: 'средно', min: 20, max: 2000, step: 10, unit: ' €' },
]

export function Calculator() {
  const [v, setV] = useState({ q: 80, o: 45, l: 60, p: 150 })

  const clients = v.q * (v.o / 100) * (v.l / 100)
  const lost = clients * v.p
  const ratio = lost / bundle.monthly

  return (
    <section id="smetkata" className={`${SECTION} bg-cream-deep`}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          tag="Сметката"
          title="Колко ви струва запитване"
          muted="без отговор?"
          text="Преместете плъзгачите към вашия бизнес. Числата са приблизителни, но посоката рядко е изненада."
        />
        <Reveal soft className="grid items-stretch gap-3.5 min-[860px]:grid-cols-2">
          <div className={`${CARD} flex flex-col gap-[22px] p-5 sm:p-[30px]`}>
            {SLIDERS.map((s) => (
              <label key={s.key} className="flex flex-col gap-2 text-[15px] font-semibold">
                <span className="flex items-baseline justify-between gap-4">
                  <span>
                    {s.label}
                    <small className="block text-[13px] font-medium text-stone">{s.note}</small>
                  </span>
                  <b className="shrink-0 text-ink tabular-nums">
                    {fmt(v[s.key])}
                    {s.unit}
                  </b>
                </span>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={v[s.key]}
                  onChange={(e) => setV((old) => ({ ...old, [s.key]: Number(e.target.value) }))}
                  className="w-full accent-ink"
                />
              </label>
            ))}
          </div>

          <div className="relative flex flex-col justify-center gap-5 overflow-hidden rounded-[20px] bg-ink p-5 text-cream sm:p-[30px]" aria-live="polite">
            <Aura className="-top-[20%] left-[20%] h-[120%] w-[120%]" opacity={0.45} />
            <span className="relative text-[13px] font-semibold text-cream/65">Изгубени на месец</span>
            <span className="relative font-display text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
              {fmt(lost)} <small className="text-[16px] font-medium tracking-normal text-cream/65">€</small>
            </span>
            <p className="relative m-0 text-[15px] text-cream/70">
              {fmt(clients)} клиенти месечно пишат, когато никой не може да отговори, и не се връщат.
            </p>
            <div className="relative flex flex-col gap-1 border-t border-cream/20 pt-4 text-[15px]">
              <span>
                Планът {bundle.name} струва <b className="text-[20px] tabular-nums">{bundle.monthly} € / месец</b>
              </span>
              <span className="text-cream/70">
                {ratio >= 1.5
                  ? `${fmt(ratio)} пъти по-малко от изгубеното`
                  : ratio >= 0.8
                    ? 'приблизително колкото губите'
                    : 'при тези числа може би не ви трябваме. Кажете ни ги и ще сме честни.'}
              </span>
            </div>
            <Link
              href="/razgovor"
              className="relative inline-flex items-center justify-center self-start rounded-[10px] bg-cream px-6 py-3.5 text-[15px] font-semibold text-ink no-underline transition-transform duration-200 hover:-translate-y-px hover:text-ink motion-reduce:transition-none"
            >
              Да проверим вашите числа
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
