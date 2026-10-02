'use client'

import { formatPhone } from '@/lib/phone'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { formatDay, STAGES, STAGE_LABEL, todayIso, type CrmEvent, type CrmLead, type Stage } from '@/lib/crm'
import { crmApi, useCrm } from './CrmShell'
import { CallDialog, NotNowDialog } from './Dialogs'
import { CallChip, Icon, Rating, StageChip, telHref } from './ui'

// Lead page (/core/lead/[id]): stage, contacts, next call date, notes and the full history.
// The demo's record sheet, as a page. No cars or warranties (separate „Автокъщи“ package later).

const WHEN = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Sofia' })

function eventText(e: CrmEvent): { icon: 'note' | 'phone' | 'arrow' | 'today' | 'upload' | 'plus'; tone: '' | 'a' | 'ok'; title: string; body?: string | null } {
  switch (e.type) {
    case 'note':
      return { icon: 'note', tone: '', title: 'Бележка', body: e.body }
    case 'call':
      return {
        icon: 'phone',
        tone: 'a',
        title: e.next_call_at ? `Звънях · следващо обаждане ${formatDay(e.next_call_at)}` : 'Звънях',
        body: e.body,
      }
    case 'stage':
      return {
        icon: 'arrow',
        tone: e.to_status === 'client' ? 'ok' : 'a',
        title: `${STAGE_LABEL[e.from_status as Stage] ?? e.from_status ?? '—'} → ${STAGE_LABEL[e.to_status as Stage] ?? e.to_status}`,
        body: e.body,
      }
    case 'next_call':
      return { icon: 'today', tone: '', title: e.next_call_at ? `Следващо обаждане: ${formatDay(e.next_call_at)}` : 'Без дата за обаждане' }
    case 'import':
      return { icon: 'upload', tone: '', title: e.body ?? 'Внесен' }
    default:
      return { icon: 'plus', tone: '', title: 'Създаден' }
  }
}

export function LeadView({ id }: { id: string }) {
  const { replace, toast } = useCrm()
  const [lead, setLead] = useState<CrmLead | null>(null)
  const [events, setEvents] = useState<CrmEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [calling, setCalling] = useState(false)
  const [notNow, setNotNow] = useState(false)

  const load = useCallback(async () => {
    try {
      const d = await crmApi<{ lead: CrmLead; events: CrmEvent[] }>(`/api/core/leads/${id}`)
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
      const res = await crmApi<{ lead?: CrmLead }>(`/api/core/leads/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
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
      await crmApi(`/api/core/leads/${id}/events`, { method: 'POST', body: JSON.stringify({ type: 'note', body: text }) })
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
        <Link href="/core/tablo" className="btn">
          <Icon name="back" /> Към таблото
        </Link>
      </>
    )
  }
  if (!lead) return <div className="empty">Зареждам…</div>

  const current = STAGES.findIndex((s) => s.id === lead.status)

  return (
    <>
      <div className="top">
        <Link href="/core/tablo" className="btn ghost sm" aria-label="Към таблото">
          <Icon name="back" />
        </Link>
        <div className="grow">
          <h1>{lead.name}</h1>
          <div className="sub" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <StageChip stage={lead.status} />
            <CallChip next={lead.next_call_at} />
            {lead.category && <span>{lead.category}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {lead.phone && (
            <a href={telHref(lead.phone)} className="btn num">
              <Icon name="phone" size={14} /> {formatPhone(lead.phone)}
            </a>
          )}
          <button type="button" className="btn pri" onClick={() => setCalling(true)}>
            Звънях
          </button>
        </div>
      </div>

      <div className="lead">
        <div className="grid">
          <section className="panel">
            <p className="sec">Етап</p>
            <div className="stepper" role="radiogroup" aria-label="Етап">
              {STAGES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={s.id === lead.status}
                  className={s.id === lead.status ? 'cur' : i < current && lead.status !== 'not_now' ? 'past' : ''}
                  onClick={() => setStage(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <p className="sec">Данни</p>
            <div className="kv">
              <div>
                <small>Телефон</small>
                <b className="num">{lead.phone ? <a href={telHref(lead.phone)}>{formatPhone(lead.phone)}</a> : '—'}</b>
              </div>
              <div>
                <small>Сайт</small>
                <b>
                  {lead.website ? (
                    <a href={lead.website} target="_blank" rel="noreferrer">
                      {lead.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  ) : (
                    '—'
                  )}
                </b>
              </div>
              <div>
                <small>Имейл</small>
                <b>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : '—'}</b>
              </div>
              <div>
                <small>Оценка в Google</small>
                <b>{lead.rating !== null ? <Rating rating={lead.rating} count={lead.review_count} /> : '—'}</b>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <small>Адрес</small>
                <b>{lead.address ?? '—'}</b>
              </div>
              <div>
                <small>В етапа от</small>
                <b>{lead.stage_changed_at ? formatDay(lead.stage_changed_at.slice(0, 10)) : '—'}</b>
              </div>
              <div>
                <small>Последно обаждане</small>
                <b>{lead.last_contact_at ? WHEN.format(new Date(lead.last_contact_at)) : '—'}</b>
              </div>
            </div>
          </section>

          <section className="panel">
            <p className="sec">Следващо обаждане</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="date"
                className="inp"
                value={lead.next_call_at ?? ''}
                min={todayIso()}
                aria-label="Дата за следващо обаждане"
                onChange={(e) => patch({ next_call_at: e.target.value || null }, 'Датата е записана')}
              />
              {lead.next_call_at && (
                <button type="button" className="btn sm ghost" onClick={() => patch({ next_call_at: null }, 'Без дата')}>
                  Без дата
                </button>
              )}
            </div>
          </section>
        </div>

        <section className="panel">
          <p className="sec">Бележка</p>
          <div className="note">
            <textarea
              className="inp"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Добави бележка…"
              aria-label="Бележка"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
              }}
            />
            <button type="button" className="btn" onClick={addNote} disabled={!note.trim()}>
              Запиши
            </button>
          </div>

          <p className="sec" style={{ marginTop: 20 }}>
            История
          </p>
          {events.length === 0 ? (
            <div className="empty">Още няма записи.</div>
          ) : (
            <div className="tl">
              {events.map((e) => {
                const t = eventText(e)
                return (
                  <div key={e.id} className="tli">
                    <span className={`ic ${t.tone}`}>
                      <Icon name={t.icon} size={12} />
                    </span>
                    <div>
                      <div className="x1">
                        <b style={{ fontWeight: 500 }}>{t.title}</b>
                        {t.body && <div>{t.body}</div>}
                      </div>
                      <div className="x2">{WHEN.format(new Date(e.created_at))}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
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
