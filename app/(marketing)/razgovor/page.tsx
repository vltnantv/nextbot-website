import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { WordReveal } from '@/components/motion/WordReveal'
import { RazgovorForm } from '@/components/forms/RazgovorForm'
import { H, WRAP } from '@/components/home/ui'
import { COMPANY, telHref, viberHref } from '@/lib/company'

const link = 'text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink'

// Text: copy/ceni-zanas-razgovor.md (/razgovor) - word for word; h1 and subtitle from copy/UNIQUE.md
// („Изберете час“). „Друг начин: Телефон и Viber“ - confirmed by Valentin, 01.10.2026 (same number).

export const metadata: Metadata = pageMeta({ title: 'Запазете 15-минутен разговор | NextBot', description: 'Разкажете как работите и къде се губят клиенти. Ще ви кажем честно дали и как можем да помогнем.', path: '/razgovor' })

export default function BookCallPage() {
  return (
    <section className="relative z-[1] pb-24 pt-14">
      <div className={`${WRAP} grid gap-12 min-[1000px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[1000px]:gap-16`}>
        <div className="flex min-w-0 flex-col gap-6">
          {/* (copy h1 was: 15 минути са достатъчни, за да видите къде губите клиенти.) */}
          <WordReveal text="Изберете удобен час за 15 минути." className={`${H} text-[clamp(38px,5vw,60px)] leading-[1.04]`} />
          <Stagger onLoad lift delay={0.45} className="flex flex-col gap-6">
            <p className="m-0 max-w-[560px] font-display text-[22px] font-medium leading-snug">Ще ви се обадим. Без продажбен натиск.</p>
            <p className="m-0 max-w-[560px] text-[19px] text-stone">
              На разговора разказвате как работите. Ние ви казваме честно дали NextBot ще ви е от полза. Ако не е, ще ви кажем и това.
            </p>
            <div className="flex flex-col gap-4">
              <h2 className={`${H} text-[22px]`}>Какво да очаквате</h2>
              <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {[
                  'Питаме как клиентите ви се свързват с вас.',
                  'Показваме NEO с примери от вашия бранш.',
                  'Ако има смисъл, предлагаме пакет и цена. Без натиск.',
                ].map((s, i) => (
                  <li key={s} className="flex gap-3 text-[17px]">
                    <span className="font-display font-semibold text-online-text">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className={`${H} text-[22px]`}>Друг начин</h2>
              <p className="m-0 flex flex-wrap gap-x-5 gap-y-2 text-[17px]">
                <a href={telHref(COMPANY.phone)} className={link}>
                  Телефон: {COMPANY.phone}
                </a>
                {COMPANY.viber && (
                  <a href={viberHref(COMPANY.viber)} className={link}>
                    Viber
                  </a>
                )}
              </p>
            </div>
          </Stagger>
        </div>

        {/* Signature (copy/UNIQUE.md „Часове“) + the form */}
        <Reveal delay={0.6} className="min-w-0">
          <RazgovorForm />
        </Reveal>
      </div>
    </section>
  )
}
