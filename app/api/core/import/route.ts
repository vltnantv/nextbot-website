import { NextRequest, NextResponse } from 'next/server'
import { classify, type GoogleMapsRow, type RowStatus } from '@/lib/core-import'
import { isLocalRequest } from '@/lib/local-only'
import { normalizePhone } from '@/lib/phone'
import { dbErrorMessage, getAdminSupabase } from '@/lib/supabase/admin'

// CORE import from a Google Maps CSV (page /core/vnos). Local only: 404 anywhere but `npm run dev` on localhost.
// GET  → phones already in CORE and on „Не ми звънете“ (for the preview)
// POST → { rows } the rows ticked in the preview; everything is checked again here before inserting

const notFound = () => new NextResponse(null, { status: 404 })
const PAGE = 1000
const BATCH = 500
const MAX_ROWS = 20000

type Db = NonNullable<ReturnType<typeof getAdminSupabase>>

async function knownPhones(db: Db) {
  const existing = new Set<string>()
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db.from('leads').select('phone, phone_normalized').range(from, from + PAGE - 1)
    if (error) throw error
    for (const l of data ?? []) {
      const p = l.phone_normalized ?? normalizePhone(l.phone)?.e164
      if (p) existing.add(p)
    }
    if (!data || data.length < PAGE) break
  }
  const blocked = new Set<string>()
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db.from('do_not_call').select('phone').range(from, from + PAGE - 1)
    if (error) throw error
    for (const d of data ?? []) blocked.add(d.phone)
    if (!data || data.length < PAGE) break
  }
  return { existing, blocked }
}

/** First line of each imported lead's history (lead_events, lib/supabase/core-crm.sql). Best effort. */
async function logImport(db: Db, ids: { id: string }[]) {
  if (!ids.length) return
  await db.from('lead_events').insert(ids.map(({ id }) => ({ lead_id: id, type: 'import', body: 'Внесен от Google Maps' })))
}

/** The full schema has tenants (leads.tenant_id is required); the demo schema has none. */
async function tenantId(db: Db): Promise<string | null> {
  const probe = await db.from('leads').select('tenant_id').limit(1)
  if (probe.error) return null // no tenant_id column
  const { data, error } = await db.from('tenants').select('id').limit(2)
  if (error || !data?.length) return null
  if (data.length > 1) throw new Error('В базата има повече от един tenant. Вносът не знае към кой да запише.')
  return data[0].id
}

export async function GET(req: NextRequest) {
  if (!isLocalRequest(req.headers.get('host'))) return notFound()
  const db = getAdminSupabase()
  if (!db) return NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 })
  try {
    const { existing, blocked } = await knownPhones(db)
    return NextResponse.json({ existing: Array.from(existing), blocked: Array.from(blocked) })
  } catch (e) {
    return NextResponse.json({ error: dbErrorMessage(e as { code?: string; message?: string }) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isLocalRequest(req.headers.get('host'))) return notFound()
  const db = getAdminSupabase()
  if (!db) return NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 })

  const body = await req.json().catch(() => null)
  const rows: GoogleMapsRow[] = Array.isArray(body?.rows) ? body.rows.slice(0, MAX_ROWS) : []
  if (!rows.length) return NextResponse.json({ error: 'Няма редове за внос.' }, { status: 400 })

  try {
    const { existing, blocked } = await knownPhones(db)
    const classified = classify(rows, existing, blocked)
    const counts = {} as Record<RowStatus, number>
    for (const r of classified) counts[r.status] = (counts[r.status] ?? 0) + 1

    const tenant = await tenantId(db)
    const toInsert = classified
      .filter((r) => r.status === 'new')
      .map((r) => ({
        ...(tenant ? { tenant_id: tenant } : {}),
        name: r.name,
        phone: r.phone,
        phone_normalized: r.phone,
        email: r.email,
        address: r.address,
        website: r.website,
        rating: r.rating,
        review_count: r.reviewCount,
        category: r.category,
        source: 'google_maps',
        status: 'new',
      }))

    let inserted = 0
    let skipped = 0
    for (let i = 0; i < toInsert.length; i += BATCH) {
      const batch = toInsert.slice(i, i + BATCH)
      const { data: ids, error } = await db.from('leads').insert(batch).select('id')
      if (!error) {
        inserted += batch.length
        await logImport(db, ids ?? [])
        continue
      }
      if (error.code !== '23505') throw error
      // someone added one of these phones meanwhile: insert one by one and skip the duplicates
      for (const row of batch) {
        const one = await db.from('leads').insert(row).select('id')
        if (!one.error) {
          inserted++
          await logImport(db, one.data ?? [])
        }
        else if (one.error.code === '23505') skipped++
        else throw one.error
      }
    }

    return NextResponse.json({ inserted, skipped, counts })
  } catch (e) {
    const err = e as { code?: string; message?: string }
    const msg = err.message?.startsWith('В базата') ? err.message : dbErrorMessage(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
