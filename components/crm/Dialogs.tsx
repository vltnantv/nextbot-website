'use client'

import { formatPhone } from '@/lib/phone'
import { useEffect, useRef, useState } from 'react'
import { addDays, NOT_NOW_DAYS, STAGES, todayIso, type CrmLead, type Stage } from '@/lib/crm'
import { crmApi, useCrm } from './CrmShell'

// Dialogs of the CORE screens (the demo's modal): „Звънях“ and the date asked for „Не сега“.

function Modal({ title, sub, onClose, children }: { title: string; sub?: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const close = useRef(onClose)
  close.current = onClose
  // once on open: focus the first field, Esc closes, focus goes back where it was
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.querySelector<HTMLElement>('textarea, input, button')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close.current()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [])
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div ref={ref} className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div>
          <h2>{title}</h2>
          {sub && <div className="sub">{sub}</div>}
        </div>
        {children}
      </div>
    </>
  )
}

const PRESETS = [
  { label: 'Утре', days: 1 },
  { label: 'След 3 дни', days: 3 },
  { label: 'След седмица', days: 7 },
  { label: `След ${NOT_NOW_DAYS} дни`, days: NOT_NOW_DAYS },
]

/** Day picker: presets, a date field and „Без дата“. value null = no date. */
function NextCall({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const today = todayIso()
  return (
    <div className="field">
      Следващо обаждане
      <div className="presets">
        {PRESETS.map((p) => {
          const d = addDays(today, p.days)
          return (
            <button key={p.days} type="button" aria-pressed={value === d} onClick={() => onChange(d)}>
              {p.label}
            </button>
          )
        })}
        <button type="button" aria-pressed={value === null} onClick={() => onChange(null)}>
          Без дата
        </button>
      </div>
      <input type="date" className="inp" value={value ?? ''} min={today} onChange={(e) => onChange(e.target.value || null)} aria-label="Дата за следващо обаждане" />
    </div>
  )
}

/** „Звънях“: result, new stage, next call date. Saves a call in the history. */
export function CallDialog({ lead, onClose, onSaved }: { lead: CrmLead; onClose: () => void; onSaved?: (lead: CrmLead) => void }) {
  const { replace, toast } = useCrm()
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<Stage>(lead.status === 'new' ? 'called' : lead.status)
  const [next, setNext] = useState<string | null>(addDays(todayIso(), 3))
  const [busy, setBusy] = useState(false)

  const save = async () => {
    setBusy(true)
    try {
      const { lead: saved } = await crmApi<{ lead: CrmLead }>(`/api/vatreshno/leads/${lead.id}/events`, {
        method: 'POST',
        body: JSON.stringify({ type: 'call', body, status, next_call_at: next }),
      })
      replace({ ...saved, last_note: body.trim() || lead.last_note })
      onSaved?.(saved)
      toast('Обаждането е записано')
      onClose()
    } catch (e) {
      toast((e as Error).message, true)
      setBusy(false)
    }
  }

  return (
    <Modal title={`Звънях: ${lead.name}`} sub={lead.phone ? formatPhone(lead.phone) : undefined} onClose={onClose}>
      <label className="field">
        Какво стана
        <textarea className="inp" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="напр. Иска оферта до петък" />
      </label>
      <div className="field">
        Етап
        <div className="stepper" role="radiogroup" aria-label="Етап">
          {STAGES.map((s) => (
            <button key={s.id} type="button" role="radio" aria-checked={status === s.id} onClick={() => setStatus(s.id)}>
              <i style={{ background: `var(--s-${s.id})` }} />
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <NextCall value={next} onChange={setNext} />
      <div className="mfoot">
        <button type="button" className="btn" onClick={onClose}>
          Отказ
        </button>
        <button type="button" className="btn dark" onClick={save} disabled={busy}>
          Запиши
        </button>
      </div>
    </Modal>
  )
}

/** „Не сега“: suggests a call in 30 days; can be left without a date. Resolves with the choice or undefined. */
export function NotNowDialog({ lead, onCancel, onConfirm }: { lead: CrmLead; onCancel: () => void; onConfirm: (next: string | null, reason: string) => void }) {
  const [next, setNext] = useState<string | null>(addDays(todayIso(), NOT_NOW_DAYS))
  const [reason, setReason] = useState('')
  return (
    <Modal title={`Не сега: ${lead.name}`} sub="Кога да се обадим пак?" onClose={onCancel}>
      <label className="field">
        Причина (по желание)
        <input className="inp" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="напр. Ще мисли след сезона" />
      </label>
      <NextCall value={next} onChange={setNext} />
      <div className="mfoot">
        <button type="button" className="btn" onClick={onCancel}>
          Отказ
        </button>
        <button type="button" className="btn dark" onClick={() => onConfirm(next, reason)}>
          Премести в „Не сега“
        </button>
      </div>
    </Modal>
  )
}
