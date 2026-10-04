import { DrawLine } from '@/components/motion/DrawLine'

// STUDIO (copy/VISUALS.md): an example automation as a three-step scheme - plain text in frames, thin lines with
// arrows that draw themselves (DrawLine), no icons.

const STEPS = ['Запитване от сайта', 'Таблица на екипа', 'Имейл до шефа в петък']

export function StudioFlow() {
  return (
    <ol className="m-0 flex list-none flex-col items-stretch gap-3 p-0 font-sans min-[760px]:flex-row min-[760px]:items-center">
      {STEPS.map((s, i) => (
        <li key={s} className="flex flex-col items-stretch gap-3 min-[760px]:flex-1 min-[760px]:flex-row min-[760px]:items-center">
          <span className="flex-1 rounded-[10px] border border-line bg-white px-5 py-4 text-[15px] font-medium text-ink">
            <span className="mb-1 block text-[13px] font-normal tabular-nums text-[#8C867C]">{i + 1}</span>
            {s}
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
