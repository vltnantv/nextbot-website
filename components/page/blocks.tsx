// Building blocks for product pages, in the homepage style (design/homepage-mockup.html).
// They only lay out text they are given - every word comes from copy/*.md.
import Link from 'next/link'
import { Accordion } from '@/components/motion/Accordion'
import { DrawLine } from '@/components/motion/DrawLine'
import { Float } from '@/components/motion/Float'
import { Magnetic } from '@/components/motion/Magnetic'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Tilt } from '@/components/motion/Tilt'
import { Typing, type ChatLine } from '@/components/motion/Typing'
import { WordReveal } from '@/components/motion/WordReveal'
import { FINAL_SCALE } from '@/lib/motion'
import { LiveDot } from '@/components/brand/LiveDot'
import { BTN_PRIMARY, BTN_SECONDARY, CARD, EYEBROW, H, H2, WRAP } from '@/components/home/ui'

export type LinkProps = { label: string; href: string }

export function ProductHero({
  eyebrow,
  title,
  lead,
  text,
  primary,
  secondary,
  note,
  aside,
}: {
  eyebrow?: string
  title: string
  /** subtitle under the h1 (copy/UNIQUE.md „Подзаглавие“), before the descriptive text */
  lead?: string
  text: string
  primary?: LinkProps
  secondary?: LinkProps
  note?: string
  aside?: React.ReactNode
}) {
  return (
    <section className="relative z-[1] pb-20 pt-14">
      <div className={`${WRAP} grid items-center gap-10 ${aside ? 'min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:gap-14' : ''}`}>
        <div className="flex min-w-0 max-w-[760px] flex-col gap-6">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-stone">
              <LiveDot className="h-2 w-2" />
              {eyebrow}
            </div>
          )}
          <WordReveal text={title} className={`${H} text-[clamp(38px,5vw,64px)] leading-[1.04]`} />
          {/* text and buttons follow the headline in a cascade (MOTION.md, hero) */}
          <Stagger onLoad lift delay={0.45} className="flex flex-col gap-6">
          {lead && <p className="m-0 max-w-[600px] font-display text-[22px] font-medium leading-snug">{lead}</p>}
          <p className="m-0 max-w-[600px] text-[19px] text-stone">{text}</p>
          {(primary || secondary) && (
          <div className="flex flex-wrap items-center gap-3">
            {primary && (
              <Magnetic>
                <Link href={primary.href} className={`${BTN_PRIMARY} btn-shine px-[26px] py-[15px] text-[16px]`}>
                  {primary.label}
                </Link>
              </Magnetic>
            )}
            {secondary && (
              <Link href={secondary.href} className={`${BTN_SECONDARY} px-6 py-3.5 text-[16px]`}>
                {secondary.label}
              </Link>
            )}
          </div>
          )}
          {note && <p className="m-0 text-[14px] text-stone">{note}</p>}
          </Stagger>
        </div>
        {aside && (
          <Reveal delay={0.7} className="min-w-0">
            {aside}
          </Reveal>
        )}
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
  /** optional: some copy sections have no visible heading (e.g. a form) */
  title?: string
  deep?: boolean
  narrow?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`relative z-[1] py-[88px] ${deep ? 'bg-cream-deep' : ''}`}>
      <div className={`${narrow ? 'mx-auto w-full max-w-[860px] px-6' : WRAP} flex flex-col gap-10`}>
        {title && (
          <Reveal>
            <h2 className={H2}>{title}</h2>
          </Reveal>
        )}
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
    <Stagger className={`grid gap-5 ${grid}`}>
      {items.map((c) => (
        <Tilt key={c.title} className={`${CARD} flex flex-col gap-2.5 p-7`}>
          <span className={`${H} text-[20px]`}>{c.title}</span>
          <p className="m-0 text-[17px] text-stone">{c.text}</p>
        </Tilt>
      ))}
    </Stagger>
  )
}

/** Numbered steps with the line that draws itself (like „Как започваме“). */
export function Steps({ items }: { items: CardItem[] }) {
  const grid = items.length === 4 ? 'min-[900px]:grid-cols-2 min-[1100px]:grid-cols-4' : 'min-[900px]:grid-cols-3'
  return (
    // numbers appear in order, each line draws after the previous one
    <Stagger as="ol" className={`m-0 grid list-none gap-6 p-0 ${grid}`}>
        {items.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2.5">
            <DrawLine className="h-3 w-full" delay={i * 0.35} />
            <span className={`${H} text-[15px] text-online-text`}>{i + 1}</span>
            <span className={`${H} text-[22px]`}>{s.title}</span>
            <span className="text-stone">{s.text}</span>
          </li>
        ))}
    </Stagger>
  )
}

/** Plain lines with an ink rule on the left (problem lists, examples) - „три реда, без карти“. */
export function Lines({ items }: { items: string[] }) {
  return (
    <Stagger as="ul" className="m-0 flex list-none flex-col gap-4 p-0">
      {items.map((line) => (
        <li key={line} className="border-l-2 border-ink/80 pl-5 text-[20px] leading-snug">
          {line}
        </li>
      ))}
    </Stagger>
  )
}

/** Numbered points as cards; text may contain a bold product name (e.g. „**NEO** отговаря…“). */
export function Points({ items, cols = 3 }: { items: React.ReactNode[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? 'min-[900px]:grid-cols-2 min-[1100px]:grid-cols-4' : cols === 2 ? 'min-[900px]:grid-cols-2' : 'min-[900px]:grid-cols-3'
  return (
    <Stagger as="ol" className={`m-0 grid list-none gap-5 p-0 ${grid}`}>
      {items.map((item, i) => (
        <li key={i}>
          <Tilt className={`${CARD} flex h-full flex-col gap-2.5 p-7`}>
            <span className={`${H} text-[15px] text-online-text`}>{i + 1}</span>
            <p className="m-0 text-[17px]">{item}</p>
          </Tilt>
        </li>
      ))}
    </Stagger>
  )
}

/** Example conversation card with Typing (MOTION.md: every example chat), plus the note under it. */
export function ChatCard({ lines, note }: { lines: ChatLine[]; note?: string }) {
  return (
    <Reveal className="flex flex-col items-center gap-4">
      <Float className="w-full max-w-[420px]" duration={6}>
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgba(31,29,26,.04),0_24px_60px_rgba(31,29,26,.10)]">
          <Typing lines={lines} />
        </div>
      </Float>
      {note && <p className="m-0 text-center text-[14px] text-stone">{note}</p>}
    </Reveal>
  )
}

export type FaqItem = { q: string; a: React.ReactNode }

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Reveal className="flex flex-col border-t border-line">
      {items.map(({ q, a }) => (
        <Accordion key={q} q={q}>
          {a}
        </Accordion>
      ))}
    </Reveal>
  )
}

/** Closing dark block: title and button come in with scale 0.98→1 (MOTION.md, final call). */
export function EndBlock({ title, text, primary, secondary }: { title: string; text?: string; primary: LinkProps; secondary?: LinkProps }) {
  return (
    <section className="relative z-[1] pb-24 pt-8">
      <div className={WRAP}>
        <Reveal scale={FINAL_SCALE} className="relative flex flex-col items-center gap-[22px] overflow-hidden bg-ink px-6 py-16 text-center text-cream sm:px-12">
          <div aria-hidden="true" className="blob-drift-2 pointer-events-none absolute -right-[60px] -top-[140px] h-80 w-80 rounded-full bg-[#3A352E] opacity-80 blur-[90px]" />
          <h2 className={`${H} relative max-w-[760px] text-[clamp(30px,4vw,50px)] leading-[1.1]`}>{title}</h2>
          {text && <p className="relative m-0 max-w-[620px] text-[18px] text-[#D9D0C2]">{text}</p>}
          <div className="relative flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Link href={primary.href} className="btn-shine inline-flex items-center rounded-full bg-cream px-7 py-[15px] font-medium text-ink no-underline transition-transform duration-200 hover:-translate-y-px hover:text-ink motion-reduce:transition-none">
                {primary.label}
              </Link>
            </Magnetic>
            {secondary && (
              <Link href={secondary.href} className="inline-flex items-center rounded-full border border-[#4A443C] px-6 py-3.5 font-medium text-cream no-underline transition-transform duration-200 hover:-translate-y-px hover:text-cream motion-reduce:transition-none">
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
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
