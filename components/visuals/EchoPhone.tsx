// ECHO (copy/VISUALS.md): ECHO is not a program yet, so no fake interface - a phone with the three messages the
// client receives, one under the other. Plain grey bubbles, no Viber or other brand logo. A small grey label over
// each. Message texts as in copy/VISUALS.md (from copy/echo.md); made-up name „Мария“, link shown as [връзка].

const MESSAGES = [
  { when: 'след посещението', text: 'Здравейте, Мария! Напомняме Ви за утре в 10:30 ч. Ако не можете да дойдете, отговорете тук и ще преместим часа.' },
  { when: 'ден 1', text: 'Как мина посещението? Ако сте доволна, ще ни помогне отзив: [връзка]' },
  { when: 'ден 180', text: 'Отдавна не сме се виждали. Тази седмица имаме …' },
]

export function EchoPhone() {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[40px] border border-line bg-white p-2.5 font-sans text-ink">
      <div className="overflow-hidden rounded-[32px] bg-cream">
        {/* top of the phone: a sender line, no brand */}
        <div className="flex flex-col items-center gap-1 border-b border-line pb-3 pt-4">
          <span className="h-1 w-12 rounded-full bg-line" aria-hidden="true" />
          <span className="mt-2 grid h-9 w-9 place-items-center rounded-full bg-cream-deep text-[12px] font-medium text-stone" aria-hidden="true">
            ДП
          </span>
          <span className="text-[13px] font-medium">Дентален кабинет „Пример“</span>
        </div>
        <ol className="m-0 flex list-none flex-col gap-4 px-4 py-5">
          {MESSAGES.map((m) => (
            <li key={m.when} className="flex flex-col items-start gap-1.5">
              <span className="pl-1 text-[13px] text-[#8C867C]">{m.when}</span>
              <span className="max-w-[92%] rounded-[14px] rounded-bl-[4px] bg-[#ECE7DF] px-3.5 py-2.5 text-[14px] leading-snug">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
