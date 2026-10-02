import { NextRequest, NextResponse } from 'next/server'
import { badRequest, coreDb, dbError } from '@/lib/core-api'

// Order of the cards in one board column, after a drop: { ids: [...] } → position = index. Local only.
const MAX = 2000
const PARALLEL = 20

export async function POST(req: NextRequest) {
  const { db, error } = coreDb(req)
  if (error) return error
  const b = await req.json().catch(() => null)
  const ids: unknown[] = Array.isArray(b?.ids) ? b.ids : []
  if (!ids.length || ids.length > MAX || !ids.every((id) => typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id))) {
    return badRequest('Невалиден списък.')
  }
  for (let i = 0; i < ids.length; i += PARALLEL) {
    const results = await Promise.all(
      ids.slice(i, i + PARALLEL).map((id, j) => db.from('leads').update({ position: i + j }).eq('id', id as string)),
    )
    const failed = results.find((r) => r.error)
    if (failed?.error) return dbError(failed.error)
  }
  return NextResponse.json({ ok: true })
}
