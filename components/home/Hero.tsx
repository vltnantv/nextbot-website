import Link from 'next/link'
import { WordReveal } from '@/components/motion/WordReveal'
import { LiveDot } from '@/components/brand/LiveDot'
import { CTA } from '@/lib/site-nav'
import { SETUP_DAYS } from '@/lib/prices'
import { HeroChat } from './HeroChat'
import { BTN, H1, LINK, TAG, TEXT, WRAP } from './refresh'

// DESIGN-REFRESH.md §4.1: left-aligned hero - title, one paragraph, one button + one link; the live NEO chat
// on the right; one line under both. Text is static (no fade) so it is painted at once (LCP).

export function Hero() {
  return (
    <section id="top" className="relative z-[1] pb-9 pt-10 min-[900px]:pb-16 min-[900px]:pt-16">
      <div className={`${WRAP} grid items-start gap-10 min-[960px]:grid-cols-12 min-[960px]:gap-12`}>
        <div className="flex min-w-0 flex-col gap-7 min-[960px]:col-span-6 min-[960px]:pt-6">
          <span className={`${TAG} inline-flex items-center gap-2`}>
            <LiveDot className="h-2 w-2" />
            На линия денем и нощем · на български
          </span>
          <WordReveal fast text="Всеки клиент получава отговор. Веднага." mutedFrom={4} className={H1} />
          <p className={`${TEXT} text-stone`}>
            NextBot отговаря на запитвания в сайта ви, записва клиентите и ви напомня кога да се обадите. Денем и нощем, на български.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={CTA.href} className={BTN}>
              {CTA.label}
            </Link>
            <Link href="/demo" className={`${LINK} text-[16px]`}>
              Пробвайте бота
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 min-[960px]:col-span-6">
          <span className={TAG}>Пример</span>
          <HeroChat />
        </div>

        <p className="m-0 border-t border-line pt-5 text-[15px] text-stone min-[960px]:col-span-12">
          Настройваме за {SETUP_DAYS} дни. Без годишен договор.
        </p>
      </div>
    </section>
  )
}
