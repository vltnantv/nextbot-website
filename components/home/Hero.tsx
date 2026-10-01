import Link from 'next/link'
import { Float } from '@/components/motion/Float'
import { Magnetic } from '@/components/motion/Magnetic'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { Typing } from '@/components/motion/Typing'
import { WordReveal } from '@/components/motion/WordReveal'
import { LiveDot } from '@/components/brand/LiveDot'
import { CTA } from '@/lib/site-nav'
import { GUARANTEE_DAYS, SETUP_DAYS } from '@/lib/prices'
import { BTN_PRIMARY, BTN_SECONDARY, H, WRAP } from './ui'

// MOTION.md, hero: WordReveal on the headline, then text and buttons in a cascade, then the chat card with Typing.
const CONVERSATION = [
  { who: 'u' as const, text: 'Здравейте, има ли свободен час утре?' },
  { who: 'b' as const, text: 'Здравейте! Утре има в 10:30 и 14:00. Кой час ви е удобен?' },
  { who: 'u' as const, text: '10:30, благодаря.' },
  { who: 'b' as const, text: 'Записах ви за утре в 10:30. Ще получите напомняне вечерта.' },
]

function SideCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-card border border-line bg-white px-4 py-3 text-[13px] shadow-[0_12px_32px_rgba(31,29,26,.08)]">
      <span className="text-stone">{label}</span>
      <span className="text-[14px] font-semibold">{text}</span>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative z-[1] pb-24 pt-14">
      <div className={`${WRAP} grid items-center gap-10 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:gap-14`}>
        <div className="flex min-w-0 flex-col gap-[26px]">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-stone">
            <LiveDot className="h-2 w-2" />
            На линия денем и нощем · на български
          </div>
          <WordReveal
            text="Всеки клиент получава отговор. Веднага."
            mutedFrom={4}
            className={`${H} text-[clamp(42px,5.8vw,76px)] leading-[1.02]`}
          />
          <Stagger onLoad lift delay={0.45} className="flex flex-col gap-[26px]">
            <p className="m-0 max-w-[540px] text-[19px] text-stone">
              NextBot отговаря на запитвания в сайта, Viber и Messenger, записва клиентите и ви напомня кога да се обадите.
              Денем и нощем, на български.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href={CTA.href} className={`${BTN_PRIMARY} btn-shine px-[26px] py-[15px] text-[16px]`}>
                  Запазете 15-минутен разговор
                </Link>
              </Magnetic>
              <a href="#demo" className={`${BTN_SECONDARY} px-6 py-3.5 text-[16px]`}>
                Пробвайте бота сега
              </a>
            </div>
            <p className="m-0 text-[14px] text-stone">
              Без годишен договор · Настройка до {SETUP_DAYS} дни · {GUARANTEE_DAYS} дни гаранция
            </p>
          </Stagger>
        </div>

        <Reveal delay={0.7} className="relative flex min-w-0 justify-center pb-10 pt-5">
          <Float className="w-full max-w-[380px]" duration={6}>
            <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgba(31,29,26,.04),0_24px_60px_rgba(31,29,26,.10)]">
              <div className="flex items-center gap-3 border-b border-[#F0EAE0] px-[18px] py-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-cream-deep text-[14px] font-semibold">ДК</div>
                <div className="flex flex-col leading-[1.3]">
                  <span className="text-[15px] font-semibold">Дентален кабинет „Усмивка“</span>
                  <span className="text-[12px] text-online-text">● на линия</span>
                </div>
                <span className="ml-auto text-[12px] text-stone">Viber</span>
              </div>
              <Typing lines={CONVERSATION} timeLabel="Неделя, 22:47" doneLabel="отговорено за 4 сек. · записано в CORE" loop className="min-h-[330px]" />
            </div>
          </Float>

          {/* decorative cards: no room next to the chat on narrow phones */}
          <Float className="absolute bottom-0 left-0 hidden min-[520px]:block" duration={7} phase={2}>
            <SideCard label="CORE · нов клиент" text="Мария П. · утре 10:30" />
          </Float>
          <Float className="absolute right-0 top-0 hidden min-[520px]:block" duration={8} phase={4}>
            <SideCard label="Напомняне" text="Обадете се на Иван днес" />
          </Float>
        </Reveal>
      </div>
    </section>
  )
}
