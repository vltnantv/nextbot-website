import { NextRequest, NextResponse } from 'next/server'
import { badRequest, coreDb, dbError, LEAD_FIELDS } from '@/lib/core-api'
import { isIsoDay, isStage } from '@/lib/crm'

// A note or a call on a lead. Local only.
// { type: 'note', body }                                       → note in the history
// { type: 'call', body?, status?, next_call_at? (day or null) } → „Звънях“: last contact = now, optional
//   new stage and next call date; logged as a call (+ a stage change when the stage changes)

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { db, error } = coreDb(req)
  if (error) return error
  const b = await req.json().catch(() => null)
  if (!b || (b.type !== 'note' && b.type !== 'call')) return badRequest('Непознат вид запис.')
  const text = typeof b.body === 'string' ? b.body.trim().slice(0, 4000) : ''

  const { data: current, error: e1 } = await db.from('leads').select('status').eq('id', params.id).maybeSingle()
  if (e1) return dbError(e1)
  if (!current) return NextResponse.json({ error: 'Няма такъв лийд.' }, { status: 404 })

  if (b.type === 'note') {
    if (!text) return badRequest('Бележката е празна.')
    const { error: e2 } = await db.from('lead_events').insert({ lead_id: params.id, type: 'note', body: text })
    if (e2) return dbError(e2)
    return NextResponse.json({ ok: true })
  }

  // call
  const now = new Date().toISOString()
  const update: Record<string, unknown> = { last_contact_at: now, updated_at: now }
  const events: Record<string, unknown>[] = []
  let next: string | null | undefined
  if ('next_call_at' in b) {
    if (b.next_call_at !== null && !isIsoDay(b.next_call_at)) return badRequest('Невалидна дата.')
    next = b.next_call_at
    update.next_call_at = next
  }
  events.push({ lead_id: params.id, type: 'call', body: text || null, next_call_at: next ?? null })
  if (b.status !== undefined) {
    if (!isStage(b.status)) return badRequest('Непознат етап.')
    if (b.status !== current.status) {
      update.status = b.status
      update.stage_changed_at = now
      events.push({ lead_id: params.id, type: 'stage', from_status: current.status, to_status: b.status })
    }
  }

  const { data: lead, error: e3 } = await db.from('leads').update(update).eq('id', params.id).select(LEAD_FIELDS).single()
  if (e3) return dbError(e3)
  const { error: e4 } = await db.from('lead_events').insert(events)
  if (e4) return dbError(e4)
  return NextResponse.json({ lead })
}
