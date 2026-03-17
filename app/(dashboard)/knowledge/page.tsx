'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useBotStore } from '@/lib/stores/bot-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, FileText, HelpCircle, Link2, File, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { KnowledgeEntry, KnowledgeType } from '@/lib/types'

const typeIcons: Record<KnowledgeType, React.ReactNode> = {
  text: <FileText className="size-4" />,
  faq: <HelpCircle className="size-4" />,
  url: <Link2 className="size-4" />,
  file: <File className="size-4" />,
}

const typeColors: Record<KnowledgeType, string> = {
  text: 'bg-blue-500/10 text-blue-500',
  faq: 'bg-purple-500/10 text-purple-500',
  url: 'bg-green-500/10 text-green-500',
  file: 'bg-orange-500/10 text-orange-500',
}

export default function KnowledgePage() {
  const { knowledge, setKnowledge, addKnowledge, removeKnowledge } = useBotStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newEntry, setNewEntry] = useState({ type: 'faq' as KnowledgeType, title: '', content: '' })
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('knowledge').select('*').order('created_at', { ascending: false })
      if (data) setKnowledge(data)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = async () => {
    if (!newEntry.title || !newEntry.content) {
      toast.error('Title and content are required')
      return
    }
    // Get the first bot for this tenant
    const { data: bots } = await supabase.from('bots').select('id').limit(1)
    const botId = bots?.[0]?.id
    if (!botId) {
      toast.error('No bot configured')
      return
    }

    const { data, error } = await supabase
      .from('knowledge')
      .insert({ bot_id: botId, type: newEntry.type, title: newEntry.title, content: newEntry.content })
      .select()
      .single()

    if (error) { toast.error('Failed to add'); return }
    addKnowledge(data)
    setNewEntry({ type: 'faq', title: '', content: '' })
    setShowAdd(false)
    toast.success('Knowledge entry added')
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('knowledge').delete().eq('id', id)
    if (error) { toast.error('Failed to delete'); return }
    removeKnowledge(id)
    toast.success('Deleted')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{knowledge.length} Knowledge Entries</h2>
          <p className="text-sm text-muted-foreground">Train Neo with your business information</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="size-4 mr-2" /> Add Entry
        </Button>
      </div>

      {knowledge.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <BookIcon className="size-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No knowledge entries yet. Add FAQs, text, URLs, or files to train Neo.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledge.map((kb) => (
            <Card key={kb.id} className="group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`border-0 ${typeColors[kb.type as KnowledgeType] || ''}`}>
                      {typeIcons[kb.type as KnowledgeType]} <span className="ml-1 capitalize">{kb.type}</span>
                    </Badge>
                  </div>
                  <button
                    onClick={() => handleDelete(kb.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <CardTitle className="text-base mt-2">{kb.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">{kb.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Knowledge</DialogTitle>
            <DialogDescription>Add information that Neo will use to answer questions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={newEntry.type} onValueChange={(v) => setNewEntry({ ...newEntry, type: v as KnowledgeType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{newEntry.type === 'faq' ? 'Question' : 'Title'}</Label>
              <Input value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })} placeholder={newEntry.type === 'faq' ? 'What are your working hours?' : 'Entry title'} />
            </div>
            <div className="space-y-2">
              <Label>{newEntry.type === 'faq' ? 'Answer' : newEntry.type === 'url' ? 'URL' : 'Content'}</Label>
              <Textarea rows={5} value={newEntry.content} onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })} placeholder={newEntry.type === 'url' ? 'https://...' : 'Enter content...'} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BookIcon({ className }: { className?: string }) {
  return <FileText className={className} />
}
