import { plural } from '@/lib/crm'

// Industry pages (copy/VISUALS.md): the cropped „Днес“ screen of CORE with rows from that industry. One component,
// different data - a live component in the look of design/core-app.html (cream, hairlines, stage as a dot with a
// word), not a screenshot. Made-up names („Пример“, „Демо“, „Образец“), phones with XXX.

type Stage = 'new' | 'called' | 'meeting' | 'offer' | 'client'
type Row = { name: string; kind: string; note: string; stage: Stage; due: string; late?: boolean }

const STAGE: Record<Stage, { label: string; color: string }> = {
  new: { label: 'Нов', color: '#8C857A' },
  called: { label: 'Звънях', color: '#C59A3D' },
  meeting: { label: 'Среща', color: '#3F7FB8' },
  offer: { label: 'Оферта', color: '#8A6A4A' },
  client: { label: 'Клиент', color: '#1F9D63' },
}

export const INDUSTRY_ROWS: Record<'avtokashti' | 'kliniki' | 'imoti' | 'hoteli', Row[]> = {
  avtokashti: [
    { name: 'Петър Демо', kind: 'Оглед', note: 'Иска оглед в събота.', stage: 'meeting', due: 'вчера', late: true },
    { name: 'Иван Пример', kind: 'Запитване', note: 'Има ли лизинг за този Golf?', stage: 'new', due: 'днес' },
    { name: 'Георги Образец', kind: 'Тест драйв', note: 'Тест драйв в петък следобед.', stage: 'called', due: 'днес' },
    { name: 'Мартин Демо', kind: 'Бартер', note: 'Пита за оценка на старата кола.', stage: 'offer', due: 'утре' },
  ],
  kliniki: [
    { name: 'Елена Образец', kind: 'Пропуснат час', note: 'Не дойде във вторник.', stage: 'called', due: 'преди 2 дни', late: true },
    { name: 'Мария Пример', kind: 'Почистване', note: 'Час за почистване.', stage: 'meeting', due: 'днес' },
    { name: 'Иван Демо', kind: 'Избелване', note: 'Чака оферта за избелване.', stage: 'offer', due: 'днес' },
    { name: 'Ралица Пример', kind: 'Профилактика', note: 'Контролен преглед след 6 месеца.', stage: 'client', due: 'след 3 дни' },
  ],
  imoti: [
    { name: 'Борис Образец', kind: 'Купувач', note: 'Чака отговор от банката.', stage: 'offer', due: 'вчера', late: true },
    { name: 'Стефан Демо', kind: 'Оглед', note: 'Оглед в събота, 11:00.', stage: 'meeting', due: 'днес' },
    { name: 'Анна Пример', kind: 'Запитване', note: 'Двустаен в Лозенец, с паркомясто.', stage: 'new', due: 'днес' },
    { name: 'Десислава Демо', kind: 'Купувач', note: 'Ще мисли до петък.', stage: 'called', due: 'утре' },
  ],
  hoteli: [
    { name: 'Мила Образец', kind: 'Група', note: 'Група от 12 души през юни.', stage: 'offer', due: 'преди 2 дни', late: true },
    { name: 'Николай Пример', kind: 'Нощувки', note: 'Стая за 2 нощувки от петък.', stage: 'new', due: 'днес' },
    { name: 'Анна Демо', kind: 'Въпрос', note: 'Пита за паркинг и закуска.', stage: 'called', due: 'днес' },
    { name: 'Петър Пример', kind: 'Резервация', note: 'Потвърди резервацията.', stage: 'client', due: 'утре' },
  ],
}

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export function IndustryToday({ industry }: { industry: keyof typeof INDUSTRY_ROWS }) {
  const rows = INDUSTRY_ROWS[industry]
  const late = rows.filter((r) => r.late).length
  const today = rows.filter((r) => r.due === 'днес').length
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-cream px-5 pb-3 pt-5 font-sans text-[14px] leading-[1.45] text-ink min-[700px]:px-7">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="block font-display text-[22px] font-semibold leading-none tracking-[-0.02em]">Днес</span>
          <span className="mt-2 block text-[13px] text-stone">
            {late > 0 && <span className="text-[#B4442E]">{plural(late, 'закъснял', 'закъснели')} · </span>}
            <span className="font-medium text-ink">{today}</span> за днес
          </span>
        </div>
        <span className="rounded-[6px] border border-dashed border-line px-2 py-0.5 text-[13px] text-[#8C867C]">Демо данни</span>
      </div>
      <ul className="m-0 list-none p-0">
        {rows.map((r) => (
          <li
            key={r.name}
            className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-b border-[#F0EBE2] py-3 last:border-b-0 min-[700px]:grid-cols-[28px_minmax(0,1.6fr)_104px_132px_92px]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-cream-deep text-[12px] font-medium text-stone" aria-hidden="true">
              {initials(r.name)}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium">{r.name}</span>
              <span className="block truncate text-[13px] text-stone">
                {r.kind} · <q className="text-[#8C867C]">{r.note}</q>
              </span>
            </span>
            <span className="hidden items-center gap-1.5 text-[13px] text-stone min-[700px]:flex">
              <i className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: STAGE[r.stage].color }} aria-hidden="true" />
              {STAGE[r.stage].label}
            </span>
            <span className="hidden text-[13px] tabular-nums min-[700px]:block">+359 88 XXX XX {String(rows.indexOf(r) + 11)}</span>
            <span className={`text-right text-[13px] min-[700px]:text-left ${r.late ? 'text-[#B4442E]' : 'text-stone'}`}>{r.due}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
