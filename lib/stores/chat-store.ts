import { create } from 'zustand'
import type { Conversation, Message } from '@/lib/types'

interface ChatState {
  conversations: Conversation[]
  selectedConversationId: string | null
  messages: Record<string, Message[]>
  isStreaming: boolean
  setConversations: (conversations: Conversation[]) => void
  selectConversation: (id: string | null) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  addMessage: (conversationId: string, message: Message) => void
  appendToLastMessage: (conversationId: string, content: string) => void
  setStreaming: (streaming: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  selectedConversationId: null,
  messages: {},
  isStreaming: false,
  setConversations: (conversations) => set({ conversations }),
  selectConversation: (id) => set({ selectedConversationId: id }),
  setMessages: (conversationId, messages) =>
    set((s) => ({ messages: { ...s.messages, [conversationId]: messages } })),
  addMessage: (conversationId, message) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [conversationId]: [...(s.messages[conversationId] || []), message],
      },
    })),
  appendToLastMessage: (conversationId, content) =>
    set((s) => {
      const msgs = s.messages[conversationId] || []
      if (msgs.length === 0) return s
      const last = msgs[msgs.length - 1]
      return {
        messages: {
          ...s.messages,
          [conversationId]: [
            ...msgs.slice(0, -1),
            { ...last, content: last.content + content },
          ],
        },
      }
    }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}))
