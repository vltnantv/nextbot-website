// CORE (local CRM): stages, dates and the shared lead shape. Pure - used by pages, API and tests.
// Dates for calls are days only ('YYYY-MM-DD'), counted in Bulgarian time (Europe/Sofia).

export const STAGES = [
  { id: 'new', label: 'Нов' },
  { id: 'called', label: 'Звънях' },
  { id: 'meeting', label: 'Среща' },
  { id: 'offer', label: 'Оферта' },
  { id: 'client', label: 'Клиент' },
  { id: 'not_now', label: 'Не сега' },
] as const

export type Stage = (typeof STAGES)[number]['id']

export const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<Stage, string>
export const isStage = (v: unknown): v is Stage => typeof v === 'string' && v in STAGE_LABEL

/** „Не сега“ suggests the next call this many days later (can be left without a date) */
export const NOT_NOW_DAYS = 30

export type CrmLead = {
  id: string
  name: string
  phone: string | null
  email: string | null
  website: string | null
  address: string | null
  category: string | null
  rating: number | null
  review_count: number | null
  status: Stage
  next_call_at: string | null
  last_contact_at: string | null
  stage_changed_at: string | null
  position: number | null
  created_at: string
  last_note?: string | null
}

export type EventType = 'created' | 'import' | 'note' | 'call' | 'stage' | 'next_call'

export type CrmEvent = {
  id: string
  lead_id: string
  type: EventType
  body: string | null
  from_status: string | null
  to_status: string | null
  next_call_at: string | null
  created_at: string
}

// ── dates ───────────────────────────────────────────────────────────────────

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/
export const isIsoDay = (v: unknown): v is string => typeof v === 'string' && ISO_DAY.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`))

/** Today in Bulgaria as 'YYYY-MM-DD' (en-CA formats dates as ISO). */
export function todayIso(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Sofia', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000)
}

/** „днес“, „утре“, „вчера“, „след 3 дни“, „преди 2 дни“ (as in the demo). */
export function relativeDay(iso: string, today: string = todayIso()): string {
  const n = daysBetween(today, iso)
  if (n === 0) return 'днес'
  if (n === 1) return 'утре'
  if (n === -1) return 'вчера'
  return n > 0 ? `след ${n} дни` : `преди ${-n} дни`
}

const DATE_BG = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'short', timeZone: 'UTC' })
export const formatDay = (iso: string) => DATE_BG.format(new Date(`${iso}T00:00:00Z`))

export type CallState = 'late' | 'today' | 'later' | 'none'

export function callState(next: string | null, today: string = todayIso()): CallState {
  if (!next) return 'none'
  const n = daysBetween(today, next)
  return n < 0 ? 'late' : n === 0 ? 'today' : 'later'
}

/**
 * „Днес“: overdue first (oldest first), then today, then new leads that have no date yet.
 * Leads on „Клиент“ or „Не сега“ without a date are not on the list.
 */
export function todayList(leads: CrmLead[], today: string = todayIso()) {
  const late: CrmLead[] = []
  const due: CrmLead[] = []
  const fresh: CrmLead[] = []
  for (const l of leads) {
    const s = callState(l.next_call_at, today)
    if (s === 'late') late.push(l)
    else if (s === 'today') due.push(l)
    else if (s === 'none' && l.status === 'new') fresh.push(l)
  }
  late.sort((a, b) => (a.next_call_at! < b.next_call_at! ? -1 : 1))
  fresh.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  return { late, due, fresh }
}

/** Position between two neighbours when a card is dropped in a column (fractional ordering). */
export function positionBetween(before: number | null | undefined, after: number | null | undefined): number {
  if (before == null && after == null) return 0
  if (before == null) return (after as number) - 1
  if (after == null) return before + 1
  return (before + after) / 2
}

/** Number + word in the right form: plural(1, 'закъснял', 'закъснели') → „1 закъснял“, plural(2, …) → „2 закъснели“. */
export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
