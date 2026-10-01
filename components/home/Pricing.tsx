import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Tilt } from '@/components/motion/Tilt'
import { CTA } from '@/lib/site-nav'
import { GUARANTEE_DAYS, PLANS, WEB_OFFERS, WEB_RULES, eur } from '@/lib/prices'
import { Arrow } from './Arrow'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, EYEBROW, H, H2, WRAP } from './ui'

const web = WEB_OFFERS.filter((o) => o.from !== null)
  .map((o) => `${o.name} от ${eur(o.from as number)}`)
  .join(' · ')

export function Pricing() {
  return (
    <section id="ceni" className="relative z-[1] bg-cream-deep py-[88px]">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <Reveal className="flex max-w-[720px] flex-col gap-3">
          <span className={EYEBROW}>Цени</span>
          <h2 className={H2}>Ясни цени, месечно, без годишен договор.</h2>
        </Reveal>

        <Stagger className="grid items-stretch gap-5 min-[900px]:grid-cols-3">
          {PLANS.map((plan) => (
            <Tilt
              key={plan.id}
              className={`flex flex-col gap-[18px] bg-white p-[30px] ${plan.popular ? 'edge-glow border-2 border-transparent' : 'border border-line'}`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className={`${H} text-[20px]`}>{plan.name}</span>
                {plan.popular && <span className="rounded-full bg-ink px-2.5 py-[3px] text-[12px] text-cream">Най-често избиран</span>}
              </span>
              <span className="flex items-baseline gap-1.5">
                {plan.from && <span className="text-[15px] text-stone">от</span>}
                <span className={`${H} text-[42px]`}>{eur(plan.monthly)}</span>
                <span className="text-[15px] text-stone">/ месец</span>
              </span>
              <span className="text-[14px] text-stone">
                Настройка {plan.setup === null ? 'по договаряне' : eur(plan.setup)}
              </span>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-[18px] text-[15px]">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                href={CTA.href}
                className={`mt-auto px-5 py-[13px] text-center ${plan.popular ? BTN_PRIMARY : BTN_SECONDARY}`}
              >
                {CTA.label}
              </Link>
            </Tilt>
          ))}
        </Stagger>

        <Reveal>
          <Tilt className={`${CARD} flex flex-wrap items-center justify-between gap-4 px-7 py-6`}>
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold">Нужен ви е и сайт?</span>
              <span className="text-[15px] text-stone">
                {web}. С {WEB_RULES.neoTrialMonths} месец NEO безплатно.
              </span>
            </span>
            <Link href="/izrabotka-na-sait" className="group text-[15px] font-medium text-ink">
              Изработка на сайт <Arrow />
            </Link>
          </Tilt>
        </Reveal>

        <p className="m-0 text-[14px] text-stone">
          Цените са без ДДС. Ако до {GUARANTEE_DAYS} дни не ви пести време, връщаме таксата за настройка.
        </p>
      </div>
    </section>
  )
}
