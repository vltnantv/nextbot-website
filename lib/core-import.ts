// CORE import from a gosom/google-maps-scraper CSV. Pure functions, used by the preview in the browser
// and again on the server before anything is written (the server never trusts the browser's result).

import { normalizePhone } from './phone'

/** Columns of the gosom CSV that we use (the file has ~35; the rest are ignored). */
export type GoogleMapsRow = {
  title?: string
  address?: string
  phone?: string
  website?: string
  review_rating?: string
  review_count?: string
  emails?: string
  category?: string
}

export type ImportCandidate = {
  name: string
  phoneRaw: string
  phone: string | null // +359…
  email: string | null
  address: string | null
  website: string | null
  rating: number | null
  reviewCount: number | null
  category: string | null
}

export type RowStatus = 'new' | 'duplicate' | 'exists' | 'blocked' | 'no_phone' | 'invalid_phone' | 'no_name'

export type ClassifiedRow = ImportCandidate & { status: RowStatus }

export const STATUS_LABEL: Record<RowStatus, string> = {
  new: 'Нов',
  duplicate: 'Дубликат във файла',
  exists: 'Вече в CORE',
  blocked: 'В „Не ми звънете“',
  no_phone: 'Без телефон',
  invalid_phone: 'Невалиден телефон',
  no_name: 'Без име',
}

const clean = (v: string | undefined, max = 300) => {
  const t = (v ?? '').trim()
  return t ? t.slice(0, max) : null
}

const num = (v: string | undefined) => {
  const n = Number((v ?? '').trim())
  return Number.isFinite(n) && (v ?? '').trim() !== '' ? n : null
}

/** First valid-looking email from the `emails` column (gosom joins several with commas). */
export function firstEmail(v: string | undefined): string | null {
  for (const part of (v ?? '').split(/[,;\s]+/)) {
    const e = part.trim().toLowerCase()
    if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(e)) return e.slice(0, 200)
  }
  return null
}

export function toCandidate(row: GoogleMapsRow): ImportCandidate {
  const phoneRaw = (row.phone ?? '').trim()
  const rating = num(row.review_rating)
  return {
    name: clean(row.title, 200) ?? '',
    phoneRaw,
    phone: normalizePhone(phoneRaw)?.e164 ?? null,
    email: firstEmail(row.emails),
    address: clean(row.address),
    website: clean(row.website, 300),
    rating: rating === null ? null : Math.round(rating * 10) / 10,
    reviewCount: num(row.review_count),
    category: clean(row.category, 120),
  }
}

/**
 * Status of every row: rows without a usable phone are skipped (they cannot be called and cannot be
 * de-duplicated by phone); the first row with a phone wins, later ones are duplicates; phones already in
 * CORE or on the „Не ми звънете“ list are not imported.
 */
export function classify(rows: GoogleMapsRow[], existing: Set<string>, blocked: Set<string>): ClassifiedRow[] {
  const seen = new Set<string>()
  return rows.map((row) => {
    const c = toCandidate(row)
    let status: RowStatus
    if (!c.name) status = 'no_name'
    else if (!c.phoneRaw) status = 'no_phone'
    else if (!c.phone) status = 'invalid_phone'
    else if (blocked.has(c.phone)) status = 'blocked'
    else if (existing.has(c.phone)) status = 'exists'
    else if (seen.has(c.phone)) status = 'duplicate'
    else status = 'new'
    if (c.phone && status === 'new') seen.add(c.phone)
    return { ...c, status }
  })
}

/** The gosom file must at least have these columns. */
export const REQUIRED_COLUMNS = ['title', 'phone'] as const
