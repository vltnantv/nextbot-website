'use client'

import { useState } from 'react'

// REBUILD-PLAN.md §4.3 „Таб CORE“: a working mini CORE board with made-up data. Status chips cycle,
// rows open their history, the owner view shows the whole team. State lives only in memory.

const STATUS = ['Обади се', 'Говорихме', 'Записан', 'Затворен'] as const
type Rep = 'Иван' | 'Петя'
type Client = { n: string; p: string; i: string; s: number; rep: Rep; h: [string, string][] }

const START: Client[] = [
  { n: 'Георги Илиев', p: '0888 ••• 412', i: 'Golf 8, 2021 · лизинг', s: 0, rep: 'Иван', h: [['вчера 22:47', 'Пита в чата за лизинг на Golf 8. Записан оглед утре 11:00.']] },
  {
    n: 'Мария Петрова',
    p: '0877 ••• 905',
    i: 'Octavia Combi · оглед',
    s: 2,
    rep: 'Иван',
    h: [
      ['пон 10:12', 'Оглед направен. Иска оферта с 20% самоучастие.'],
      ['пон 16:40', 'Оферта изпратена по имейл.'],
    ],
  },
  { n: 'Стоян Димов', p: '0899 ••• 110', i: 'Tiguan 2019 · оферта', s: 1, rep: 'Иван', h: [['вт 09:30', 'Говорихме. Ще мисли до петък.']] },
  { n: 'Елена Кирова', p: '0888 ••• 733', i: 'Passat · замяна на старо', s: 0, rep: 'Петя', h: [['вчера 19:15', 'Пита дали взимаме кола на старо. Чака обаждане.']] },
  { n: 'Николай Тодоров', p: '0898 ••• 221', i: 'Kodiaq · тест драйв', s: 3, rep: 'Петя', h: [['миналата седмица', 'Купи. Доволен. Молба за отзив изпратена.']] },
  { n: 'Радостина Генова', p: '0887 ••• 648', i: 'Golf 7 · цена', s: 1, rep: 'Петя', h: [['вт 14:05', 'Говорихме, иска снимки на двигателя.']] },
]

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="inline-flex gap-0.5 rounded-full border border-line p-[3px]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${o.value === value ? 'bg-ink text-cream' : 'text-stone hover:text-ink'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function CoreDemo() {
  const [clients, setClients] = useState(START)
  const [view, setView] = useState<'rep' | 'owner'>('rep')
  const [filter, setFilter] = useState<'today' | 'all'>('today')
  const [open, setOpen] = useState<string | null>(null)

  const mine = clients.filter((c) => view === 'owner' || c.rep === 'Иван')
  const list = mine.filter((c) => filter === 'all' || c.s === 0)
  const waiting = (rep: Rep) => clients.filter((c) => c.rep === rep && c.s === 0).length

  const kpis: [string | number, string][] = [
    [mine.filter((c) => c.s === 0).length, 'за обаждане днес'],
    [mine.filter((c) => c.s === 2).length, 'записани огледи'],
    view === 'owner' ? [`${waiting('Петя')} / ${waiting('Иван')}`, 'чакащи: Петя / Иван'] : [mine.filter((c) => c.s === 3).length, 'затворени този месец'],
  ]

  const nextStatus = (name: string) =>
    setClients((all) =>
      all.map((c) => {
        if (c.n !== name) return c
        const s = (c.s + 1) % STATUS.length
        return { ...c, s, h: [...c.h, ['сега', `Статус: ${STATUS[s]}`]] }
      }),
    )

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white text-[14px]">
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line px-3.5 py-3">
        <Seg
          label="Изглед"
          value={view}
          onChange={setView}
          options={[
            { value: 'rep', label: 'Продавач: Иван' },
            { value: 'owner', label: 'Собственик' },
          ]}
        />
        <Seg
          label="Филтър"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'today', label: 'Обади се днес' },
            { value: 'all', label: 'Всички' },
          ]}
        />
      </div>

      <div className="grid grid-cols-3 border-b border-line" aria-live="polite">
        {kpis.map(([n, label], i) => (
          <div key={label} className={`px-3.5 py-3 ${i < 2 ? 'border-r border-line' : ''}`}>
            <b className="block font-display text-[22px] font-semibold tracking-[-0.02em] tabular-nums">{n}</b>
            <span className="text-[12px] leading-tight text-stone">{label}</span>
          </div>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="m-0 px-3.5 py-6 text-[13px] text-stone">Няма клиенти в този списък.</p>
      ) : (
        <ul className="m-0 list-none p-0">
          {list.map((c, i) => {
            const isOpen = open === c.n
            return (
              <li key={c.n} className={i > 0 ? 'border-t border-line' : ''}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 px-3.5 py-[11px] transition-colors hover:bg-cream min-[480px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : c.n)}
                    className="col-span-1 min-w-0 text-left min-[480px]:col-span-2 min-[480px]:grid min-[480px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[480px]:items-center min-[480px]:gap-2.5"
                  >
                    <span className="block min-w-0 font-semibold">
                      {c.n}
                      <small className="block text-[11.5px] font-medium text-stone">
                        {c.p}
                        {view === 'owner' && ` · ${c.rep}`}
                      </small>
                    </span>
                    <span className="hidden min-w-0 truncate text-[13px] text-stone min-[480px]:block">{c.i}</span>
                  </button>
                  <button
                    type="button"
                    title="Смени статуса"
                    aria-label={`Статус: ${STATUS[c.s]}. Смени статуса`}
                    onClick={() => nextStatus(c.n)}
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      c.s === 0 ? 'bg-ink text-cream' : 'bg-cream-deep text-stone hover:text-ink'
                    } ${c.s === 3 ? 'opacity-55' : ''}`}
                  >
                    {STATUS[c.s]}
                  </button>
                </div>
                {isOpen && (
                  <div className="border-t border-dashed border-line px-3.5 pb-3.5 text-[13px] text-stone">
                    <div className="py-2 text-ink min-[480px]:hidden">{c.i}</div>
                    {c.h.map(([when, what], k) => (
                      <div key={k} className="flex gap-3 border-b border-line py-2 last:border-b-0">
                        <b className="min-w-12 font-semibold tabular-nums text-stone">{when}</b>
                        <span>{what}</span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
