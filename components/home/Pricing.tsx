import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { CTA } from '@/lib/site-nav'
import { GUARANTEE_DAYS, PLANS, eur } from '@/lib/prices'
import { BTN, BTN_LINE, H2, H3, SECTION, TAG, WRAP } from './refresh'

// DESIGN-REFRESH.md §4.8: three columns of different weight - „Растеж“ is wider with denser, darker text.
// No glow, no tilt, no pills. Prices from lib/prices.ts.

export function Pricing() {
  return (
    <section id="ceni" className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <Reveal soft className="flex flex-col gap-4">
          <span className={TAG}>Цени</span>
          <h2 className={H2}>Ясни цени, месечно, без годишен договор.</h2>
        </Reveal>

        <Reveal soft className="grid border-y border-line min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)]">
          {PLANS.map((plan, i) => {
            const main = !!plan.popular
            return (
              <div
                key={plan.id}
                className={`flex flex-col gap-5 py-8 min-[900px]:px-8 ${i > 0 ? 'border-t border-line min-[900px]:border-l min-[900px]:border-t-0' : ''} ${
                  main ? 'bg-white min-[900px]:py-10' : ''
                } ${i === 0 ? 'min-[900px]:pl-0' : ''} ${i === PLANS.length - 1 ? 'min-[900px]:pr-0' : ''} ${main ? 'px-6 min-[900px]:!px-10' : ''}`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className={H3}>{plan.name}</span>
                  {main && <span className="text-[13px] font-medium text-stone">Най-често избиран</span>}
                </span>
                <span className="flex items-baseline gap-1.5">
                  {plan.from && <span className="text-[15px] text-stone">от</span>}
                  <span className={`font-display font-semibold tracking-[-0.025em] ${main ? 'text-[52px]' : 'text-[40px]'}`}>{eur(plan.monthly)}</span>
                  <span className="text-[15px] text-stone">/ месец</span>
                </span>
                <span className="text-[15px] text-stone">Настройка {plan.setup === null ? 'по договаряне' : eur(plan.setup)}</span>
                <ul className={`m-0 flex list-none flex-col gap-2 p-0 text-[16px] ${main ? 'font-medium text-ink' : 'text-stone'}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="border-t border-line pt-2">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={CTA.href} className={`mt-auto self-start ${main ? BTN : BTN_LINE}`}>
                  {CTA.label}
                </Link>
              </div>
            )
          })}
        </Reveal>

        <p className="m-0 text-[15px] text-stone">
          Цените са без ДДС. Ако до {GUARANTEE_DAYS} дни не ви пести време, връщаме таксата за настройка.{' '}
          <Link href="/ceni" className="font-medium text-ink underline decoration-[#D9D0C2] decoration-2 underline-offset-4 hover:decoration-ink">
            Всички цени
          </Link>
        </p>
      </div>
    </section>
  )
}
