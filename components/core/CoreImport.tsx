'use client'

import Papa from 'papaparse'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { INPUT } from '@/components/forms/fields'
import { classify, REQUIRED_COLUMNS, STATUS_LABEL, type ClassifiedRow, type GoogleMapsRow, type RowStatus } from '@/lib/core-import'
import { normalizePhone } from '@/lib/phone'

// /core/vnos: upload → preview (counts, table, ticks) → import the ticked rows as „Нов“.
// Plus the „Не ми звънете“ list: add / remove numbers; a listed number is never imported again.

type Known = { existing: Set<string>; blocked: Set<string> }
type Dnc = { phone: string; reason: string | null; created_at: string }

const BTN = 'min-h-11 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors disabled:opacity-40'
const PRIMARY = `${BTN} bg-ink text-cream hover:bg-ink/90`
const SECONDARY = `${BTN} border border-line bg-white text-ink hover:border-ink`
const STATUS_STYLE: Record<RowStatus, string> = {
  new: 'bg-online/15 text-online-text',
  duplicate: 'bg-cream-deep text-stone',
  exists: 'bg-cream-deep text-stone',
  blocked: 'bg-[#F6E1DC] text-[#9A3B2E]',
  no_phone: 'bg-cream-deep text-stone',
  invalid_phone: 'bg-[#F6E1DC] text-[#9A3B2E]',
  no_name: 'bg-cream-deep text-stone',
}
const ORDER: RowStatus[] = ['new', 'duplicate', 'exists', 'blocked', 'no_phone', 'invalid_phone', 'no_name']
const PAGE = 200

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || `Грешка ${res.status}`)
  return data as T
}

export function CoreImport() {
  const [known, setKnown] = useState<Known>({ existing: new Set(), blocked: new Set() })
  const [dbError, setDbError] = useState<string | null>(null)
  const [dnc, setDnc] = useState<Dnc[]>([])

  const [fileName, setFileName] = useState<string | null>(null)
  const [rows, setRows] = useState<GoogleMapsRow[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<RowStatus | 'all'>('all')
  const [shown, setShown] = useState(PAGE)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const loadKnown = useCallback(async () => {
    try {
      const [k, list] = await Promise.all([
        api<{ existing: string[]; blocked: string[] }>('/api/core/import'),
        api<Dnc[]>('/api/core/dnc'),
      ])
      setKnown({ existing: new Set(k.existing), blocked: new Set(k.blocked) })
      setDnc(list)
      setDbError(null)
    } catch (e) {
      setDbError((e as Error).message)
    }
  }, [])

  useEffect(() => {
    loadKnown()
  }, [loadKnown])

  const classified: ClassifiedRow[] = useMemo(() => classify(rows, known.existing, known.blocked), [rows, known])

  // tick every new row whenever the file or the known phones change
  useEffect(() => {
    setSelected(new Set(classified.flatMap((r, i) => (r.status === 'new' ? [i] : []))))
  }, [classified])

  const counts = useMemo(() => {
    const c = {} as Record<RowStatus, number>
    for (const r of classified) c[r.status] = (c[r.status] ?? 0) + 1
    return c
  }, [classified])

  const visible = classified.map((r, i) => ({ r, i })).filter(({ r }) => filter === 'all' || r.status === filter)

  const onFile = (file: File) => {
    setFileName(file.name)
    setFileError(null)
    setResult(null)
    setShown(PAGE)
    setFilter('all')
    Papa.parse<GoogleMapsRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const fields = res.meta.fields ?? []
        const missing = REQUIRED_COLUMNS.filter((c) => !fields.includes(c))
        if (missing.length) {
          setRows([])
          setFileError(`Това не прилича на файл от google-maps-scraper: липсват колони ${missing.join(', ')}.`)
          return
        }
        setRows(res.data)
      },
      error: (err) => setFileError(`Файлът не може да се прочете: ${err.message}`),
    })
  }

  const doImport = async () => {
    const picked = Array.from(selected).sort((a, b) => a - b).map((i) => rows[i])
    if (!picked.length) return
    setImporting(true)
    setResult(null)
    try {
      const r = await api<{ inserted: number; skipped: number }>('/api/core/import', { method: 'POST', body: JSON.stringify({ rows: picked }) })
      setResult(`Внесени: ${r.inserted} като „Нов“.${r.skipped ? ` Пропуснати като вече съществуващи: ${r.skipped}.` : ''}`)
      await loadKnown() // the imported phones are now „Вече в CORE“
    } catch (e) {
      setResult((e as Error).message)
    } finally {
      setImporting(false)
    }
  }

  const block = async (phone: string, reason: string | null) => {
    try {
      await api('/api/core/dnc', { method: 'POST', body: JSON.stringify({ phone, reason }) })
      await loadKnown()
    } catch (e) {
      setDbError((e as Error).message)
    }
  }

  const unblock = async (phone: string) => {
    try {
      await api('/api/core/dnc', { method: 'DELETE', body: JSON.stringify({ phone }) })
      await loadKnown()
    } catch (e) {
      setDbError((e as Error).message)
    }
  }

  const toggle = (i: number) =>
    setSelected((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })

  return (
    <div className="flex flex-col gap-10">
      {dbError && (
        <p role="alert" className="m-0 rounded-card border border-[#E8C4BC] bg-[#FBEFEC] px-5 py-4 text-[15px] text-[#9A3B2E]">
          {dbError}
        </p>
      )}

      {/* 1. file */}
      <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6 shadow-soft">
        <h2 className="m-0 font-display text-[22px] font-semibold">1. Файл</h2>
        <label className="flex flex-wrap items-center gap-4">
          <span className={SECONDARY + ' inline-flex cursor-pointer items-center'}>Изберете CSV файл</span>
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <span className="text-[15px] text-stone">{fileName ?? 'results.csv от gmaps-output'}</span>
        </label>
        {fileError && (
          <p role="alert" className="m-0 text-[15px] text-[#9A3B2E]">
            {fileError}
          </p>
        )}
      </section>

      {/* 2. preview */}
      {rows.length > 0 && (
        <section className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="m-0 font-display text-[22px] font-semibold">2. Преглед</h2>
            <span className="text-[15px] text-stone">{rows.length} реда във файла</span>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Филтър">
            {(['all', ...ORDER] as const).map((s) => {
              const n = s === 'all' ? rows.length : counts[s] ?? 0
              if (s !== 'all' && !n) return null
              const on = filter === s
              return (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setFilter(s)
                    setShown(PAGE)
                  }}
                  className={`${BTN} min-h-10 py-2 ${on ? 'bg-ink text-cream' : 'border border-line bg-white text-ink hover:border-ink'}`}
                >
                  {s === 'all' ? 'Всички' : STATUS_LABEL[s]} · {n}
                </button>
              )
            })}
          </div>

          <div className="overflow-x-auto rounded-card border border-line">
            <table className="w-full min-w-[980px] border-collapse text-left text-[14px]">
              <thead className="bg-cream-deep text-[13px] text-stone">
                <tr>
                  <th className="w-10 px-3 py-2.5">
                    <span className="sr-only">Внеси</span>
                  </th>
                  <th className="px-3 py-2.5 font-medium">Име</th>
                  <th className="px-3 py-2.5 font-medium">Телефон</th>
                  <th className="px-3 py-2.5 font-medium">Имейл</th>
                  <th className="px-3 py-2.5 font-medium">Адрес</th>
                  <th className="px-3 py-2.5 font-medium">Оценка</th>
                  <th className="px-3 py-2.5 font-medium">Статус</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {visible.slice(0, shown).map(({ r, i }) => (
                  <tr key={i} className="border-t border-line align-top">
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        aria-label={`Внеси ${r.name}`}
                        disabled={r.status !== 'new'}
                        checked={selected.has(i)}
                        onChange={() => toggle(i)}
                        className="h-4 w-4 accent-[#1F1D1A]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-medium">{r.name || '—'}</span>
                      {r.website && (
                        <a href={r.website} target="_blank" rel="noreferrer" className="block max-w-[240px] truncate text-[13px] text-stone underline">
                          {r.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">
                      {r.phone ?? '—'}
                      {r.phoneRaw && r.phoneRaw !== r.phone && <span className="block text-[12px] text-stone">{r.phoneRaw}</span>}
                    </td>
                    <td className="px-3 py-2.5">{r.email ?? <span className="text-stone">—</span>}</td>
                    <td className="max-w-[260px] px-3 py-2.5 text-stone">{r.address ?? '—'}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 tabular-nums">
                      {r.rating !== null ? `★ ${r.rating.toFixed(1)}` : '—'}
                      {r.reviewCount !== null && <span className="text-stone"> · {r.reviewCount}</span>}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-medium ${STATUS_STYLE[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {r.phone && r.status !== 'blocked' && (
                        <button type="button" onClick={() => block(r.phone!, r.name)} className="whitespace-nowrap text-[13px] text-stone underline hover:text-ink">
                          Не ми звънете
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visible.length > shown && (
            <button type="button" onClick={() => setShown((n) => n + PAGE)} className={`${SECONDARY} self-start`}>
              Покажи още ({visible.length - shown})
            </button>
          )}

          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
            <button type="button" onClick={doImport} disabled={importing || selected.size === 0 || !!dbError} className={PRIMARY}>
              {importing ? 'Внасям…' : `Внеси ${selected.size} като „Нов“`}
            </button>
            {result && (
              <p role="status" className="m-0 text-[15px]">
                {result}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 3. do not call */}
      <DncPanel list={dnc} onAdd={block} onRemove={unblock} disabled={!!dbError} />
    </div>
  )
}

function DncPanel({
  list,
  onAdd,
  onRemove,
  disabled,
}: {
  list: Dnc[]
  onAdd: (phone: string, reason: string | null) => Promise<void>
  onRemove: (phone: string) => Promise<void>
  disabled: boolean
}) {
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const normalized = normalizePhone(phone)?.e164 ?? null

  return (
    <section className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-1">
        <h2 className="m-0 font-display text-[22px] font-semibold">Не ми звънете · {list.length}</h2>
        <p className="m-0 text-[15px] text-stone">Тези номера не се внасят повторно, дори ако клиентът е изтрит от CORE.</p>
      </div>
      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!normalized) return
          await onAdd(normalized, reason.trim() || null)
          setPhone('')
          setReason('')
        }}
      >
        <label className="flex flex-col gap-1.5 text-[14px] font-medium">
          Телефон
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`${INPUT} w-[220px]`} />
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] font-medium">
          Причина (по желание)
          <input value={reason} onChange={(e) => setReason(e.target.value)} className={`${INPUT} w-[300px]`} />
        </label>
        <button type="submit" disabled={!normalized || disabled} className={PRIMARY}>
          Добави
        </button>
        {phone && <span className="pb-3 text-[14px] text-stone">{normalized ?? 'Невалиден телефон'}</span>}
      </form>
      {list.length > 0 && (
        <ul className="m-0 flex list-none flex-col divide-y divide-line rounded-card border border-line p-0">
          {list.map((d) => (
            <li key={d.phone} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-[15px]">
              <span className="tabular-nums">{d.phone}</span>
              <span className="flex-1 text-stone">{d.reason ?? ''}</span>
              <button type="button" onClick={() => onRemove(d.phone)} className="text-[14px] text-stone underline hover:text-ink">
                Махни
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
