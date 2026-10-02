import { NextRequest, NextResponse } from 'next/server'
import { coreDb, dbError, LEAD_FIELDS } from '@/lib/core-api'
import type { CrmLead } from '@/lib/crm'

// All leads for the board and „Днес“, with the last note or call result of each. Local only.
const PAGE = 1000

export async function GET(req: NextRequest) {
  const { db, error } = coreDb(req)
  if (error) return error

  const leads: CrmLead[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error: e } = await db
      .from('leads')
      .select(LEAD_FIELDS)
      .order('position', { ascending: true })
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1)
    if (e) return dbError(e)
    leads.push(...((data ?? []) as unknown as CrmLead[]))
    if (!data || data.length < PAGE) break
  }

  // last note / call result per lead (newest first, first one wins)
  const { data: notes, error: e2 } = await db
    .from('lead_events')
    .select('lead_id, body')
    .in('type', ['note', 'call'])
    .not('body', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5000)
  if (e2) return dbError(e2)
  const last = new Map<string, string>()
  for (const n of notes ?? []) if (!last.has(n.lead_id)) last.set(n.lead_id, n.body)

  return NextResponse.json(leads.map((l) => ({ ...l, last_note: last.get(l.id) ?? null })))
}
