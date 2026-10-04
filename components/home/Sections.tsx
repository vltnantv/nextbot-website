import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { DayClock } from '@/components/signature/DayClock'
import { PILOT, SETUP_DAYS } from '@/lib/prices'
import { Arrow } from './Arrow'
import { ProductFrame } from './ProductFrame'
import { H2, H3, LINK, SECTION, TAG, TEXT, WRAP } from './refresh'

// Homepage sections after copy/DESIGN-REFRESH.md §4 (2-7). Hairline rows instead of cards, alternating
// two-column sections with a product screen, one link each. Text reused from copy/ and the approved homepage.

/** §4.2 Honest line instead of client logos - the real number from lib/prices.ts.
 *  Hidden when there is no number or no spot is taken yet (spotsLeft = total). */
export function PilotLine() {
  if (PILOT.spotsLeft === null || PILOT.spotsLeft >= PILOT.total) return null
  return (
    <section className="relative z-[1]">
      <div className={WRAP}>
        <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y border-line py-5 text-[17px]">
          <span>Търсим първите {PILOT.total} бизнеса.</span>
          <span className="text-stone">
            Свободни места: <span className="font-medium text-ink tabular-nums">{PILOT.spotsLeft}</span> от {PILOT.total}
          </span>
        </p>
      </div>
    </section>
  )
}

/** Two columns: short text with one link, a big product screen; `flip` puts the screen on the left. */
function Feature({
  tag,
  title,
  text,
  href,
  link,
  side,
  flip = false,
}: {
  tag: string
  title: string
  text: string
  href: string
  link: string
  /** the product: a real screen or a live component, never a drawing */
  side: React.ReactNode
  flip?: boolean
}) {
  return (
    <section className={SECTION}>
      <div className={`${WRAP} grid items-center gap-10 min-[960px]:grid-cols-12 min-[960px]:gap-12`}>
        <Reveal soft className={`flex min-w-0 flex-col gap-5 min-[960px]:col-span-5 ${flip ? 'min-[960px]:order-2 min-[960px]:col-start-8' : ''}`}>
          <span className={TAG}>{tag}</span>
          <h2 className={H2}>{title}</h2>
          <p className={`${TEXT} text-stone`}>{text}</p>
          <Link href={href} className={`${LINK} self-start text-[16px]`}>
            {link}
          </Link>
        </Reveal>
        <Reveal soft delay={0.1} className={`min-w-0 min-[960px]:col-span-7 ${flip ? 'min-[960px]:order-1' : ''}`}>
          {side}
        </Reveal>
      </div>
    </section>
  )
}

/** §4.3 NEO - the homepage signature (copy/UNIQUE.md „Часовник на деня“) in place of a product screen. */
export function NeoSection() {
  return (
    <Feature
      tag="NEO · чат асистент"
      title="Отговаря в сайта ви денем и нощем."
      text="NEO отговаря на въпросите на клиентите в сайта ви, записва им час и запазва данните им, за да ги потърсите."
      href="/neo"
      link="Повече за NEO"
      side={
        <div className="flex flex-col gap-2">
          <span className={TAG}>Докато вие работите, спите или сте на обяд. Пример.</span>
          <DayClock />
        </div>
      }
    />
  )
}

/** §4.4 CORE - a real screenshot of „Днес“ (/vatreshno/dnes) with made-up demo data, screen on the left. */
export function CoreSection() {
  return (
    <Feature
      flip
      tag="CORE · система за клиенти"
      title="Знаете на кого да се обадите."
      text="CORE замества тетрадките, таблиците и бележките. Записва всяко запитване, пази историята и ви напомня кого да потърсите днес."
      href="/core"
      link="Повече за CORE"
      side={
        <div className="flex flex-col gap-2">
          <span className={TAG}>Пример с измислени данни</span>
          <ProductFrame what="CORE · Днес" bar={false}>
            <Image
              src="/screens/core-dnes.png"
              alt="Екранът „Днес“ в CORE: закъснели обаждания и обаждания за днес, с етап, телефон и срок на всеки ред."
              width={1960}
              height={1354}
              sizes="(min-width: 960px) 640px, 100vw"
              className="block h-auto w-full"
            />
          </ProductFrame>
        </div>
      }
    />
  )
}

/** A table of hairline rows: label | text | arrow link. */
function Rows({ rows }: { rows: { label: string; text: React.ReactNode; href: string }[] }) {
  return (
    <ul className="m-0 list-none border-t border-line p-0">
      {rows.map((r) => (
        <li key={r.href} className="border-b border-line">
          <Link
            href={r.href}
            className="group grid items-baseline gap-x-8 gap-y-1 py-6 text-ink no-underline transition-colors hover:bg-white/60 min-[760px]:grid-cols-[minmax(0,4fr)_minmax(0,7fr)_auto]"
          >
            <span className={H3}>{r.label}</span>
            <span className="text-[18px] leading-[1.5] text-stone">{r.text}</span>
            <span className="hidden text-[18px] min-[760px]:block" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** §4.5 ECHO and WEB: smaller rows, no big screen. */
export function MoreProducts() {
  return (
    <section className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-8`}>
        <Reveal soft>
          <span className={TAG}>Още</span>
        </Reveal>
        <Reveal soft>
          <Rows
            rows={[
              { label: 'ECHO', text: 'Напомня за следващия час и моли за отзив в Google след всяка покупка.', href: '/echo' },
              { label: 'WEB', text: 'Бърз сайт на български, с чат асистент от първия ден.', href: '/izrabotka-na-sait' },
            ]}
          />
        </Reveal>
      </div>
    </section>
  )
}

/** §4.6 Industries as a table: one real client question per row (examples from copy/branshove.md). */
export function Industries() {
  return (
    <section className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-8`}>
        <Reveal soft>
          <span className={TAG}>По бранш</span>
        </Reveal>
        <Reveal soft>
          <Rows
            rows={[
              { label: 'Автокъщи и сервизи', text: '„Има ли лизинг за този Golf?“', href: '/za/avtokashti' },
              { label: 'Клиники и салони', text: '„Искам час за почистване.“', href: '/za/kliniki' },
              { label: 'Агенции за имоти', text: '„Може ли оглед в събота?“', href: '/za/imoti' },
              { label: 'Хотели и ресторанти', text: '„Имате ли стая за 2 нощувки?“', href: '/za/hoteli' },
            ]}
          />
        </Reveal>
      </div>
    </section>
  )
}

/** §4.7 How we start: three rows with big step numbers (numbers for steps, not statistics). */
export function HowWeStart() {
  const steps = [
    { title: 'Разговор, 15 минути', text: 'Разказвате как работите и къде се губят клиенти.' },
    { title: 'Настройка', text: `Учим асистента от сайта и документите ви и го свързваме с каналите ви. До ${SETUP_DAYS} дни.` },
    { title: 'Работи и отчита', text: 'Получавате отчет: колко запитвания и колко записани часове.' },
  ]
  return (
    <section className={SECTION}>
      <div className={`${WRAP} flex flex-col gap-8`}>
        <Reveal soft className="flex flex-col gap-4">
          <span className={TAG}>Как започваме</span>
          <h2 className={H2}>От разговор до работещ асистент за {SETUP_DAYS} дни.</h2>
        </Reveal>
        <ol className="m-0 list-none border-t border-line p-0">
          {steps.map((s, i) => (
            <Reveal soft as="li" key={s.title} delay={i * 0.08} className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-7 min-[760px]:grid-cols-[96px_minmax(0,4fr)_minmax(0,7fr)]">
              <span className="font-display text-[56px] font-semibold leading-none tracking-[-0.03em] text-stone/70" aria-hidden="true">
                {i + 1}
              </span>
              <span className={H3}>
                <span className="sr-only">Стъпка {i + 1}: </span>
                {s.title}
              </span>
              <span className="text-[18px] leading-[1.5] text-stone">{s.text}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
