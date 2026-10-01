import { Float } from '@/components/motion/Float'
import { Reveal } from '@/components/motion/Reveal'
import { PILOT } from '@/lib/prices'
import { EYEBROW, H, WRAP } from './ui'

export function Pilot() {
  return (
    <section className="relative z-[1] pb-[72px] pt-[104px]">
      <div className={WRAP}>
        <Reveal className="flex flex-wrap items-center justify-between gap-8 rounded-[24px] border border-line bg-white p-8 sm:p-12">
          <div className="flex max-w-[620px] flex-col gap-3">
            <span className={EYEBROW}>Пилотна програма</span>
            <h2 className={`${H} text-[clamp(28px,3.2vw,40px)] leading-[1.12]`}>Търсим първите {PILOT.total} бизнеса.</h2>
            <p className="m-0 text-stone">
              Настройка на половин цена и директен телефон към основателя. В замяна искаме честен отзив.
            </p>
          </div>
          {/* BRAND.md: only the real number, entered by hand in lib/prices.ts. Hidden until set. */}
          {PILOT.spotsLeft !== null && (
            <Float duration={7} phase={2}>
              <div className="flex flex-col items-center gap-1 rounded-[20px] bg-cream-deep px-8 py-6">
                <span className={`${H} text-[48px] leading-none`}>{PILOT.spotsLeft}</span>
                <span className="text-[14px] text-stone">свободни места от {PILOT.total}</span>
              </div>
            </Float>
          )}
        </Reveal>
      </div>
    </section>
  )
}
