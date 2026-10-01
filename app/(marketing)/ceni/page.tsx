import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Tilt } from '@/components/motion/Tilt'
import { PlanBuilder } from '@/components/signature/PlanBuilder'
import { Arrow } from '@/components/home/Arrow'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, H } from '@/components/home/ui'
import { FaqList, ProductHero, Section } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'
import { ANNUAL_FREE_MONTHS, GUARANTEE_DAYS, PILOT, PLANS, STUDIO_FROM, WEB_OFFERS, eur, type Plan } from '@/lib/prices'

// Text: copy/ceni-zanas-razgovor.md (/ceni) - word for word; h1 and subtitle from copy/UNIQUE.md
// („Сглобете пакета“). Every price and number is read from lib/prices.ts.

export const metadata: Metadata = {
  title: 'Цени',
  description: 'Три пакета за чат асистент и клиентска система, цени за сайтове и изработка по поръчка. В евро, без ДДС.',
}

// Package contents as written in the copy (the wording differs from the homepage cards on purpose).
const CONTENTS: Record<Plan['id'], string> = {
  start: 'NEO в сайта и 1 канал, CORE до 2 души, месечен отчет.',
  growth: 'NEO по всички канали, CORE до 10 души, ECHO, седмичен отчет.',
  pro: 'Всичко от Растеж + ARIA, връзки с други програми, няколко обекта.',
}

const web = WEB_OFFERS.map((o) => (o.from !== null ? `${o.name} от ${eur(o.from)}` : `${o.name} ${eur(o.monthly!)}/месец`)).join(' · ')

export default function PricesPage() {
  return (
    <>
      <ProductHero
        // (copy h1 was: Ясни цени. Без годишен договор.)
        title="Сглобете пакета си."
        lead="Вижте точно колко е. Без изненади."
        text="Всички цени са в евро, без ДДС. Плащате месечно и можете да спрете по всяко време."
      />

      {/* Signature (copy/UNIQUE.md „Калкулатор“) - this page has no „Как започваме“ / „Какво прави“ block */}
      <Section deep>
        <Reveal>
          <PlanBuilder />
        </Reveal>
      </Section>

      <Section id="paketi" title="Пакети">
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
                <span className="text-[15px] text-stone">/месец</span>
              </span>
              <span className="text-[14px] text-stone">настройка {plan.setup === null ? 'по договаряне' : eur(plan.setup)}</span>
              <p className="m-0 text-[16px]">{CONTENTS[plan.id]}</p>
              <Link href={CTA.href} className={`mt-auto px-5 py-[13px] text-center ${plan.popular ? BTN_PRIMARY : BTN_SECONDARY}`}>
                {CTA.label}
              </Link>
            </Tilt>
          ))}
        </Stagger>
        {/* Channels line: confirmed by Valentin, 01.10.2026 */}
        <p className="m-0 text-[15px] text-stone">Сега NEO работи в сайта. Viber, Messenger, WhatsApp и Instagram са „скоро“.</p>
      </Section>

      <Section deep>
        <Stagger className="grid gap-5 min-[900px]:grid-cols-2">
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Сайтове (WEB)</span>
            <p className="m-0 text-[16px] text-stone">{web}.</p>
            <Link href="/izrabotka-na-sait" className="group mt-auto text-[15px] font-medium text-ink">
              Изработка на сайт <Arrow />
            </Link>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>STUDIO</span>
            <p className="m-0 text-[16px] text-stone">От {eur(STUDIO_FROM)} на проект.</p>
            <Link href="/studio" className="group mt-auto text-[15px] font-medium text-ink">
              STUDIO <Arrow />
            </Link>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Пилотна програма</span>
            <p className="m-0 text-[16px] text-stone">
              Търсим първите {PILOT.total} бизнеса. Настройка на половин цена срещу честен отзив.
              {PILOT.spotsLeft !== null && <> Свободни места: {PILOT.spotsLeft}</>}
            </p>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Гаранция</span>
            <p className="m-0 text-[16px] text-stone">
              Ако до {GUARANTEE_DAYS} дни не ви пести време, връщаме таксата за настройка. При годишно плащане: {ANNUAL_FREE_MONTHS} месеца
              безплатно.
            </p>
          </Tilt>
        </Stagger>
      </Section>

      <Section title="Въпроси" narrow>
        <FaqList
          items={[
            { q: 'Има ли скрити такси?', a: 'Не. Настройката и месечната цена са тук. Допълнителното е записано в офертата.' },
            { q: 'Мога ли да сменя пакета?', a: 'Да, по всяко време.' },
            // [ПОТВЪРДИ фирмата и данните] - not shown until confirmed:
            // { q: 'Плащате ли с фактура?', a: 'Издаваме фактура.' },
            { q: 'Какво става, ако спра?', a: 'Спирате с края на месеца. Данните ви се експортират.' },
          ]}
        />
      </Section>
    </>
  )
}
