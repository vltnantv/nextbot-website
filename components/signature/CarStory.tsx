import { Reveal } from '@/components/motion/Reveal'
import { ExampleTag } from './ExampleTag'

// Car dealers signature (copy/UNIQUE.md „Историята“): a scroll story in 4 frames - 21:14 enquiry →
// 21:14 answer → 21:20 viewing booked for Saturday → Monday „Обадете се на Иван (оглед в събота)“ in CORE.
// The enquiry and the answer are the example from copy/branshove.md. Names are made up: labelled so.
// Each frame floats in on its own as you scroll (Reveal), so the story is read in order.

const FRAMES = [
  { when: '21:14', where: 'Сайт', bubble: 'u' as const, text: 'Има ли лизинг за този Golf?' },
  { when: '21:14', where: 'NEO', bubble: 'b' as const, text: 'Да, предлагаме лизинг. Искате ли да запазя час за оглед и разговор с търговец?' },
  { when: '21:20', where: 'NEO', bubble: 'note' as const, text: 'Записан оглед за събота' },
  { when: 'Понеделник', where: 'CORE', bubble: 'core' as const, text: 'Обадете се на Иван (оглед в събота)' },
]

export function CarStory() {
  return (
    <div className="flex flex-col gap-8">
      <ExampleTag>Пример, имената са измислени</ExampleTag>
      <ol className="m-0 grid list-none gap-5 p-0 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {FRAMES.map((f, i) => (
          <Reveal as="li" key={i} delay={i * 0.15} className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-soft">
            <span className="flex items-baseline justify-between gap-2">
              <span className="font-display text-[22px] font-semibold tabular-nums tracking-[-0.02em]">{f.when}</span>
              <span className="text-[13px] text-stone">{f.where}</span>
            </span>
            {f.bubble === 'u' && <span className="self-end rounded-[18px] rounded-br-[6px] bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug">{f.text}</span>}
            {f.bubble === 'b' && <span className="self-start rounded-[18px] rounded-bl-[6px] bg-ink px-3.5 py-2.5 text-[15px] leading-snug text-cream">{f.text}</span>}
            {f.bubble === 'note' && (
              <span className="flex items-center gap-2 text-[16px] font-medium">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-online/15 text-online-text" aria-hidden="true">
                  ✓
                </span>
                {f.text}
              </span>
            )}
            {f.bubble === 'core' && (
              <span className="flex items-center gap-3 rounded-[12px] border border-line px-3.5 py-3 text-[15px] font-medium">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-deep text-[13px] font-semibold" aria-hidden="true">
                  И
                </span>
                {f.text}
              </span>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
