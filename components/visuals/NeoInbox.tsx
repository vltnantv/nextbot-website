'use client'

import { useState } from 'react'

// NEO „Входяща кутия“ (copy/VISUALS.md): 4 conversations on the left, the open one on the right. A live component
// in the look of design/core-app.html - cream, ink, hairlines, dots instead of pills, Onest 13-14 px, no violet.
// Made-up data: an obviously fictional clinic and clients, phones with XXX. The questions and NEO's answers are
// the examples from copy/neo.md, copy/branshove.md and the homepage.

type Msg = { from: 'client' | 'neo'; text: string }
type Conversation = { id: string; name: string; time: string; messages: Msg[] }

const CONVERSATIONS: Conversation[] = [
  {
    id: 'a',
    name: 'Мария Пример',
    time: '22:47',
    messages: [
      { from: 'client', text: 'Здравейте, колко струва почистване на зъби?' },
      { from: 'neo', text: 'Здравейте! Почистването е 80 €. Искате ли да запазя час?' },
      { from: 'client', text: 'Да, за четвъртък следобед.' },
      { from: 'neo', text: 'В четвъртък има свободно в 15:00 и 16:30. Кой ви е удобен?' },
    ],
  },
  {
    id: 'b',
    name: 'Иван Демо',
    time: '21:14',
    messages: [
      { from: 'client', text: 'Здравейте, има ли свободен час утре?' },
      { from: 'neo', text: 'Здравейте! Утре има в 10:30 и 14:00. Кой час ви е удобен?' },
      { from: 'client', text: '10:30, благодаря.' },
      { from: 'neo', text: 'Записах ви за утре в 10:30. Ще получите напомняне вечерта.' },
    ],
  },
  {
    id: 'c',
    name: 'Елена Образец',
    time: '19:05',
    messages: [
      { from: 'client', text: 'Искам час за почистване.' },
      { from: 'neo', text: 'Има в четвъртък в 15:00 и в петък в 10:30. Кой ви е удобен?' },
    ],
  },
  {
    id: 'd',
    name: '+359 88 XXX XX 14',
    time: 'вчера',
    messages: [
      { from: 'client', text: 'Колко струва преглед?' },
      { from: 'neo', text: 'Не знам точната цена за вашия случай. Ще ви се обадим. На кой телефон да ви търсим?' },
    ],
  },
]

const initials = (name: string) =>
  /^\+/.test(name)
    ? '#'
    : name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')

export function NeoInbox() {
  const [openId, setOpenId] = useState(CONVERSATIONS[0].id)
  const open = CONVERSATIONS.find((c) => c.id === openId)!

  return (
    <div className="grid overflow-hidden rounded-[12px] border border-line bg-cream font-sans text-[14px] leading-[1.45] text-ink min-[640px]:grid-cols-[270px_minmax(0,1fr)]">
      {/* list */}
      <div className="border-b border-line min-[640px]:border-b-0 min-[640px]:border-r">
        <div className="flex items-baseline justify-between px-4 pb-2 pt-4">
          <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">Входяща кутия</span>
          <span className="text-[13px] text-[#8C867C]">4</span>
        </div>
        <ul className="m-0 list-none p-0 pb-2" role="listbox" aria-label="Разговори">
          {CONVERSATIONS.map((c) => {
            const on = c.id === openId
            const last = c.messages[c.messages.length - 1]
            return (
              <li key={c.id} role="option" aria-selected={on}>
                <button
                  type="button"
                  onClick={() => setOpenId(c.id)}
                  className={`grid w-full grid-cols-[28px_minmax(0,1fr)] gap-x-2.5 border-t border-[#F0EBE2] px-4 py-3 text-left transition-colors ${
                    on ? 'bg-white' : 'hover:bg-white/60'
                  }`}
                >
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-cream-deep text-[12px] font-medium text-stone" aria-hidden="true">
                    {initials(c.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[14px] font-medium">{c.name}</span>
                      <span className="shrink-0 text-[13px] tabular-nums text-[#8C867C]">{c.time}</span>
                    </span>
                    <span className="block truncate text-[13px] text-stone">{last.text}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-[13px] text-stone">
                      <i className="inline-block h-[7px] w-[7px] rounded-full bg-online" aria-hidden="true" />
                      отговорено
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* open conversation */}
      <div className="flex min-w-0 flex-col bg-white" data-open-conversation>
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <span className="min-w-0">
            <span className="block truncate font-medium">{open.name}</span>
            <span className="block text-[13px] text-stone">Дентален кабинет „Пример“ · от сайта</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[13px] text-stone">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-online" aria-hidden="true" />
            NEO отговаря
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-5 py-5" aria-live="polite">
          {open.messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-1 ${m.from === 'client' ? 'items-start' : 'items-end'}`}>
              {m.from === 'neo' && <span className="pr-1 text-[13px] text-[#8C867C]">NEO</span>}
              <span
                className={`max-w-[82%] rounded-[12px] px-3.5 py-2.5 text-[14px] leading-snug ${
                  m.from === 'client' ? 'rounded-bl-[4px] bg-cream-deep' : 'rounded-br-[4px] border border-line bg-cream'
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
