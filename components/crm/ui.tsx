'use client'

import { callState, daysBetween, formatDay, relativeDay, STAGE_LABEL, todayIso, type Stage } from '@/lib/crm'

// Small shared pieces of the CORE screens (icons, chips, avatar), in the style of design/avto-crm-demo.html.

const paths: Record<string, string> = {
  today: 'M8 2v3M16 2v3M3.5 9h17M5 4h14a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5 4Z',
  board: 'M4 4h4.5v16H4zM10 4h4.5v10H10zM16 4h4v13h-4z',
  upload: 'M12 15V4m0 0-4 4m4-4 4 4M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4',
  phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z',
  note: 'M5 4h14v16H5zM8 9h8M8 13h8M8 17h5',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  back: 'M19 12H5m5 5-5-5 5-5',
  ban: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM5.6 5.6l12.8 12.8',
  plus: 'M12 5v14M5 12h14',
}

export function Icon({ name, size = 16 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

const STAGE_CHIP: Record<Stage, string> = { new: 'a', called: '', meeting: 'warn', offer: 'warn', client: 'ok', not_now: '' }

export function StageChip({ stage }: { stage: Stage }) {
  return <span className={`chip ${STAGE_CHIP[stage]}`}>{STAGE_LABEL[stage]}</span>
}

/** Next call date: red when it is late, accent for today, plain otherwise. */
export function CallChip({ next, today = todayIso() }: { next: string | null; today?: string }) {
  if (!next) return null
  const s = callState(next, today)
  if (s === 'late') {
    const n = -daysBetween(today, next)
    return <span className="chip bad">закъсняло {n} {n === 1 ? 'ден' : 'дни'}</span>
  }
  return (
    <span className={`chip ${s === 'today' ? 'a' : ''}`} title={formatDay(next)}>
      {s === 'today' ? 'днес' : relativeDay(next, today)}
    </span>
  )
}

export function Avatar({ name }: { name: string }) {
  const letters = name
    .replace(/[„“"'()]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
  return <span className="av">{letters || '•'}</span>
}

export function Rating({ rating, count }: { rating: number | null | undefined; count: number | null | undefined }) {
  // no rating (or a broken value) → show nothing, never „NaN“
  if (rating == null || !Number.isFinite(Number(rating))) return null
  return (
    <span className="num" style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      <Icon name="star" size={12} /> {Number(rating).toFixed(1)}
      {count != null && Number.isFinite(Number(count)) && <span style={{ color: 'var(--faint)' }}> · {count}</span>}
    </span>
  )
}

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
