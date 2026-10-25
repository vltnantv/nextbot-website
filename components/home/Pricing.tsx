import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { DEV_OFFER_DAYS, GUARANTEE_DAYS } from '@/lib/prices'
import { PlanCards } from './PlanCards'
import { SectionHead } from './parts'
import { SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.9: the product plans (monthly / yearly), the development band under them and the guarantees.

export function Pricing() {
  return (
    <section id="ceni" className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          tag="Цени на продуктите"
          title="Месечно, без годишен договор."
          text="Еднократната настройка покрива обучението, свързването на каналите и въвеждането на екипа. Разработката по поръчка се остойностява след разговор."
        />
        <PlanCards />

        <Reveal soft className="grid items-center gap-5 rounded-[20px] bg-ink px-6 py-[26px] text-cream sm:px-7 min-[960px]:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h3 className="m-0 font-display text-[21px] font-semibold tracking-[-0.02em]">Разработка по поръчка</h3>
            <p className="m-0 mt-1.5 max-w-[52em] text-[15px] text-cream/70">
              Сайтове и магазини, вътрешни системи, мобилни приложения. След 15-минутен разговор получавате писмено предложение с обхват, срок и цена до{' '}
              {DEV_OFFER_DAYS} дни.
            </p>
          </div>
          <Link
            href="/razgovor"
            className="inline-flex items-center justify-center justify-self-start rounded-[10px] bg-cream px-6 py-3.5 text-[15px] font-semibold text-ink no-underline transition-transform duration-200 hover:-translate-y-px hover:text-ink motion-reduce:transition-none"
          >
            Поискайте предложение
          </Link>
        </Reveal>

        <p className="m-0 flex flex-wrap gap-x-7 gap-y-2.5 text-[15px] text-stone">
          <span>
            <b className="font-semibold text-ink">{GUARANTEE_DAYS} дни гаранция за продуктите.</b> Ако не ви пестят време, връщаме таксата за настройка.
          </span>
          <span>
            <b className="font-semibold text-ink">Спирате когато решите.</b> Данните остават ваши и ви ги даваме като файл.
          </span>
          <span>Цените са без ДДС.</span>
          <Link href="/ceni" className="font-medium text-ink underline decoration-[#D9D0C2] decoration-2 underline-offset-4 hover:decoration-ink">
            Всички цени
          </Link>
        </p>
      </div>
    </section>
  )
}
