import { create } from 'zustand'
import type { Lead } from '@/lib/types'

interface LeadState {
  leads: Lead[]
  isLoading: boolean
  filter: {
    status: string | null
    source: string | null
    search: string
  }
  setLeads: (leads: Lead[]) => void
  addLead: (lead: Lead) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  removeLead: (id: string) => void
  setFilter: (filter: Partial<LeadState['filter']>) => void
  setLoading: (loading: boolean) => void
  filteredLeads: () => Lead[]
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  isLoading: false,
  filter: { status: null, source: null, search: '' },
  setLeads: (leads) => set({ leads }),
  addLead: (lead) => set((s) => ({ leads: [lead, ...s.leads] })),
  updateLead: (id, updates) =>
    set((s) => ({
      leads: s.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),
  removeLead: (id) => set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),
  setFilter: (filter) => set((s) => ({ filter: { ...s.filter, ...filter } })),
  setLoading: (isLoading) => set({ isLoading }),
  filteredLeads: () => {
    const { leads, filter } = get()
    return leads.filter((l) => {
      if (filter.status && l.status !== filter.status) return false
      if (filter.source && l.source !== filter.source) return false
      if (filter.search) {
        const q = filter.search.toLowerCase()
        return (
          l.name.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.includes(q)
        )
      }
      return true
    })
  },
}))
