'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Stagger } from '@/components/motion/Stagger'
import { CTA } from '@/lib/site-nav'
import { ANNUAL_FREE_MONTHS, CORE_EXTRA_SEAT, PLANS, eur, type Plan } from '@/lib/prices'
import { BTN, BTN_LINE, CARD } from './refresh'

// The three product plans with the monthly / yearly switch (REBUILD-PLAN.md §4.9). Used on the homepage
// and on /ceni. Every number from lib/prices.ts.

const ORDER: Plan['id'][] = ['core', 'bundle', 'neo']

function setupLine(p: Plan) {
  if (p.id === 'core') return `Настройка ${eur(p.setup)} · +${CORE_EXTRA_SEAT} €/месец за всеки следващ човек`
  if (p.onSite) return `Настройка ${eur(p.setup)} с посещение на място`
  return `Настройка ${eur(p.setup)} еднократно`
}

export function PlanCards() {
  const [yearly, setYearly] = useState(false)
  const plans = ORDER.map((id) => PLANS.find((p) => p.id === id)!)

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Плащане" className="inline-flex max-w-full flex-wrap gap-1 self-start rounded-[24px] border border-line bg-white p-1">
        {[
          { on: !yearly, label: 'Месечно', set: false },
          { on: yearly, label: `Годишно · ${ANNUAL_FREE_MONTHS} месеца подарък`, set: true },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            aria-pressed={b.on}
            onClick={() => setYearly(b.set)}
            className={`rounded-full px-[18px] py-2.5 text-[14px] font-semibold transition-colors ${b.on ? 'bg-ink text-cream' : 'text-stone hover:text-ink'}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <Stagger className="grid items-stretch gap-3.5 pt-3 min-[960px]:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`${CARD} relative flex min-w-0 flex-col gap-[18px] px-[26px] py-7 ${p.popular ? 'border-ink' : ''}`}>
            {p.popular && (
              <span className="absolute -top-[13px] left-[26px] rounded-full bg-ink px-3 py-[5px] text-[12px] font-semibold text-cream">Най-често избиран</span>
            )}
            <h3 className="m-0 font-display text-[21px] font-semibold tracking-[-0.02em]">{p.name}</h3>
            <p className="m-0 text-[15px] leading-[1.5] text-stone min-[960px]:min-h-[68px]">{p.forWhom}</p>
            <span className="flex flex-wrap items-baseline gap-x-1.5 tabular-nums">
              <b className="font-display text-[44px] font-semibold leading-none tracking-[-0.03em]">{yearly ? p.yearlyMonthly : p.monthly}</b>
              <span className="text-[14px] font-medium text-stone">
                € / месец{p.seats ? ` · до ${p.seats} души` : ''}
                {yearly ? ' · при годишно плащане' : ''}
              </span>
            </span>
            <span className="rounded-[10px] bg-cream-deep px-3.5 py-2.5 text-[14px] text-stone">{setupLine(p)}</span>
            <ul className="m-0 flex list-none flex-col gap-[9px] border-t border-line p-0 pt-[18px] text-[15px]">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-ink/60" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href={CTA.href} className={`mt-auto ${p.popular ? BTN : BTN_LINE}`}>
              {CTA.label}
            </Link>
          </div>
        ))}
      </Stagger>
    </div>
  )
}
