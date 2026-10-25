import Link from 'next/link'
import { Stagger } from '@/components/motion/Stagger'
import { SectionHead } from './parts'
import { CARD, SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.8: four industry cards, each says which product does what there.

const ITEMS = [
  { who: 'Автокъщи и сервизи', does: 'CORE за екипа продавачи, NEO за въпросите за наличност и лизинг.', href: '/za/avtokashti' },
  { who: 'Клиники и салони', does: 'Записване на часове в чата, напомняне ден преди, отзив след това.', href: '/za/kliniki' },
  { who: 'Агенции за имоти', does: 'Квалифициране на купувачи и огледи, разпределени към брокерите.', href: '/za/imoti' },
  { who: 'Търговия и услуги', does: 'Онлайн магазин, вътрешна система за поръчки и склад, приложение за екипа.', href: '/razrabotka' },
]

export function Industries() {
  return (
    <section id="branshove" className={`${SECTION} bg-cream-deep`}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead tag="Браншове" title="Работим с фирми," muted="при които клиентът пише, пита и чака." />
        <Stagger className="grid gap-3 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`${CARD} group flex flex-col gap-2.5 p-[22px] text-ink no-underline transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-stone hover:text-ink motion-reduce:transition-none`}
            >
              <span className="text-[16px] font-bold">{it.who}</span>
              <span className="text-[15px] leading-[1.5] text-stone">{it.does}</span>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
