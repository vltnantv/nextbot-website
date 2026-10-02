import { NextRequest, NextResponse } from 'next/server'
import { badRequest, coreDb, dbError, LEAD_FIELDS } from '@/lib/core-api'
import { isIsoDay, isStage, STAGE_LABEL } from '@/lib/crm'

// One lead with its history (GET) and changes from the board / lead page (PATCH). Local only.
// PATCH { status?, reason?, position?, next_call_at? (YYYY-MM-DD or null) } - every change is logged.

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { db, error } = coreDb(req)
  if (error) return error
  const { data: lead, error: e1 } = await db.from('leads').select(LEAD_FIELDS).eq('id', params.id).maybeSingle()
  if (e1) return dbError(e1)
  if (!lead) return NextResponse.json({ error: 'Няма такъв лийд.' }, { status: 404 })
  const { data: events, error: e2 } = await db
    .from('lead_events')
    .select('id, lead_id, type, body, from_status, to_status, next_call_at, created_at')
    .eq('lead_id', params.id)
    .order('created_at', { ascending: false })
  if (e2) return dbError(e2)
  return NextResponse.json({ lead, events })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { db, error } = coreDb(req)
  if (error) return error
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return badRequest('Празна заявка.')

  const { data: current, error: e1 } = await db.from('leads').select('status, next_call_at').eq('id', params.id).maybeSingle()
  if (e1) return dbError(e1)
  if (!current) return NextResponse.json({ error: 'Няма такъв лийд.' }, { status: 404 })

  const update: Record<string, unknown> = {}
  const events: Record<string, unknown>[] = []
  const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 1000) || null : null

  if ('status' in body) {
    if (!isStage(body.status)) return badRequest('Непознат етап.')
    if (body.status !== current.status) {
      update.status = body.status
      update.stage_changed_at = new Date().toISOString()
      events.push({ lead_id: params.id, type: 'stage', from_status: current.status, to_status: body.status, body: reason })
    }
  }
  if ('position' in body) {
    if (typeof body.position !== 'number' || !Number.isFinite(body.position)) return badRequest('Невалидна позиция.')
    update.position = body.position
  }
  if ('next_call_at' in body) {
    const next = body.next_call_at
    if (next !== null && !isIsoDay(next)) return badRequest('Невалидна дата.')
    if (next !== current.next_call_at) {
      update.next_call_at = next
      events.push({ lead_id: params.id, type: 'next_call', next_call_at: next })
    }
  }
  if (!Object.keys(update).length) return NextResponse.json({ ok: true, unchanged: true })

  update.updated_at = new Date().toISOString()
  const { data: lead, error: e2 } = await db.from('leads').update(update).eq('id', params.id).select(LEAD_FIELDS).single()
  if (e2) return dbError(e2)
  if (events.length) {
    const { error: e3 } = await db.from('lead_events').insert(events)
    if (e3) return dbError(e3)
  }
  return NextResponse.json({ lead, stage: update.status ? STAGE_LABEL[update.status as keyof typeof STAGE_LABEL] : undefined })
}
