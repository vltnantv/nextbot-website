import { Accordion } from '@/components/motion/Accordion'
import { Reveal } from '@/components/motion/Reveal'
import { SETUP_DAYS } from '@/lib/prices'
import { H2, SECTION, WRAP } from './refresh'

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
    <section id="vaprosi" className={SECTION}>
      <div className={`${WRAP} grid gap-8 min-[960px]:grid-cols-12 min-[960px]:gap-12`}>
        <Reveal soft className="min-[960px]:col-span-4">
          <h2 className={H2}>Често задавани въпроси</h2>
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
