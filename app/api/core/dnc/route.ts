import { NextRequest, NextResponse } from 'next/server'
import { isLocalRequest } from '@/lib/local-only'
import { normalizePhone } from '@/lib/phone'
import { dbErrorMessage, getAdminSupabase } from '@/lib/supabase/admin'

// „Не ми звънете“ list (page /core/vnos). Local only: 404 anywhere but `npm run dev` on localhost.
// A number on this list is never imported again, even if the lead was deleted from CORE.

const notFound = () => new NextResponse(null, { status: 404 })

export async function GET(req: NextRequest) {
  if (!isLocalRequest(req.headers.get('host'))) return notFound()
  const db = getAdminSupabase()
  if (!db) return NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 })
  const { data, error } = await db.from('do_not_call').select('phone, reason, created_at').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: dbErrorMessage(error) }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isLocalRequest(req.headers.get('host'))) return notFound()
  const db = getAdminSupabase()
  if (!db) return NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 })
  const body = await req.json().catch(() => null)
  const phone = normalizePhone(typeof body?.phone === 'string' ? body.phone : '')?.e164
  if (!phone) return NextResponse.json({ error: 'Невалиден телефон.' }, { status: 400 })
  const reason = typeof body?.reason === 'string' ? body.reason.trim().slice(0, 300) || null : null
  const { error } = await db.from('do_not_call').upsert({ phone, reason }, { onConflict: 'phone' })
  if (error) return NextResponse.json({ error: dbErrorMessage(error) }, { status: 500 })
  return NextResponse.json({ phone, reason })
}

export async function DELETE(req: NextRequest) {
  if (!isLocalRequest(req.headers.get('host'))) return notFound()
  const db = getAdminSupabase()
  if (!db) return NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 })
  const body = await req.json().catch(() => null)
  const phone = typeof body?.phone === 'string' ? body.phone : ''
  if (!phone) return NextResponse.json({ error: 'Липсва телефон.' }, { status: 400 })
  const { error } = await db.from('do_not_call').delete().eq('phone', phone)
  if (error) return NextResponse.json({ error: dbErrorMessage(error) }, { status: 500 })
  return NextResponse.json({ ok: true })
}
