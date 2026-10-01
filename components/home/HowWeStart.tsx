import { DrawLine } from '@/components/motion/DrawLine'
import { Reveal } from '@/components/motion/Reveal'
import { SETUP_DAYS } from '@/lib/prices'
import { EYEBROW, H, H2, WRAP } from './ui'

const STEPS = [
  { when: 'Ден 1', title: 'Разговор, 15 минути', text: 'Разказвате как работите и къде се губят клиенти.' },
  { when: `Дни 2–${SETUP_DAYS}`, title: 'Настройка', text: 'Учим асистента от сайта и документите ви и го свързваме с каналите ви.' },
  { when: 'Всяка седмица', title: 'Работи и отчита', text: 'Получавате отчет: колко запитвания и колко записани часове.' },
]

export function HowWeStart() {
  return (
    <section className="relative z-[1] bg-cream-deep py-[88px]">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <Reveal className="flex max-w-[720px] flex-col gap-3">
          <span className={EYEBROW}>Как започваме</span>
          <h2 className={H2}>От разговор до работещ асистент за {SETUP_DAYS} дни.</h2>
        </Reveal>
        <Reveal as="div">
          <ol className="m-0 grid list-none gap-5 p-0 min-[900px]:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.when} className="flex flex-col gap-2.5">
                <DrawLine />
                <span className={`${H} text-[15px] text-online-text`}>{s.when}</span>
                <span className={`${H} text-[22px]`}>{s.title}</span>
                <span className="text-stone">{s.text}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
