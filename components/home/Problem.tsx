import { Tilt } from '@/components/motion/Tilt'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger } from '@/components/motion/Stagger'
import { CARD, EYEBROW, H2, WRAP } from './ui'

const CARDS = [
  { label: 'Неделя, 21:14', text: 'Съобщение в неделя вечер, на което сте отговорили в понеделник на обяд.' },
  { label: '„Ще помисля“', text: 'Клиент, който каза „ще помисля“ и никой не му се обади.' },
  { label: 'Таблица_клиенти_final2.xlsx', text: 'Таблица, която никой не обновява.' },
]

export function Problem() {
  return (
    <section className="relative z-[1] bg-cream-deep py-[88px]">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <Reveal className="flex max-w-[720px] flex-col gap-3">
          <span className={EYEBROW}>Проблемът</span>
          <h2 className={H2}>Колко запитвания останаха без отговор тази седмица?</h2>
        </Reveal>
        <Stagger className="grid gap-5 min-[900px]:grid-cols-3">
          {CARDS.map((c) => (
            <Tilt key={c.label} className={`${CARD} flex flex-col gap-2.5 p-7`}>
              <span className="text-[13px] text-stone">{c.label}</span>
              <p className="m-0 text-[18px]">{c.text}</p>
            </Tilt>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
