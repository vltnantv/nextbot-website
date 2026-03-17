'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLeadStore } from '@/lib/stores/lead-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Search, Download, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Lead } from '@/lib/types'

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500',
  contacted: 'bg-yellow-500/10 text-yellow-500',
  qualified: 'bg-purple-500/10 text-purple-500',
  converted: 'bg-green-500/10 text-green-500',
  lost: 'bg-red-500/10 text-red-500',
}

export default function LeadsPage() {
  const { leads, setLeads, setFilter, filter, filteredLeads, updateLead } = useLeadStore()
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setLeads(data)
    }
    fetchLeads()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!editLead) return
    const { error } = await supabase
      .from('leads')
      .update({
        name: editLead.name,
        email: editLead.email,
        phone: editLead.phone,
        status: editLead.status,
        notes: editLead.notes,
      })
      .eq('id', editLead.id)

    if (error) {
      toast.error('Failed to save')
      return
    }

    updateLead(editLead.id, editLead)
    setEditLead(null)
    toast.success('Lead updated')
  }

  const exportCSV = () => {
    const rows = filteredLeads()
    const csv = [
      'Name,Email,Phone,Source,Status,Notes,Created',
      ...rows.map(l =>
        [l.name, l.email, l.phone, l.source, l.status, `"${l.notes || ''}"`, l.created_at].join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.csv'
    a.click()
  }

  const displayed = filteredLeads()

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-9"
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>
        <Select value={filter.status || 'all'} onValueChange={(v) => setFilter({ status: v === 'all' ? null : v })}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filter.source || 'all'} onValueChange={(v) => setFilter({ source: v === 'all' ? null : v })}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="messenger">Messenger</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={exportCSV}>
          <Download className="size-4 mr-2" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{leads.length} Leads</CardTitle>
            <Button size="sm"><Plus className="size-4 mr-2" /> Add Lead</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {leads.length === 0 ? 'No leads yet' : 'No matching leads'}
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer"
                    onClick={() => setEditLead(lead)}
                  >
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.email || '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.phone || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs capitalize">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs border-0 capitalize ${statusColors[lead.status] || ''}`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(lead.created_at).toLocaleDateString('bg-BG')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <Dialog open={!!editLead} onOpenChange={(open) => !open && setEditLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead information</DialogDescription>
          </DialogHeader>
          {editLead && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={editLead.name} onChange={(e) => setEditLead({ ...editLead, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={editLead.email || ''} onChange={(e) => setEditLead({ ...editLead, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={editLead.phone || ''} onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editLead.status} onValueChange={(v) => setEditLead({ ...editLead, status: v as Lead['status'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={editLead.notes || ''} onChange={(e) => setEditLead({ ...editLead, notes: e.target.value })} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditLead(null)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
