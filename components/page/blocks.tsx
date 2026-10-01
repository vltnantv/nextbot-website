// Building blocks for product pages, in the homepage style (design/homepage-mockup.html).
// They only lay out text they are given - every word comes from copy/*.md.
import Link from 'next/link'
import { DrawLine } from '@/components/motion/DrawLine'
import { Reveal } from '@/components/motion/Reveal'
import { Tilt } from '@/components/motion/Tilt'
import { ZoomIn } from '@/components/motion/ZoomIn'
import { LiveDot } from '@/components/brand/LiveDot'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, EYEBROW, H, H2, WRAP } from '@/components/home/ui'

export type LinkProps = { label: string; href: string }

export function ProductHero({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  note,
  aside,
}: {
  eyebrow: string
  title: string
  text: string
  primary: LinkProps
  secondary?: LinkProps
  note?: string
  aside?: React.ReactNode
}) {
  return (
    <section className="relative z-[1] pb-20 pt-14">
      <div className={`${WRAP} grid items-center gap-10 ${aside ? 'min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:gap-14' : ''}`}>
        <div className="flex min-w-0 max-w-[760px] flex-col gap-6">
          <div className="fade-in inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-stone">
            <LiveDot className="h-2 w-2" />
            {eyebrow}
          </div>
          <h1 className={`${H} text-[clamp(38px,5vw,64px)] leading-[1.04]`}>{title}</h1>
          <p className="fade-in m-0 max-w-[600px] text-[19px] text-stone" style={{ animationDelay: '.15s' }}>
            {text}
          </p>
          <div className="fade-in flex flex-wrap items-center gap-3" style={{ animationDelay: '.3s' }}>
            <Link href={primary.href} className={`${BTN_PRIMARY} btn-shine px-[26px] py-[15px] text-[16px]`}>
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className={`${BTN_SECONDARY} px-6 py-3.5 text-[16px]`}>
                {secondary.label}
              </Link>
            )}
          </div>
          {note && <p className="m-0 text-[14px] text-stone">{note}</p>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  )
}

/** Section with a heading; `deep` alternates the background like the homepage. */
export function Section({
  id,
  title,
  deep,
  narrow,
  children,
}: {
  id?: string
  title: string
  deep?: boolean
  narrow?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`relative z-[1] py-[88px] ${deep ? 'bg-cream-deep' : ''}`}>
      <div className={`${narrow ? 'mx-auto w-full max-w-[860px] px-6' : WRAP} flex flex-col gap-10`}>
        <Reveal>
          <h2 className={H2}>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export type CardItem = { title: string; text: string }

/** Cards: bold title + text, as „**Заглавие.** Текст“ in the copy. */
export function Cards({ items, cols = 3 }: { items: CardItem[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? 'min-[900px]:grid-cols-2 min-[1100px]:grid-cols-4' : cols === 2 ? 'min-[900px]:grid-cols-2' : 'min-[900px]:grid-cols-3'
  return (
    <Reveal className={`grid gap-5 ${grid}`}>
      {items.map((c) => (
        <Tilt key={c.title} className={`${CARD} flex flex-col gap-2.5 p-7`}>
          <span className={`${H} text-[20px]`}>{c.title}</span>
          <p className="m-0 text-[17px] text-stone">{c.text}</p>
        </Tilt>
      ))}
    </Reveal>
  )
}

/** Numbered steps with the line that draws itself (like „Как започваме“). */
export function Steps({ items }: { items: CardItem[] }) {
  const grid = items.length === 4 ? 'min-[900px]:grid-cols-2 min-[1100px]:grid-cols-4' : 'min-[900px]:grid-cols-3'
  return (
    <Reveal>
      <ol className={`m-0 grid list-none gap-6 p-0 ${grid}`}>
        {items.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2.5">
            <DrawLine />
            <span className={`${H} text-[15px] text-online-text`}>{i + 1}</span>
            <span className={`${H} text-[22px]`}>{s.title}</span>
            <span className="text-stone">{s.text}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

export type FaqItem = { q: string; a: React.ReactNode }

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Reveal className="flex flex-col border-t border-line">
      {items.map(({ q, a }) => (
        <details key={q} className="group border-b border-line py-5">
          <summary className="flex cursor-pointer list-none justify-between gap-4 text-[18px] font-medium [&::-webkit-details-marker]:hidden">
            {q}
            <span aria-hidden="true" className="text-[22px] leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
              +
            </span>
          </summary>
          <p className="mb-0 mt-3 text-stone">{a}</p>
        </details>
      ))}
    </Reveal>
  )
}

/** Closing dark block that grows into place (like the homepage final call). */
export function EndBlock({ title, text, primary, secondary }: { title: string; text?: string; primary: LinkProps; secondary?: LinkProps }) {
  return (
    <section className="relative z-[1] pb-24 pt-8">
      <div className={WRAP}>
        <ZoomIn className="relative flex flex-col items-center gap-[22px] overflow-hidden bg-ink px-6 py-16 text-center text-cream sm:px-12">
          <div aria-hidden="true" className="blob-drift-2 pointer-events-none absolute -right-[60px] -top-[140px] h-80 w-80 rounded-full bg-[#3A352E] opacity-80 blur-[90px]" />
          <h2 className={`${H} relative max-w-[760px] text-[clamp(30px,4vw,50px)] leading-[1.1]`}>{title}</h2>
          {text && <p className="relative m-0 max-w-[620px] text-[18px] text-[#D9D0C2]">{text}</p>}
          <div className="relative flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="inline-flex items-center rounded-full bg-cream px-7 py-[15px] font-medium text-ink no-underline transition-transform duration-200 hover:-translate-y-px hover:text-ink motion-reduce:transition-none">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="inline-flex items-center rounded-full border border-[#4A443C] px-6 py-3.5 font-medium text-cream no-underline transition-transform duration-200 hover:-translate-y-px hover:text-cream motion-reduce:transition-none">
                {secondary.label}
              </Link>
            )}
          </div>
        </ZoomIn>
      </div>
    </section>
  )
}

/** Inline text link with ink underline, for links inside copy text. */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">
      {children}
    </Link>
  )
}
