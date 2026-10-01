import { Reveal } from '@/components/motion/Reveal'
import { SETUP_DAYS } from '@/lib/prices'
import { H2 } from './ui'

const QUESTIONS = [
  {
    q: 'Ще звучи ли като робот?',
    a: 'Пише кратко и учтиво, на български и по вашите правила. Одобрявате тона, преди да тръгне.',
  },
  {
    q: 'Какво става, ако асистентът не знае отговора?',
    a: 'Казва на клиента, че ще предаде въпроса, и записва контакта му. Вие получавате известие.',
  },
  {
    q: 'Къде се пазят данните на клиентите ми?',
    // TODO: add the data region once confirmed (BRAND.md open question) - never guess it.
    a: 'Не продаваме и не споделяме данните на клиентите ви.',
  },
  {
    q: 'Трябва ли да сменям програмите си?',
    a: 'Не. Свързваме се с това, което ползвате. Ако нямате система за клиенти, CORE я замества.',
  },
  { q: 'Колко време отнема?', a: `До ${SETUP_DAYS} дни от първия разговор до работещ асистент.` },
  { q: 'Мога ли да спра по всяко време?', a: 'Да. Плащате месечно, без годишен договор.' },
]

export function Faq() {
  return (
    <section id="za-nas" className="relative z-[1] pb-[104px] pt-[72px]">
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-8 px-6">
        <h2 className={H2}>Често задавани въпроси</h2>
        <Reveal className="flex flex-col border-t border-line">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-[18px] font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-[22px] leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mb-0 mt-3 text-stone">{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
