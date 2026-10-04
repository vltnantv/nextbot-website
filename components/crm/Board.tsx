'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type KeyboardCoordinateGetter,
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { STAGES, STAGE_LABEL, todayIso, type CrmLead, type Stage } from '@/lib/crm'
import { crmApi, useCrm, ViewSwitch } from './CrmShell'
import { NotNowDialog } from './Dialogs'
import { dueText } from './ui'

// Board (/vatreshno/tablo): 6 stage columns; cards are dragged with mouse, finger or keyboard (dnd-kit).
// The card moves at once; if saving fails it goes back. Dropping on „Не сега“ asks for the next call date.

/** Keyboard: ← → move the card to the previous / next column; ↑ ↓ move it inside the column. */
const keyboardCoordinates: KeyboardCoordinateGetter = (event, args) => {
  if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
    const { active, over, droppableRects } = args.context
    const current = (over?.data.current?.status ?? active?.data.current?.status) as Stage | undefined
    const i = STAGES.findIndex((s) => s.id === current)
    const next = STAGES[i + (event.code === 'ArrowRight' ? 1 : -1)]
    const rect = next && droppableRects.get(`col:${next.id}`)
    if (rect) {
      event.preventDefault()
      return { x: rect.left + 8, y: rect.top + 36 }
    }
    return undefined
  }
  return sortableKeyboardCoordinates(event, args)
}

const byPosition = (a: CrmLead, b: CrmLead) => (a.position ?? 0) - (b.position ?? 0) || (a.created_at < b.created_at ? 1 : -1)

/** Card (core-app.html): name, category, and a footer with the last note (or rating) and the next call. */
function CardBody({ lead, today }: { lead: CrmLead; today: string }) {
  const due = dueText(lead.next_call_at, today)
  return (
    <>
      <b>{lead.name}</b>
      <p>{lead.category ?? '—'}</p>
      <div className="f num">
        <span>{lead.last_note ?? (lead.rating != null && Number.isFinite(Number(lead.rating)) ? `★ ${Number(lead.rating).toFixed(1)}` : '')}</span>
        <span className={due.late ? 'l' : ''}>{lead.next_call_at ? due.text : 'без дата'}</span>
      </div>
    </>
  )
}

function Card({ lead, today }: { lead: CrmLead; today: string }) {
  const router = useRouter()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id, data: { status: lead.status } })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`card ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
      aria-roledescription="карта"
      aria-label={`${lead.name}, ${STAGE_LABEL[lead.status]}. Интервал за местене, Enter на името за отваряне.`}
      onClick={() => router.push(`/vatreshno/lead/${lead.id}`)}
    >
      <CardBody lead={lead} today={today} />
      <Link href={`/vatreshno/lead/${lead.id}`} className="sr-only" onClick={(e) => e.stopPropagation()}>
        Отвори {lead.name}
      </Link>
    </div>
  )
}

function Column({ stage, leads, today }: { stage: Stage; leads: CrmLead[]; today: string }) {
  const { setNodeRef, isOver } = useDroppable({ id: `col:${stage}`, data: { status: stage } })
  return (
    <section ref={setNodeRef} className={`col ${isOver ? 'over' : ''}`} aria-label={STAGE_LABEL[stage]}>
      <div className="ch">
        <i style={{ background: `var(--s-${stage})` }} />
        <b>{STAGE_LABEL[stage]}</b>
        <span className="num">{leads.length}</span>
      </div>
      <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        {leads.map((l) => (
          <Card key={l.id} lead={l} today={today} />
        ))}
      </SortableContext>
      {leads.length === 0 && <div className="colempty">Пуснете карта тук</div>}
    </section>
  )
}

type Pending = { lead: CrmLead; status: Stage; order: string[] }

export function Board() {
  const { leads, setLeads, replace, toast, loading } = useCrm()
  const today = todayIso()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pending, setPending] = useState<Pending | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: keyboardCoordinates }),
  )

  const categories = useMemo(() => Array.from(new Set(leads.map((l) => l.category).filter(Boolean) as string[])).sort(), [leads])

  const visible = useMemo(() => {
    const s = q.trim().toLowerCase()
    // phones are stored as +359…: „088…“ is searched as „35988…“ too
    const digits = s.replace(/\D/g, '')
    const intl = digits.startsWith('0') ? `359${digits.slice(1)}` : digits
    const phoneMatch = (p: string | null) => {
      const d = (p ?? '').replace(/\D/g, '')
      return digits.length >= 3 && (d.includes(digits) || d.includes(intl))
    }
    return leads.filter((l) => (!category || l.category === category) && (!s || l.name.toLowerCase().includes(s) || phoneMatch(l.phone)))
  }, [leads, q, category])

  const columns = useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s.id, [] as CrmLead[]])) as Record<Stage, CrmLead[]>
    for (const l of visible) map[l.status]?.push(l)
    for (const s of STAGES) map[s.id].sort(byPosition)
    return map
  }, [visible])

  const active = activeId ? leads.find((l) => l.id === activeId) ?? null : null

  /** Moves a card: optimistic on screen, then the stage (if it changed) and the order of the target column. */
  const save = async (lead: CrmLead, status: Stage, order: string[], extra: { next_call_at?: string | null; reason?: string } = {}) => {
    const snapshot = leads
    const pos = new Map(order.map((id, i) => [id, i]))
    setLeads((ls) =>
      ls.map((l) =>
        l.id === lead.id
          ? { ...l, status, position: pos.get(l.id)!, ...(extra.next_call_at !== undefined ? { next_call_at: extra.next_call_at } : {}) }
          : pos.has(l.id)
            ? { ...l, position: pos.get(l.id)! }
            : l,
      ),
    )
    try {
      if (status !== lead.status) {
        const res = await crmApi<{ lead?: CrmLead }>(`/api/vatreshno/leads/${lead.id}`, { method: 'PATCH', body: JSON.stringify({ status, ...extra }) })
        if (res.lead) replace({ ...res.lead, position: pos.get(lead.id)! })
      }
      await crmApi('/api/vatreshno/leads/reorder', { method: 'POST', body: JSON.stringify({ ids: order }) })
      if (status !== lead.status) toast(`${lead.name} → ${STAGE_LABEL[status]}`)
    } catch (err) {
      setLeads(snapshot) // back where it was
      toast((err as Error).message, true)
    }
  }

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))

  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const lead = leads.find((l) => l.id === e.active.id)
    if (!lead || !e.over) return
    const overId = String(e.over.id)
    const target: Stage = overId.startsWith('col:') ? (overId.slice(4) as Stage) : (e.over.data.current?.status as Stage)
    if (!target) return

    // new order of the whole target column (also cards hidden by the search), dragged card at the drop place
    const full = leads.filter((l) => l.status === target && l.id !== lead.id).sort(byPosition)
    let index: number
    if (overId.startsWith('col:')) index = full.length
    else {
      index = full.findIndex((l) => l.id === overId)
      if (index < 0) index = full.length
      // moving down inside the same column: land after the card under the pointer
      const col = leads.filter((l) => l.status === target).sort(byPosition)
      if (target === lead.status && col.findIndex((l) => l.id === lead.id) < col.findIndex((l) => l.id === overId)) index += 1
    }
    const order = [...full.slice(0, index).map((l) => l.id), lead.id, ...full.slice(index).map((l) => l.id)]
    if (target === lead.status) {
      const before = leads.filter((l) => l.status === target).sort(byPosition).map((l) => l.id)
      if (before.join() === order.join()) return
    }

    if (target === 'not_now' && lead.status !== 'not_now') {
      setPending({ lead, status: target, order })
      return
    }
    save(lead, target, order)
  }

  return (
    <>
      <div className="top">
        <div>
          <h1>Табло</h1>
          <p className="sub num">{loading ? 'Зареждам…' : `${visible.length} от ${leads.length} · влачете картите между етапите`}</p>
        </div>
        <div className="tools">
          <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Търсене по име или телефон" aria-label="Търсене" />
          <select className="sel" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Категория">
            <option value="">Всички категории</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ViewSwitch />
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={() => setActiveId(null)}>
        <div className="board">
          {STAGES.map((s) => (
            <Column key={s.id} stage={s.id} leads={columns[s.id]} today={today} />
          ))}
        </div>
        <DragOverlay>
          {active && (
            <div className="card overlay">
              <CardBody lead={active} today={today} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {pending && (
        <NotNowDialog
          lead={pending.lead}
          onCancel={() => setPending(null)}
          onConfirm={(next, reason) => {
            save(pending.lead, pending.status, pending.order, { next_call_at: next, reason })
            setPending(null)
          }}
        />
      )}
    </>
  )
}
