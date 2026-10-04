import { DrawLine } from '@/components/motion/DrawLine'

// STUDIO (copy/VISUALS.md): an example automation as a three-step scheme - plain text in frames, thin lines with
// arrows that draw themselves (DrawLine), no icons.

const STEPS = [
  { title: 'Запитване от сайта', note: 'Клиент пише в сайта' },
  { title: 'Таблица на екипа', note: 'Нов ред с име, телефон и услуга' },
  { title: 'Имейл до шефа в петък', note: 'Обобщение на седмицата' },
]

export function StudioFlow() {
  return (
    <ol className="m-0 flex list-none flex-col items-stretch gap-3 p-0 font-sans min-[760px]:flex-row">
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex flex-col items-stretch gap-3 min-[760px]:flex-1 min-[760px]:flex-row min-[760px]:items-center">
          <span className="flex-1 self-stretch rounded-[10px] border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink">
            <span className="mb-1 block text-[13px] font-normal tabular-nums text-[#8C867C]">{i + 1}</span>
            {s.title}
            <span className="mt-1 block text-[13px] font-normal text-stone">{s.note}</span>
          </span>
          {i < STEPS.length - 1 && (
            <>
              <DrawLine arrow className="hidden h-3 w-12 shrink-0 min-[760px]:block" delay={i * 0.6} />
              <span className="self-center text-[18px] leading-none text-[#8C867C] min-[760px]:hidden" aria-hidden="true">
                ↓
              </span>
            </>
          )}
        </li>
      ))}
    </ol>
  )
}
