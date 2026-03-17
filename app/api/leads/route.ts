import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendLeadNotification } from '@/lib/email'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json([], { status: 200 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const body = await req.json()
  const { name, email, phone, source, notes } = body

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      email: email || null,
      phone: phone || null,
      source: source || 'web',
      status: 'new',
      notes: notes || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send email notification (fire and forget)
  sendLeadNotification({
    name,
    email: email || null,
    phone: phone || null,
    source: source || 'web',
    notes: notes || null,
    companyName: body.companyName || null,
  }).catch((err) => console.error('Lead email error:', err))

  return NextResponse.json(data, { status: 201 })
}
