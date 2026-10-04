'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { formatPhone } from '@/lib/phone'
import { plural, todayIso, todayList, type CrmLead } from '@/lib/crm'
import { useCrm, ViewSwitch } from './CrmShell'
import { CallDialog } from './Dialogs'
import { Avatar, Due, MoreMenu, StageDot, Stars, telHref } from './ui'

// „Днес“ (/vatreshno/dnes), after design/core-app.html: late, today, new without a date. Rows open the lead;
// „Звънях“ and „⋯“ (with „Не ми звънете“) show on hover (always on a phone).

const DATE = new Intl.DateTimeFormat('bg-BG', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Sofia' })

function Row({ lead, today, onCall }: { lead: CrmLead; today: string; onCall: () => void }) {
  const router = useRouter()
  const { block } = useCrm()
  const open = () => router.push(`/vatreshno/lead/${lead.id}`)
  return (
    // the whole row opens the lead with the mouse; for the keyboard the name is the link
    <div className="row" onClick={open}>
      <Avatar name={lead.name} />
      <div className="who">
        <b>
          <Link href={`/vatreshno/lead/${lead.id}`} onClick={(e) => e.stopPropagation()}>
            {lead.name}
          </Link>
        </b>
        <p>
          {lead.category ?? '—'}
          {lead.last_note ? (
            <>
              {' · '}
              <q>{lead.last_note}</q>
            </>
          ) : lead.rating != null ? (
            <>
              {' · '}
              <Stars rating={lead.rating} count={lead.review_count} />
            </>
          ) : null}
        </p>
      </div>
      <StageDot stage={lead.status} />
      {lead.phone ? (
        <a className="tel num" href={telHref(lead.phone)} onClick={(e) => e.stopPropagation()}>
          {formatPhone(lead.phone)}
        </a>
      ) : (
        <span className="due">—</span>
      )}
      <Due next={lead.next_call_at} today={today} />
      <div className="act">
        <button
          type="button"
          className="btn dark"
          onClick={(e) => {
            e.stopPropagation()
            onCall()
          }}
        >
          Звънях
        </button>
        <MoreMenu
          label={`Още за ${lead.name}`}
          items={[
            { label: 'Отвори', onSelect: open },
            ...(lead.phone ? [{ label: 'Не ми звънете', onSelect: () => void block(lead), danger: true }] : []),
          ]}
        />
      </div>
    </div>
  )
}

export function Today() {
  const { leads, loading } = useCrm()
  const today = todayIso()
  const { late, due, fresh } = useMemo(() => todayList(leads, today), [leads, today])
  const [calling, setCalling] = useState<CrmLead | null>(null)
  const [freshShown, setFreshShown] = useState(20)

  const group = (title: string, list: CrmLead[], empty: string, limit?: number) => (
    <section className="group" aria-label={title}>
      <div className="gh">
        <b>{title}</b>
        <span className="num">{list.length}</span>
      </div>
      {list.length === 0 ? (
        <div className="empty">{empty}</div>
      ) : (
        list.slice(0, limit ?? list.length).map((l) => <Row key={l.id} lead={l} today={today} onCall={() => setCalling(l)} />)
      )}
      {limit !== undefined && list.length > limit && (
        <button type="button" className="btn" style={{ marginTop: 10 }} onClick={() => setFreshShown((n) => n + 20)}>
          Покажи още ({list.length - limit})
        </button>
      )}
    </section>
  )

  return (
    <>
      <div className="top">
        <div>
          <h1>Днес</h1>
          <p className="sub num">
            {DATE.format(new Date())}
            {!loading && (
              <>
                {' · '}
                {late.length > 0 ? <span className="l">{plural(late.length, 'закъснял', 'закъснели')}</span> : '0 закъснели'}
                {' · '}
                <b>{due.length}</b> за днес · <b>{fresh.length}</b> {fresh.length === 1 ? 'нов' : 'нови'} без дата
              </>
            )}
          </p>
        </div>
        <div className="tools">
          <ViewSwitch />
        </div>
      </div>

      {loading ? (
        <div className="empty" style={{ borderTop: 0 }}>
          Зареждам…
        </div>
      ) : (
        <>
          {late.length > 0 && group('Закъснели', late, '')}
          {group('За днес', due, late.length || fresh.length ? 'Няма обаждания с днешна дата.' : 'Всичко за днес е свършено.')}
          {group('Нови без дата', fresh, 'Няма нови лийдове. Внесете от „Внос“.', freshShown)}
        </>
      )}

      {calling && <CallDialog lead={calling} onClose={() => setCalling(null)} />}
    </>
  )
}
