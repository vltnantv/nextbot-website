import Link from 'next/link'
import { Aura } from '@/components/motion/Aura'
import { WordReveal } from '@/components/motion/WordReveal'
import { CTA } from '@/lib/site-nav'
import { Shelf } from './Shelf'
import { BTN, H1, LINK, TAG, TEXT, WRAP } from './refresh'

// REBUILD-PLAN.md §4.1: the company in one sentence, two buttons, and the „рафт“ with the aura behind it.
// Text is static (no fade) so it is painted at once (LCP).

export function CompanyHero() {
  return (
    <section id="top" className="relative z-[1] overflow-hidden pb-9 pt-10 min-[900px]:pb-16 min-[900px]:pt-16">
      <div className={`${WRAP} grid items-center gap-10 min-[960px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[960px]:gap-14`}>
        <div className="flex min-w-0 flex-col gap-7">
          <span className={TAG}>Софтуерна компания · София</span>
          <WordReveal fast text="Изграждаме софтуера, с който бизнесът ви работи всеки ден." mutedFrom={7} className={H1} />
          <p className={`${TEXT} text-stone`}>
            Готови продукти за клиенти, продажби и запитвания, които стартират за дни. И разработка по поръчка, когато нищо готово не ви пасва:
            сайтове, онлайн магазини, вътрешни системи и приложения.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#probvaite" className={BTN}>
              Пробвайте продуктите
            </a>
            <Link href={CTA.href} className={`${LINK} text-[16px]`}>
              {CTA.label}
            </Link>
          </div>
        </div>

        <div className="relative min-w-0">
          <Aura className="-left-[10%] -top-[10%] z-0 h-[120%] w-[120%]" opacity={0.85} />
          <Shelf />
        </div>

        <p className="m-0 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[15px] text-stone min-[960px]:col-span-2">
          <span>На български, с поддръжка от хора</span>
          <span>Без годишен договор за продуктите</span>
          <span>Данните са ваши, винаги</span>
        </p>
      </div>
    </section>
  )
}
