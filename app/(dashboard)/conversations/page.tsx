'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import type { Conversation, Message } from '@/lib/types'

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (data) setConversations(data)
    }
    fetchConversations()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!selectedId) return
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', selectedId)
        .order('created_at', { ascending: true })
      if (data) setMessages(data)
    }
    fetchMessages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const filtered = conversations.filter(c =>
    c.customer_name.toLowerCase().includes(search.toLowerCase())
  )

  const channelColor: Record<string, string> = {
    whatsapp: 'bg-green-500/10 text-green-500',
    messenger: 'bg-blue-500/10 text-blue-500',
    instagram: 'bg-pink-500/10 text-pink-500',
    web: 'bg-indigo-500/10 text-indigo-500',
    email: 'bg-orange-500/10 text-orange-500',
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Conversation list */}
      <Card className="w-[360px] shrink-0 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Conversations</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                {conversations.length === 0 ? 'No conversations yet. They will appear here when customers chat with Neo.' : 'No matching conversations.'}
              </div>
            ) : (
              filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`w-full px-4 py-3 text-left border-b border-border/50 transition-colors hover:bg-muted/50 ${
                    selectedId === conv.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">{conv.customer_name}</span>
                    <Badge variant="outline" className={`text-[10px] ${channelColor[conv.channel] || ''}`}>
                      {conv.channel}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {conv.status}
                    </span>
                    {conv.lead_detected && (
                      <Badge className="text-[10px] bg-green-500/10 text-green-500 border-0">Lead</Badge>
                    )}
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message thread */}
      <Card className="flex-1 flex flex-col">
        {selectedId ? (
          <>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {conversations.find(c => c.id === selectedId)?.customer_name}
                </CardTitle>
                <Badge variant="outline">
                  {conversations.find(c => c.id === selectedId)?.channel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted rounded-tl-sm'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${
                          msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                        }`}>
                          {msg.role === 'assistant' && 'Neo · '}
                          {new Date(msg.created_at).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p className="text-sm">Select a conversation to view messages</p>
          </div>
        )}
      </Card>
    </div>
  )
}
