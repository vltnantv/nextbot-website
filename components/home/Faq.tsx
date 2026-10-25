import { Accordion } from '@/components/motion/Accordion'
import { Reveal } from '@/components/motion/Reveal'
import { SETUP_DAYS } from '@/lib/prices'
import { H2, SECTION, WRAP } from './refresh'

// REBUILD-PLAN.md §4.10. No data region in the answers until it is confirmed (BRAND.md open question).
const QUESTIONS = [
  {
    q: 'Продукт или разработка: как да избера?',
    a: 'Ако проблемът ви е клиенти, запитвания и продажби, почти винаги продуктът стига и е готов за дни. Ако процесът ви е специфичен (склад, производство, график на екип), говорим за разработка. Казваме ви го в първия разговор.',
  },
  {
    q: 'Трябва ли да сменям програмите си?',
    a: 'Не. Продуктите работят до това, което вече ползвате. При разработка свързваме новата система със сегашните ви програми, вместо да ги заменяме.',
  },
  {
    q: 'Асистентът ще звучи ли като робот?',
    a: 'Не. Говори на естествен български, с вашия тон. Представя се като асистент на фирмата ви и когато не знае нещо, казва, че ще ви свърже с човек.',
  },
  {
    q: 'Къде се пазят данните?',
    a: 'Отделно за всяка фирма. Само вие и екипът ви имате достъп. При спиране получавате всичко като файл.',
  },
  {
    q: 'Колко време отнема?',
    a: `Продуктите стартират до ${SETUP_DAYS} дни. Сайт или магазин: 2–4 седмици. По-големите системи вървят на етапи и първата работеща версия обикновено е до месец.`,
  },
  {
    q: 'Какво включва настройката на продуктите?',
    a: 'Обучение на асистента по вашите материали, свързване на каналите, въвеждане на екипа в системата и внасяне на старите ви данни. За плановете CORE и CORE + NEO идваме на място.',
  },
]

export function Faq() {
  return (
    <section id="vaprosi" className={SECTION}>
      <div className={`${WRAP} grid gap-8 min-[960px]:grid-cols-12 min-[960px]:gap-12`}>
        <Reveal soft className="min-[960px]:col-span-4">
          <h2 className={H2}>Въпроси</h2>
        </Reveal>
        <Reveal soft className="flex flex-col border-t border-line min-[960px]:col-span-8">
          {QUESTIONS.map(({ q, a }) => (
            <Accordion key={q} q={q}>
              {a}
            </Accordion>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
