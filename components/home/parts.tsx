import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Arrow } from './Arrow'
import { CARD, H2, TAG, TEXT } from './refresh'

// Shared pieces of the company homepage (REBUILD-PLAN.md §4): section heading and the offer cards
// used by „Продукти“ and „Разработка по поръчка“.

/** Tag, h2 with an optional muted second half, one paragraph. */
export function SectionHead({ tag, title, muted, text }: { tag: string; title: string; muted?: string; text?: string }) {
  return (
    <Reveal soft className="flex max-w-[760px] flex-col gap-4">
      <span className={TAG}>{tag}</span>
      <h2 className={H2}>
        {title}
        {muted && <span className="text-stone"> {muted}</span>}
      </h2>
      {text && <p className={`${TEXT} text-stone`}>{text}</p>}
    </Reveal>
  )
}

export type DemoTab = 'neo' | 'core' | 'echo'

/** Link to a page, or to the playground with a tab (`data-demo-tab` is picked up by Playground). */
export function MoreLink({ label, href, tab, className = '' }: { label: string; href: string; tab?: DemoTab; className?: string }) {
  const cls = `group inline-flex items-center gap-2 text-[15px] font-semibold text-ink no-underline ${className}`
  if (href.startsWith('#')) {
    return (
      <a href={href} data-demo-tab={tab} className={cls}>
        {label} <Arrow />
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {label} <Arrow />
    </Link>
  )
}

export type Offer = {
  name: string
  category?: string
  title?: string
  text: string
  points: string[]
  /** e.g. „от 59 € / месец“ or „Цена след разговор“ */
  price: React.ReactNode
  link: { label: string; href: string; tab?: DemoTab }
}

/** Three white cards: name · category, title, text, dotted list, price + link at the bottom. */
export function OfferCards({ items }: { items: Offer[] }) {
  return (
    <Stagger className="grid gap-3.5 min-[960px]:grid-cols-3">
      {items.map((o) => (
        <article key={o.name} className={`${CARD} flex min-w-0 flex-col gap-3.5 px-6 py-[26px]`}>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="font-display text-[22px] font-semibold tracking-[-0.02em]">{o.name}</span>
            {o.category && <span className="text-[14px] font-medium text-stone">{o.category}</span>}
          </div>
          {o.title && <h3 className="m-0 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em]">{o.title}</h3>}
          <p className="m-0 text-[16px] leading-[1.55] text-stone">{o.text}</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px] text-stone">
            {o.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-ink/60" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
            <span className="text-[15px] font-semibold tabular-nums">{o.price}</span>
            <MoreLink {...o.link} />
          </div>
        </article>
      ))}
    </Stagger>
  )
}
