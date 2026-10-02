import { NextRequest, NextResponse } from 'next/server'
import { isLocalRequest } from './local-only'
import { dbErrorMessage, getAdminSupabase } from './supabase/admin'

// Shared start of every CORE API route: local only (404 elsewhere) and a server-side Supabase client.

export type Db = NonNullable<ReturnType<typeof getAdminSupabase>>

export function coreDb(req: NextRequest): { db: Db; error?: undefined } | { db?: undefined; error: NextResponse } {
  if (!isLocalRequest(req.headers.get('host'))) return { error: new NextResponse(null, { status: 404 }) }
  const db = getAdminSupabase()
  if (!db) return { error: NextResponse.json({ error: 'Липсват ключовете за Supabase в .env.local.' }, { status: 503 }) }
  return { db }
}

export const dbError = (e: unknown, status = 500) =>
  NextResponse.json({ error: dbErrorMessage(e as { code?: string; message?: string }) }, { status })

export const badRequest = (message: string) => NextResponse.json({ error: message }, { status: 400 })

export const LEAD_FIELDS =
  'id, name, phone, email, website, address, category, rating, review_count, status, next_call_at, last_contact_at, stage_changed_at, position, created_at'
