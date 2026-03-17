import { create } from 'zustand'
import type { Bot, KnowledgeEntry } from '@/lib/types'

interface BotState {
  bot: Bot | null
  knowledge: KnowledgeEntry[]
  isLoading: boolean
  setBot: (bot: Bot | null) => void
  setKnowledge: (knowledge: KnowledgeEntry[]) => void
  addKnowledge: (entry: KnowledgeEntry) => void
  removeKnowledge: (id: string) => void
  updateKnowledge: (id: string, updates: Partial<KnowledgeEntry>) => void
  setLoading: (loading: boolean) => void
}

export const useBotStore = create<BotState>((set) => ({
  bot: null,
  knowledge: [],
  isLoading: false,
  setBot: (bot) => set({ bot }),
  setKnowledge: (knowledge) => set({ knowledge }),
  addKnowledge: (entry) => set((s) => ({ knowledge: [entry, ...s.knowledge] })),
  removeKnowledge: (id) => set((s) => ({ knowledge: s.knowledge.filter((k) => k.id !== id) })),
  updateKnowledge: (id, updates) =>
    set((s) => ({
      knowledge: s.knowledge.map((k) => (k.id === id ? { ...k, ...updates } : k)),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}))
