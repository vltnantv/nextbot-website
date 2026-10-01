import type { Metadata } from 'next'
import { Float } from '@/components/motion/Float'
import { Lift } from '@/components/motion/Lift'
import { Reveal } from '@/components/motion/Reveal'
import { LiveDot } from '@/components/brand/LiveDot'

// TEMPORARY style preview for the rebrand (colours, buttons, cards, motion).
// Not linked anywhere, hidden from search engines. Delete before the site goes live.
export const metadata: Metadata = {
  title: 'Преглед на стила',
  robots: { index: false, follow: false },
}

const SWATCHES = [
  { name: 'cream', hex: '#FAF7F2', className: 'bg-cream' },
  { name: 'cream-deep', hex: '#F3EEE6', className: 'bg-cream-deep' },
  { name: 'white', hex: '#FFFFFF', className: 'bg-white' },
  { name: 'ink', hex: '#1F1D1A', className: 'bg-ink' },
  { name: 'stone', hex: '#6F6A62', className: 'bg-stone' },
  { name: 'line', hex: '#E8E1D6', className: 'bg-line' },
  { name: 'online', hex: '#1F9D63', className: 'bg-online' },
]

function Bubble({ from, children }: { from: 'client' | 'bot'; children: React.ReactNode }) {
  return (
    <div className={from === 'client' ? 'flex justify-end' : 'flex justify-start'}>
      <p
        className={
          from === 'client'
            ? 'max-w-[85%] rounded-[18px] rounded-br-md bg-cream-deep px-4 py-2.5 text-[15px] text-ink'
            : 'max-w-[85%] rounded-[18px] rounded-bl-md border border-line bg-white px-4 py-2.5 text-[15px] text-ink'
        }
      >
        {children}
      </p>
    </div>
  )
}

export default function StylePreviewPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <p className="text-[13px] font-medium uppercase tracking-wide text-stone">Временен преглед · не е част от сайта</p>

      {/* Hero sample: headline + floating chat bubbles in a white "phone" card */}
      <section className="mt-6 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-[44px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[56px]">
            Всеки клиент получава отговор. Веднага.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-stone">
            Така изглеждат заглавията, текстът и бутоните в новия стил. Съдържанието на началната страница идва в
            стъпка 4.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="rounded-full bg-ink px-6 py-3 text-[16px] font-medium text-cream hover:opacity-90">
              Основен бутон
            </a>
            <a href="#" className="rounded-full border border-line bg-white/60 px-6 py-3 text-[16px] font-medium text-ink hover:bg-white">
              Вторичен бутон
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-[28px] border border-line bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <span className="text-[14px] font-medium text-ink">Viber · 22:47</span>
            <span className="flex items-center gap-1.5 text-[13px] text-stone">
              <LiveDot className="h-2 w-2" /> на линия
            </span>
          </div>
          <div className="space-y-3">
            <Float delay={0.2} duration={6}>
              <Bubble from="client">Има ли свободен час утре?</Bubble>
            </Float>
            <Float delay={1.0} duration={5.5} distance={4}>
              <Bubble from="bot">Има в 10:30 и 14:00. Кой ви е удобен?</Bubble>
            </Float>
            <Float delay={1.8} duration={7} distance={6}>
              <p className="flex items-center justify-end gap-1.5 text-[13px] text-stone">
                <LiveDot className="h-1.5 w-1.5" /> отговорено за 4 сек.
              </p>
            </Float>
          </div>
        </div>
      </section>

      {/* Colours */}
      <Reveal as="section" className="mt-28">
        <h2 className="font-display text-[32px] font-semibold tracking-tight text-ink">Цветове</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {SWATCHES.map((s) => (
            <li key={s.name}>
              <div className={`h-20 rounded-card border border-line ${s.className}`} />
              <p className="mt-2 text-[14px] font-medium text-ink">{s.name}</p>
              <p className="text-[13px] text-stone">{s.hex}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Cards with lift */}
      <Reveal as="section" className="mt-28">
        <h2 className="font-display text-[32px] font-semibold tracking-tight text-ink">Карти (посочете с мишката)</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ['Приема', 'NEO и ARIA отговарят на клиента веднага.'],
            ['Записва', 'CORE пази всеки клиент и напомня кога да се обадите.'],
            ['Връща', 'ECHO напомня за час и пита за отзив.'],
          ].map(([title, text]) => (
            <Lift key={title} className="p-6">
              <h3 className="font-display text-[22px] font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-stone">{text}</p>
            </Lift>
          ))}
        </div>
      </Reveal>

      {/* Alternating section */}
      <Reveal as="section" className="mt-28 rounded-card bg-cream-deep px-6 py-14 sm:px-10">
        <h2 className="font-display text-[32px] font-semibold tracking-tight text-ink">Редуваща се секция</h2>
        <p className="mt-4 max-w-[38rem] text-[18px] leading-relaxed text-stone">
          Фон cream-deep за всяка втора секция. Секциите изплуват веднъж при скрол; без JavaScript и при
          „намалено движение“ просто се виждат.
        </p>
      </Reveal>
    </div>
  )
}
