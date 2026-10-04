'use client'

import { formatPhone } from '@/lib/phone'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { todayIso, todayList, type CrmLead } from '@/lib/crm'
import { crmApi, useCrm } from './CrmShell'
import { CallDialog } from './Dialogs'
import { Avatar, CallChip, Icon, Rating, StageChip, telHref } from './ui'

// „Днес“ (/core/dnes): who to call today. Late first (oldest first), then today, then new leads without a
// date. „Звънях“ records the result and the next call; „Не ми звънете“ blocks the number for good.

function Row({ lead, today, onCall, onBlock }: { lead: CrmLead; today: string; onCall: () => void; onBlock: () => void }) {
  return (
    <div className="row">
      <Avatar name={lead.name} />
      <div style={{ minWidth: 0, display: 'grid', gap: 2 }}>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href={`/core/lead/${lead.id}`} className="tt">
            {lead.name}
          </Link>
          <StageChip stage={lead.status} />
          <CallChip next={lead.next_call_at} today={today} />
        </span>
        <span className="ts">
          {lead.category ?? '—'}
          {lead.rating != null && (
            <>
              {' · '}
              <Rating rating={lead.rating} count={lead.review_count} />
            </>
          )}
          {lead.last_note && <> · „{lead.last_note}“</>}
        </span>
      </div>
      <div className="acts">
        {lead.phone ? (
          <a href={telHref(lead.phone)} className="btn sm tel num">
            <Icon name="phone" size={14} />
            {formatPhone(lead.phone)}
          </a>
        ) : (
          <span className="chip">без телефон</span>
        )}
        <button type="button" className="btn sm pri" onClick={onCall}>
          Звънях
        </button>
        {lead.phone && (
          <button type="button" className="btn sm ghost danger" onClick={onBlock} title="Добави в „Не ми звънете“">
            <Icon name="ban" size={14} />
            <span className="sr-only">Не ми звънете</span>
          </button>
        )}
      </div>
    </div>
  )
}

export function Today() {
  const { leads, replace, toast, loading } = useCrm()
  const today = todayIso()
  const { late, due, fresh } = useMemo(() => todayList(leads, today), [leads, today])
  const [calling, setCalling] = useState<CrmLead | null>(null)
  const [freshShown, setFreshShown] = useState(20)

  const block = async (lead: CrmLead) => {
    if (!lead.phone) return
    if (!window.confirm(`${lead.name} (${lead.phone}) в „Не ми звънете“? Номерът няма да се внася повторно и лийдът отива в „Не сега“ без дата.`)) return
    try {
      await crmApi('/api/core/dnc', { method: 'POST', body: JSON.stringify({ phone: lead.phone, reason: lead.name }) })
      const { lead: saved } = await crmApi<{ lead: CrmLead }>(`/api/core/leads/${lead.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'not_now', next_call_at: null, reason: 'Не ми звънете' }),
      })
      if (saved) replace(saved)
      toast(`${lead.name} е в „Не ми звънете“`)
    } catch (e) {
      toast((e as Error).message, true)
    }
  }

  const group = (title: string, list: CrmLead[], note: string, limit?: number) => (
    <section className="panel">
      <h3>
        {title}
        <span className="r num">{list.length}</span>
      </h3>
      {list.length === 0 ? (
        <div className="empty">{note}</div>
      ) : (
        <div className="rows">
          {list.slice(0, limit ?? list.length).map((l) => (
            <Row key={l.id} lead={l} today={today} onCall={() => setCalling(l)} onBlock={() => block(l)} />
          ))}
        </div>
      )}
      {limit !== undefined && list.length > limit && (
        <button type="button" className="btn sm" style={{ marginTop: 10 }} onClick={() => setFreshShown((n) => n + 20)}>
          Покажи още ({list.length - limit})
        </button>
      )}
    </section>
  )

  return (
    <>
      <div className="top">
        <div className="grow">
          <h1>Днес</h1>
          <div className="sub">
            {new Intl.DateTimeFormat('bg-BG', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Sofia' }).format(new Date())}
          </div>
        </div>
      </div>

      <div className="kpis">
        <div className={`kpi ${late.length ? 'alert' : ''}`}>
          <span className="lab">Закъснели</span>
          <span className="val num">{late.length}</span>
        </div>
        <div className="kpi">
          <span className="lab">За днес</span>
          <span className="val num">{due.length}</span>
        </div>
        <div className="kpi">
          <span className="lab">Нови без дата</span>
          <span className="val num">{fresh.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="empty">Зареждам…</div>
      ) : (
        <div className="grid">
          {late.length > 0 && group('Закъснели', late, '')}
          {group('За днес', due, late.length || fresh.length ? 'Няма обаждания с днешна дата.' : 'Всичко за днес е свършено.')}
          {group('Нови без дата', fresh, 'Няма нови лийдове. Внесете от „Внос“.', freshShown)}
        </div>
      )}

      {calling && <CallDialog lead={calling} onClose={() => setCalling(null)} />}
    </>
  )
}
