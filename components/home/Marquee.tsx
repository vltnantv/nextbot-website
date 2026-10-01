const INDUSTRIES = ['Клиники', 'Автокъщи', 'Салони за красота', 'Агенции за имоти', 'Хотели', 'Ресторанти', 'Онлайн магазини', 'Автосервизи']

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex gap-12 whitespace-nowrap pr-12 font-display text-[22px] font-medium tracking-[-0.02em] text-stone">
      {INDUSTRIES.map((name) => (
        <span key={name} className="flex gap-12">
          <span>{name}</span>
          <span className="text-online" aria-hidden="true">
            ●
          </span>
        </span>
      ))}
    </div>
  )
}

/** Industries strip moving sideways (CSS, pauses on hover; still with reduced motion). */
export function Marquee() {
  return (
    <section aria-label="Браншове" className="marquee-wrap relative z-[1] overflow-hidden border-y border-line bg-white/50 py-[18px]">
      <div className="marquee">
        <Row />
        {/* duplicate for a seamless loop */}
        <Row hidden />
      </div>
    </section>
  )
}
