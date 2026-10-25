import Link from 'next/link'
import type { DemoTab } from './parts'
import { SHADOW } from './refresh'

// Hero „рафт“ (REBUILD-PLAN.md §4.1): four tiles - two products that open the playground, two lines of
// development. Mini visuals are drawn in CSS; the data is made up.

const TILE = `group flex min-w-0 flex-col gap-2.5 rounded-[20px] border border-line bg-white p-4 text-ink no-underline transition-transform duration-200 hover:-translate-y-[3px] hover:text-ink motion-reduce:transition-none ${SHADOW}`

function Tile({ name, category, href, tab, more, children }: { name: string; category: string; href: string; tab?: DemoTab; more: string; children: React.ReactNode }) {
  const body = (
    <>
      <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-[12px]">
        <span className="whitespace-nowrap font-bold">{name}</span>
        <span className="font-medium text-stone">{category}</span>
      </span>
      {children}
      <span className="mt-auto text-[12px] font-semibold text-stone transition-colors group-hover:text-ink">{more} →</span>
    </>
  )
  return href.startsWith('#') ? (
    <a href={href} data-demo-tab={tab} className={TILE}>
      {body}
    </a>
  ) : (
    <Link href={href} className={TILE}>
      {body}
    </Link>
  )
}

const ROWS = [
  { n: 'Георги Илиев', i: 'Golf 8 · лизинг', s: 'Обади се', ink: true },
  { n: 'Мария Петрова', i: 'Час · 10:30', s: 'Записана' },
  { n: 'Стоян Димов', i: 'Оглед, събота', s: 'Оферта' },
]

export function Shelf() {
  return (
    <div className="relative z-[1] grid grid-cols-1 gap-3 min-[460px]:grid-cols-2" aria-label="Какво изграждаме">
      <Tile name="CORE" category="клиенти и продажби" href="#probvaite" tab="core" more="Пробвайте">
        <div className="overflow-hidden rounded-[10px] border border-line text-[11px]" aria-hidden="true">
          <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-1.5 bg-cream-deep px-2 py-[7px] text-[9.5px] font-bold uppercase tracking-[0.06em] text-stone">
            <span>Клиент</span>
            <span>Интерес</span>
            <span>Статус</span>
          </div>
          {ROWS.map((r) => (
            <div key={r.n} className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] items-center gap-1.5 whitespace-nowrap border-t border-line px-2 py-[7px]">
              <span className="truncate">{r.n}</span>
              <span className="truncate text-stone">{r.i}</span>
              <span className={`rounded-full px-[7px] py-0.5 text-[10px] font-bold ${r.ink ? 'bg-ink text-cream' : 'bg-cream-deep text-stone'}`}>{r.s}</span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile name="NEO" category="асистент за запитвания" href="#probvaite" tab="neo" more="Пробвайте">
        <div className="flex flex-col gap-1.5 text-[11.5px] leading-[1.35]" aria-hidden="true">
          <span className="max-w-[88%] self-start rounded-xl rounded-bl-[3px] bg-cream-deep px-2.5 py-[7px]">Здравейте! С какво мога да помогна?</span>
          <span className="max-w-[88%] self-end rounded-xl rounded-br-[3px] bg-ink px-2.5 py-[7px] text-cream">Има ли свободен час утре?</span>
          <span className="max-w-[88%] self-start rounded-xl rounded-bl-[3px] bg-cream-deep px-2.5 py-[7px]">Да, в 10:30 и 14:00. Кой ви е удобен?</span>
        </div>
      </Tile>

      <Tile name="Сайтове" category="и онлайн магазини" href="/razrabotka" more="Повече">
        <div className="flex flex-col gap-1.5" aria-hidden="true">
          <i className="block h-3.5 w-[70%] rounded bg-ink/85" />
          <i className="block h-[7px] w-[45%] rounded bg-cream-deep" />
          <i className="block h-[7px] w-full rounded bg-cream-deep" />
          <span className="grid grid-cols-3 gap-1.5">
            <i className="block h-[34px] rounded bg-cream-deep" />
            <i className="block h-[34px] rounded bg-cream-deep" />
            <i className="block h-[34px] rounded bg-cream-deep" />
          </span>
        </div>
      </Tile>

      <Tile name="По поръчка" category="системи и приложения" href="/razrabotka" more="Повече">
        <div className="grid grid-cols-4 gap-2" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className={`block aspect-square rounded-[9px] ${i === 1 ? 'bg-ink/85' : 'bg-cream-deep'}`} />
          ))}
        </div>
      </Tile>
    </div>
  )
}
