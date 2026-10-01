'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EASE } from '@/lib/motion'
import { WEB_OFFERS, eur } from '@/lib/prices'

// WEB second element (copy/UNIQUE.md „Калкулатор на сайт“): pick a site type, add maintenance, see „от X €“.
// Every number comes from lib/prices.ts.

const SITES = WEB_OFFERS.filter((o) => o.from !== null)
const SUPPORT = WEB_OFFERS.find((o) => o.from === null && o.monthly)

export function WebCalc() {
  const reduce = useReducedMotion()
  const [site, setSite] = useState(SITES.find((o) => o.popular)?.name ?? SITES[0].name)
  const [support, setSupport] = useState(false)
  const chosen = SITES.find((o) => o.name === site) ?? SITES[0]

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-line bg-white p-7 shadow-soft sm:p-9">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Вид сайт">
        {SITES.map((o) => {
          const on = o.name === site
          return (
            <button
              key={o.name}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSite(o.name)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] font-medium transition-colors ${
                on ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {o.name}
            </button>
          )
        })}
      </div>

      {SUPPORT && (
        <label className="flex cursor-pointer items-center gap-3 text-[16px]">
          <input type="checkbox" checked={support} onChange={(e) => setSupport(e.target.checked)} className="h-5 w-5 accent-[#1F1D1A]" />
          <span>
            {SUPPORT.name} {eur(SUPPORT.monthly!)}/месец
          </span>
        </label>
      )}

      <div className="flex flex-wrap items-baseline gap-x-2 border-t border-line pt-6" aria-live="polite">
        <span className="text-[17px] text-stone">от</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={chosen.name}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="font-display text-[44px] font-semibold tracking-[-0.02em]"
          >
            {eur(chosen.from!)}
          </motion.span>
        </AnimatePresence>
        {support && SUPPORT && <span className="text-[17px] text-stone">+ {eur(SUPPORT.monthly!)}/месец</span>}
      </div>
      <p className="m-0 text-[15px] text-stone">Точната цена казваме на разговора.</p>
    </div>
  )
}
