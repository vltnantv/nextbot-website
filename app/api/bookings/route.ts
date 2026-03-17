import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const body = await req.json()
  const { tenant_id, customer_name, customer_email, date, time_slot, notes } = body

  if (!customer_name || !date || !time_slot) {
    return NextResponse.json({ error: 'customer_name, date, and time_slot are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      tenant_id: tenant_id || null,
      customer_name,
      customer_email: customer_email || null,
      date,
      time_slot,
      status: 'pending',
      notes: notes || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
