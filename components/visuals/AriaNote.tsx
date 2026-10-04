// ARIA (copy/VISUALS.md): coming soon - so not an app screen, just the note the owner will get after a call.
// Plain card: time, phone with XXX, a short summary, a dot „записано“. No sound waves, robots or microphones.

export function AriaNote() {
  return (
    <div className="w-full max-w-[420px] rounded-[12px] border border-line bg-white p-5 font-sans text-ink">
      <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
        <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">Бележка от обаждане</span>
        <span className="text-[13px] tabular-nums text-[#8C867C]">вторник, 14:32</span>
      </div>
      <dl className="m-0 grid grid-cols-[90px_minmax(0,1fr)] gap-x-4 gap-y-2 pt-3 text-[14px]">
        <dt className="text-stone">Телефон</dt>
        <dd className="m-0 tabular-nums">+359 88 XXX XX 21</dd>
        <dt className="text-stone">Резюме</dt>
        <dd className="m-0 leading-snug">Иска час за четвъртък следобед. Записан за 15:00.</dd>
      </dl>
      <p className="m-0 mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[13px] text-stone">
        <i className="inline-block h-[7px] w-[7px] rounded-full bg-online" aria-hidden="true" />
        записано
      </p>
    </div>
  )
}
