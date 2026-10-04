'use client'

import { useEffect, useRef, useState } from 'react'
import { callState, daysBetween, formatDay, relativeDay, STAGE_LABEL, todayIso, type Stage } from '@/lib/crm'

// Shared pieces of the internal CORE app, after design/core-app.html: a stage is a coloured dot with a word,
// dates are plain text (red when late), no pills, no violet.

/** Stage: dot + word. Colours come from crm.css (--s-new … --s-not_now). */
export function StageDot({ stage }: { stage: Stage }) {
  return (
    <span className="stage">
      <i style={{ background: `var(--s-${stage})` }} />
      {STAGE_LABEL[stage]}
    </span>
  )
}

/** Next call as text: „преди 2 дни“ / „вчера“ in red when late, „днес“, „след 3 дни“, „—“ without a date. */
export function dueText(next: string | null, today = todayIso()): { text: string; late: boolean } {
  if (!next) return { text: '—', late: false }
  const s = callState(next, today)
  if (s === 'today') return { text: 'днес', late: false }
  if (s === 'late') return { text: relativeDay(next, today), late: true }
  return { text: daysBetween(today, next) <= 7 ? relativeDay(next, today) : formatDay(next), late: false }
}

export function Due({ next, today }: { next: string | null; today?: string }) {
  const d = dueText(next, today)
  return <span className={`due num ${d.late ? 'l' : ''}`}>{d.text}</span>
}

export function Avatar({ name }: { name: string }) {
  const letters = name
    .replace(/[„“"'()]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
  return (
    <span className="av" aria-hidden="true">
      {letters || '•'}
    </span>
  )
}

export function Stars({ rating, count }: { rating: number | null | undefined; count?: number | null }) {
  // no rating (or a broken value) → nothing, never „NaN“
  if (rating == null || !Number.isFinite(Number(rating))) return null
  return (
    <span className="stars num">
      ★ {Number(rating).toFixed(1)}
      {count != null && Number.isFinite(Number(count)) && <> · {count} отзива</>}
    </span>
  )
}

/** „⋯“ menu: opens on click, closes on Esc / outside click / choosing an item. */
export function MoreMenu({ label, items }: { label: string; items: { label: string; onSelect: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])
  return (
    <div ref={ref} style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <button type="button" className="more" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        ⋯
      </button>
      {open && (
        <div className="menu" role="menu">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              role="menuitem"
              className={it.danger ? 'danger' : ''}
              onClick={() => {
                setOpen(false)
                it.onSelect()
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
