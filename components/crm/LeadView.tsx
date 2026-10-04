'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { formatPhone } from '@/lib/phone'
import { formatDay, STAGES, STAGE_LABEL, todayIso, type CrmEvent, type CrmLead, type Stage } from '@/lib/crm'
import { crmApi, useCrm } from './CrmShell'
import { CallDialog, NotNowDialog } from './Dialogs'
import { Due, MoreMenu, Stars, telHref } from './ui'

// Lead page (/vatreshno/lead/[id]) in the style of design/core-app.html: stage as dots with words, contacts as
// a quiet list, next call day, notes and the full history. No cars or warranties (the „Автокъщи“ package later).

const WHEN = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Sofia' })

function eventText(e: CrmEvent): { title: string; body?: string | null; dot?: string } {
  switch (e.type) {
    case 'note':
      return { title: 'Бележка', body: e.body }
    case 'call':
      return { title: e.next_call_at ? `Звънях · следващо обаждане ${formatDay(e.next_call_at)}` : 'Звънях', body: e.body, dot: 'var(--k-ink)' }
    case 'stage':
      return {
        title: `${STAGE_LABEL[e.from_status as Stage] ?? e.from_status ?? '—'} → ${STAGE_LABEL[e.to_status as Stage] ?? e.to_status}`,
        body: e.body,
        dot: e.to_status ? `var(--s-${e.to_status})` : undefined,
      }
    case 'next_call':
      return { title: e.next_call_at ? `Следващо обаждане: ${formatDay(e.next_call_at)}` : 'Без дата за обаждане' }
    case 'import':
      return { title: e.body ?? 'Внесен' }
    default:
      return { title: 'Създаден' }
  }
}

export function LeadView({ id }: { id: string }) {
  const { replace, toast, block } = useCrm()
  const [lead, setLead] = useState<CrmLead | null>(null)
  const [events, setEvents] = useState<CrmEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [calling, setCalling] = useState(false)
  const [notNow, setNotNow] = useState(false)

  const load = useCallback(async () => {
    try {
      const d = await crmApi<{ lead: CrmLead; events: CrmEvent[] }>(`/api/vatreshno/leads/${id}`)
      setLead(d.lead)
      setEvents(d.events)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const patch = async (body: Record<string, unknown>, done?: string) => {
    try {
      const res = await crmApi<{ lead?: CrmLead }>(`/api/vatreshno/leads/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
      if (res.lead) replace(res.lead)
      await load()
      if (done) toast(done)
    } catch (e) {
      toast((e as Error).message, true)
    }
  }

  const setStage = (s: Stage) => {
    if (!lead || s === lead.status) return
    if (s === 'not_now') setNotNow(true)
    else patch({ status: s }, `Етап: ${STAGE_LABEL[s]}`)
  }

  const addNote = async () => {
    const text = note.trim()
    if (!text) return
    try {
      await crmApi(`/api/vatreshno/leads/${id}/events`, { method: 'POST', body: JSON.stringify({ type: 'note', body: text }) })
      setNote('')
      if (lead) replace({ ...lead, last_note: text })
      await load()
      toast('Бележката е записана')
    } catch (e) {
      toast((e as Error).message, true)
    }
  }

  if (error) {
    return (
      <>
        <p className="alert">{error}</p>
        <Link href="/vatreshno/tablo" className="btn">
          ← Към таблото
        </Link>
      </>
    )
  }
  if (!lead) return <p className="sub">Зареждам…</p>

  return (
    <>
      <div className="top">
        <div style={{ minWidth: 0 }}>
          <p className="sub" style={{ margin: '0 0 8px' }}>
            <Link href="/vatreshno/tablo">← Табло</Link>
          </p>
          <h1>{lead.name}</h1>
          <p className="sub num">
            {lead.category ?? '—'}
            {' · следващо обаждане: '}
            <Due next={lead.next_call_at} />
          </p>
        </div>
        <div className="tools">
          {lead.phone && (
            <a href={telHref(lead.phone)} className="btn num">
              {formatPhone(lead.phone)}
            </a>
          )}
          <button type="button" className="btn dark" onClick={() => setCalling(true)}>
            Звънях
          </button>
          <MoreMenu
            label={`Още за ${lead.name}`}
            items={lead.phone ? [{ label: 'Не ми звънете', danger: true, onSelect: async () => (await block(lead)) && load() }] : []}
          />
        </div>
      </div>

      <div className="lead">
        <div>
          <div className="sect">
            <p className="sec">Етап</p>
            <div className="stepper" role="radiogroup" aria-label="Етап">
              {STAGES.map((s) => (
                <button key={s.id} type="button" role="radio" aria-checked={s.id === lead.status} onClick={() => setStage(s.id)}>
                  <i style={{ background: `var(--s-${s.id})` }} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sect">
            <p className="sec">Данни</p>
            <dl className="kv">
              <dt>Телефон</dt>
              <dd className="num">{lead.phone ? <a href={telHref(lead.phone)}>{formatPhone(lead.phone)}</a> : '—'}</dd>
              <dt>Сайт</dt>
              <dd>
                {lead.website ? (
                  <a href={lead.website} target="_blank" rel="noreferrer">
                    {lead.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt>Имейл</dt>
              <dd>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : '—'}</dd>
              <dt>Адрес</dt>
              <dd>{lead.address ?? '—'}</dd>
              <dt>Оценка в Google</dt>
              <dd>{lead.rating != null ? <Stars rating={lead.rating} count={lead.review_count} /> : '—'}</dd>
              <dt>В етапа от</dt>
              <dd className="num">{lead.stage_changed_at ? formatDay(lead.stage_changed_at.slice(0, 10)) : '—'}</dd>
              <dt>Последно обаждане</dt>
              <dd className="num">{lead.last_contact_at ? WHEN.format(new Date(lead.last_contact_at)) : '—'}</dd>
            </dl>
          </div>

          <div className="sect" style={{ borderBottom: 0 }}>
            <p className="sec">Следващо обаждане</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="date"
                className="inp"
                style={{ width: 'auto' }}
                value={lead.next_call_at ?? ''}
                min={todayIso()}
                aria-label="Дата за следващо обаждане"
                onChange={(e) => patch({ next_call_at: e.target.value || null }, 'Датата е записана')}
              />
              {lead.next_call_at && (
                <button type="button" className="btn ghost" onClick={() => patch({ next_call_at: null }, 'Без дата')}>
                  Без дата
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="sect">
            <p className="sec">Бележка</p>
            <div className="note">
              <textarea
                className="inp"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Добави бележка…"
                aria-label="Бележка"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
                }}
              />
              <button type="button" className="btn" style={{ justifySelf: 'start' }} onClick={addNote} disabled={!note.trim()}>
                Запиши бележката
              </button>
            </div>
          </div>

          <p className="sec">История</p>
          {events.length === 0 ? (
            <p className="sub">Още няма записи.</p>
          ) : (
            <ol className="tl">
              {events.map((e) => {
                const t = eventText(e)
                return (
                  <li key={e.id} className="tli">
                    <i style={t.dot ? { background: t.dot } : undefined} />
                    <div>
                      <b>{t.title}</b>
                      {t.body && <p>{t.body}</p>}
                      <small className="num">{WHEN.format(new Date(e.created_at))}</small>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>

      {calling && <CallDialog lead={lead} onClose={() => setCalling(false)} onSaved={() => load()} />}
      {notNow && (
        <NotNowDialog
          lead={lead}
          onCancel={() => setNotNow(false)}
          onConfirm={(next, reason) => {
            setNotNow(false)
            patch({ status: 'not_now', next_call_at: next, reason }, 'Етап: Не сега')
          }}
        />
      )}
    </>
  )
}
