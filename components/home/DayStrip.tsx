import { Reveal } from '@/components/motion/Reveal'
import { DayClock } from '@/components/signature/DayClock'
import { ExampleTag } from '@/components/signature/ExampleTag'
import { H2, WRAP } from './ui'

// Homepage signature (copy/UNIQUE.md, „Начало“): one day in which no client is left without an answer.
// Takes the place of the shared „Как започваме“ block.
export function DayStrip() {
  return (
    <section className="relative z-[1] bg-cream-deep py-[88px]">
      <div className={`${WRAP} flex flex-col gap-12`}>
        <Reveal className="flex max-w-[720px] flex-col gap-4">
          <ExampleTag />
          <h2 className={H2}>Докато вие работите, спите или сте на обяд.</h2>
        </Reveal>
        <DayClock />
      </div>
    </section>
  )
}
