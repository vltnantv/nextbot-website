import { Marquee as MarqueeStrip } from '@/components/motion/Marquee'

const INDUSTRIES = ['Клиники', 'Автокъщи', 'Салони за красота', 'Агенции за имоти', 'Хотели', 'Ресторанти', 'Онлайн магазини', 'Автосервизи']

/** Industries strip under the hero (MOTION.md: 60 s, pauses on hover). */
export function Marquee() {
  return (
    <MarqueeStrip label="Браншове" className="relative z-[1] border-y border-line bg-white/50 py-[18px]">
      {INDUSTRIES.map((name) => (
        <span key={name} className="flex gap-12 whitespace-nowrap pr-12 font-display text-[22px] font-medium tracking-[-0.02em] text-stone">
          <span>{name}</span>
          <span className="text-online" aria-hidden="true">
            ●
          </span>
        </span>
      ))}
    </MarqueeStrip>
  )
}
