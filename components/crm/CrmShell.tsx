'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { plural, todayList, type CrmLead } from '@/lib/crm'

// Shell of the internal CORE app (design/core-app.html): sidebar with „Работа“ and „Данни“, one shared list of
// leads for every screen, the „Не ми звънете“ action and a small toast.

type Ctx = {
  leads: CrmLead[]
  loading: boolean
  reload: () => Promise<void>
  replace: (lead: CrmLead) => void
  setLeads: React.Dispatch<React.SetStateAction<CrmLead[]>>
  toast: (text: string, bad?: boolean) => void
  /** adds the phone to „Не ми звънете“ and moves the lead to „Не сега“ without a date */
  block: (lead: CrmLead) => Promise<CrmLead | null>
}

const CrmContext = createContext<Ctx | null>(null)
export const useCrm = () => {
  const c = useContext(CrmContext)
  if (!c) throw new Error('useCrm outside CrmShell')
  return c
}

export async function crmApi<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' }, cache: 'no-store' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || `Грешка ${res.status}`)
  return data as T
}

export function CrmShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const [leads, setLeads] = useState<CrmLead[]>([])
  const [dncCount, setDncCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ text: string; bad: boolean } | null>(null)

  const reload = useCallback(async () => {
    try {
      const [list, dnc] = await Promise.all([crmApi<CrmLead[]>('/api/vatreshno/leads'), crmApi<unknown[]>('/api/vatreshno/dnc')])
      setLeads(list)
      setDncCount(dnc.length)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const toast = useCallback((text: string, bad = false) => {
    setMsg({ text, bad })
    window.setTimeout(() => setMsg((m) => (m?.text === text ? null : m)), 2600)
  }, [])

  const replace = useCallback((lead: CrmLead) => setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, ...lead } : l))), [])

  const block = useCallback(
    async (lead: CrmLead) => {
      if (!lead.phone) return null
      if (!window.confirm(`${lead.name} в „Не ми звънете“? Номерът няма да се внася повторно, а лийдът отива в „Не сега“ без дата.`)) return null
      try {
        await crmApi('/api/vatreshno/dnc', { method: 'POST', body: JSON.stringify({ phone: lead.phone, reason: lead.name }) })
        const { lead: saved } = await crmApi<{ lead: CrmLead }>(`/api/vatreshno/leads/${lead.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'not_now', next_call_at: null, reason: 'Не ми звънете' }),
        })
        if (saved) replace(saved)
        setDncCount((n) => (n ?? 0) + 1)
        toast(`${lead.name} е в „Не ми звънете“`)
        return saved ?? null
      } catch (e) {
        toast((e as Error).message, true)
        return null
      }
    },
    [replace, toast],
  )

  const { late } = useMemo(() => todayList(leads), [leads])
  const value = useMemo(() => ({ leads, loading, reload, replace, setLeads, toast, block }), [leads, loading, reload, replace, toast, block])

  const is = (href: string) => pathname === href || (href === '/vatreshno/tablo' && pathname.startsWith('/vatreshno/lead/'))

  return (
    <CrmContext.Provider value={value}>
      <div className="app">
        <aside>
          <div className="logo">
            nextbot<i />
            <small>CORE</small>
          </div>
          <div>
            <div className="navlabel">Работа</div>
            <nav className="snav" aria-label="Работа">
              <Link href="/vatreshno/dnes" aria-current={is('/vatreshno/dnes') ? 'page' : undefined}>
                Днес {late.length > 0 && <span className="late num">{plural(late.length, 'закъснял', 'закъснели')}</span>}
              </Link>
              <Link href="/vatreshno/tablo" aria-current={is('/vatreshno/tablo') ? 'page' : undefined}>
                Табло <span className="num">{loading ? '' : leads.length}</span>
              </Link>
            </nav>
          </div>
          <div>
            <div className="navlabel">Данни</div>
            <nav className="snav" aria-label="Данни">
              <Link href="/vatreshno/vnos" aria-current={is('/vatreshno/vnos') ? 'page' : undefined}>
                Внос
              </Link>
              <Link href="/vatreshno/vnos#ne-mi-zvanete">
                Не ми звънете <span className="num">{dncCount ?? ''}</span>
              </Link>
            </nav>
          </div>
          <div className="me">
            <b>В</b>Валентин
          </div>
        </aside>
        <main>
          {error && (
            <p role="alert" className="alert">
              {error}
            </p>
          )}
          {children}
        </main>
      </div>
      <nav className="bnav" aria-label="CORE">
        <Link href="/vatreshno/dnes" aria-current={is('/vatreshno/dnes') ? 'page' : undefined}>
          Днес
        </Link>
        <Link href="/vatreshno/tablo" aria-current={is('/vatreshno/tablo') ? 'page' : undefined}>
          Табло
        </Link>
        <Link href="/vatreshno/vnos" aria-current={is('/vatreshno/vnos') ? 'page' : undefined}>
          Внос
        </Link>
      </nav>
      {msg && (
        <div role="status" className={`toast ${msg.bad ? 'bad' : ''}`}>
          {msg.text}
        </div>
      )}
    </CrmContext.Provider>
  )
}

/** „Списък / Табло“ switch in the top right (core-app.html). */
export function ViewSwitch() {
  const pathname = usePathname() ?? ''
  return (
    <div className="seg" role="navigation" aria-label="Изглед">
      <Link href="/vatreshno/dnes" aria-current={pathname === '/vatreshno/dnes' ? 'page' : undefined}>
        Списък
      </Link>
      <Link href="/vatreshno/tablo" aria-current={pathname === '/vatreshno/tablo' ? 'page' : undefined}>
        Табло
      </Link>
    </div>
  )
}
