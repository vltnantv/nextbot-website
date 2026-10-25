import { Stagger } from '@/components/motion/Stagger'
import { STEPS } from './offers'
import { SectionHead } from './parts'
import { CARD, SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.6: one path for a product or for development - four numbered cards.

export function HowWeWork() {
  return (
    <section id="kak-rabotim" className={`${SECTION} bg-cream-deep`}>
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead tag="Как работим" title="Един и същ път," muted="за продукт или за разработка." />
        <Stagger as="ol" className="m-0 grid list-none gap-3.5 p-0 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`${CARD} flex flex-col gap-2.5 px-[22px] py-6`}>
              <span className="text-[13px] font-semibold text-stone tabular-nums" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="text-[13px] font-semibold text-stone">{s.when}</span>
              <h3 className="m-0 font-display text-[19px] font-semibold tracking-[-0.01em]">
                <span className="sr-only">Стъпка {i + 1}: </span>
                {s.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.55] text-stone">{s.text}</p>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
