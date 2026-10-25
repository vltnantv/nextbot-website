import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Tilt } from '@/components/motion/Tilt'
import { PlanBuilder } from '@/components/signature/PlanBuilder'
import { PlanCards } from '@/components/home/PlanCards'
import { Arrow } from '@/components/home/Arrow'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, H } from '@/components/home/ui'
import { FaqList, ProductHero, Section } from '@/components/page/blocks'
import { CTA } from '@/lib/site-nav'
import { ANNUAL_FREE_MONTHS, DEV_OFFER_DAYS, ECHO_ADDON, GUARANTEE_DAYS, PILOT, PRO_FROM, STUDIO_FROM, WEB_OFFERS, eur } from '@/lib/prices'

// REBUILD-PLAN.md §5.2: the plan builder, the three plans (same cards as the homepage), the ECHO add-on, Про,
// sites and development. h1 and subtitle from copy/UNIQUE.md („Сглобете пакета“). Every number from lib/prices.ts.

export const metadata: Metadata = pageMeta({ title: 'Цени | NextBot', description: 'Цени на CORE, NEO и CORE + NEO, добавката ECHO, сайтове и разработка по поръчка. В евро, без ДДС.', path: '/ceni' })

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

      <Section id="paketi" title="Планове">
        <PlanCards />
        {/* Channels line: confirmed by Valentin, 01.10.2026 */}
        <p className="m-0 text-[15px] text-stone">Сега NEO работи в сайта. Другите канали са скоро.</p>
      </Section>

      <Section deep>
        <Stagger className="grid gap-5 min-[900px]:grid-cols-2 min-[1100px]:grid-cols-3">
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>ECHO · напомняния и отзиви</span>
            <p className="m-0 text-[16px] text-stone">
              Добавка към CORE или NEO: +{eur(ECHO_ADDON)} на месец. Включен е в CORE + NEO.
            </p>
            <Link href="/echo" className="group mt-auto text-[15px] font-medium text-ink">
              Повече за ECHO <Arrow />
            </Link>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Про</span>
            <p className="m-0 text-[16px] text-stone">
              От {eur(PRO_FROM)} на месец, по договаряне. Няколко обекта, ARIA гласов асистент (скоро), връзки с програмите, които вече ползвате.
            </p>
            <Link href={CTA.href} className="group mt-auto text-[15px] font-medium text-ink">
              {CTA.label} <Arrow />
            </Link>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Сайтове и онлайн магазини</span>
            <p className="m-0 text-[16px] text-stone">{web}.</p>
            <Link href="/izrabotka-na-sait" className="group mt-auto text-[15px] font-medium text-ink">
              Изработка на сайт <Arrow />
            </Link>
          </Tilt>
          <Tilt className={`${CARD} flex flex-col gap-3 p-7`}>
            <span className={`${H} text-[20px]`}>Разработка по поръчка</span>
            <p className="m-0 text-[16px] text-stone">
              Системи, приложения и сайтове по мярка. След 15-минутен разговор получавате писмено предложение с обхват, срок и цена до {DEV_OFFER_DAYS} дни.
              Системите започват от {eur(STUDIO_FROM)} на проект.
            </p>
            <Link href="/razrabotka" className="group mt-auto text-[15px] font-medium text-ink">
              Разработка по поръчка <Arrow />
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
              {GUARANTEE_DAYS} дни за продуктите: ако не ви пестят време, връщаме таксата за настройка. Без годишен договор; при годишно плащане {ANNUAL_FREE_MONTHS} месеца са подарък.
            </p>
          </Tilt>
        </Stagger>
      </Section>

      <Section title="Въпроси" narrow>
        <FaqList
          items={[
            { q: 'Има ли скрити такси?', a: 'Не. Настройката и месечната цена са тук. Допълнителното е записано в офертата.' },
            { q: 'Мога ли да сменя плана?', a: 'Да, по всяко време.' },
            // [ПОТВЪРДИ фирмата и данните] - not shown until confirmed:
            // { q: 'Плащате ли с фактура?', a: 'Издаваме фактура.' },
            { q: 'Какво става, ако спра?', a: 'Спирате с края на месеца. Получавате данните си като файл.' },
          ]}
        />
      </Section>
    </>
  )
}
