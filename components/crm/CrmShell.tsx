'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { todayList, type CrmLead } from '@/lib/crm'
import { Icon } from './ui'

// Shell of the local CORE app: sidebar (bottom bar on phone), one shared list of leads for all screens,
// and a small toast for confirmations. Look: design/avto-crm-demo.html, light theme.

type Ctx = {
  leads: CrmLead[]
  loading: boolean
  error: string | null
  reload: () => Promise<void>
  replace: (lead: CrmLead) => void
  setLeads: React.Dispatch<React.SetStateAction<CrmLead[]>>
  toast: (text: string, bad?: boolean) => void
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

const NAV = [
  { href: '/core/dnes', label: 'Днес', icon: 'today' as const },
  { href: '/core/tablo', label: 'Табло', icon: 'board' as const },
  { href: '/core/vnos', label: 'Внос', icon: 'upload' as const },
]

export function CrmShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [leads, setLeads] = useState<CrmLead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ text: string; bad: boolean } | null>(null)

  const reload = useCallback(async () => {
    try {
      setLeads(await crmApi<CrmLead[]>('/api/core/leads'))
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

  const lateCount = useMemo(() => {
    const t = todayList(leads)
    return t.late.length + t.due.length
  }, [leads])

  const value = useMemo(() => ({ leads, loading, error, reload, replace, setLeads, toast }), [leads, loading, error, reload, replace, toast])

  const navLink = (n: (typeof NAV)[number], compact = false) => {
    const active = pathname === n.href || (n.href === '/core/tablo' && pathname?.startsWith('/core/lead/'))
    return (
      <Link key={n.href} href={n.href} aria-current={active ? 'page' : undefined}>
        <Icon name={n.icon} size={compact ? 20 : 16} />
        {n.label}
        {n.href === '/core/dnes' && lateCount > 0 && <span className="cnt num">{lateCount}</span>}
      </Link>
    )
  }

  return (
    <CrmContext.Provider value={value}>
      <div className="app">
        <aside>
          <div className="brand">
            <span className="logo">N</span>
            <span>
              <b>CORE</b>
              <small>NextBot · само локално</small>
            </span>
          </div>
          <nav className="snav" aria-label="CORE">
            {NAV.map((n) => navLink(n))}
          </nav>
          <div className="sfoot">{loading ? 'Зареждам…' : `${leads.length} лийда`}</div>
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
        {NAV.map((n) => navLink(n, true))}
      </nav>
      {msg && (
        <div role="status" className={`toast ${msg.bad ? 'bad' : ''}`}>
          {!msg.bad && <Icon name="check" />}
          {msg.text}
        </div>
      )}
    </CrmContext.Provider>
  )
}
