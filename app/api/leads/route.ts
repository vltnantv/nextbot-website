import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendLeadNotification } from '@/lib/email'
import { clientIp, createRateLimiter, HOUR } from '@/lib/rate-limit'

// Only POST: a new lead from a form on the site. There is no GET - leads are read only in CORE.

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// 5 leads per visitor IP per hour
const limit = createRateLimiter({ limit: 5, windowMs: HOUR })

// values go into the database and into an HTML email: trim, cap and escape them
const clean = (v: unknown, max = 200) =>
  (typeof v === 'string' ? v.trim().slice(0, max) : '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export async function POST(req: NextRequest) {
  const rl = limit(clientIp(req.headers))
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone, 40)
  const notes = clean(body.notes, 1000)
  const companyName = clean(body.companyName)

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  if (!email && !phone) return NextResponse.json({ error: 'Phone or email is required' }, { status: 400 })

  // the source is not taken from the browser: everything from here is "web"
  const { error } = await getSupabase()
    .from('leads')
    .insert({ name, email: email || null, phone: phone || null, source: 'web', status: 'new', notes: notes || null })

  if (error) {
    console.error('Lead insert failed:', error.code)
    return NextResponse.json({ error: 'Could not save' }, { status: 500 })
  }

  // email notification (fire and forget)
  sendLeadNotification({ name, email: email || null, phone: phone || null, source: 'web', notes: notes || null, companyName: companyName || undefined })
    .catch(() => console.error('Lead email failed'))

  return NextResponse.json({ success: true }, { status: 201 })
}
