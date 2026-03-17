'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Plus, Zap, ArrowRight, Mail, MessageSquare, UserPlus, Bell } from 'lucide-react'
import { toast } from 'sonner'
import type { Automation } from '@/lib/types'

const actionIcons: Record<string, React.ReactNode> = {
  send_email: <Mail className="size-3.5" />,
  send_sms: <MessageSquare className="size-3.5" />,
  create_lead: <UserPlus className="size-3.5" />,
  notify_human: <Bell className="size-3.5" />,
  send_offer: <Zap className="size-3.5" />,
  capture_data: <UserPlus className="size-3.5" />,
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('automations').select('*').order('created_at', { ascending: false })
      if (data) setAutomations(data)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from('automations').update({ is_active: isActive }).eq('id', id)
    if (error) { toast.error('Failed to update'); return }
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, is_active: isActive } : a))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Automations</h2>
          <p className="text-sm text-muted-foreground">Trigger → Action flows powered by Neo</p>
        </div>
        <Button><Plus className="size-4 mr-2" /> New Automation</Button>
      </div>

      {automations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Zap className="size-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No automations yet. Create trigger → action flows to automate your workflow.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {automations.map((auto) => {
            const actions = Array.isArray(auto.actions) ? auto.actions : []
            return (
              <Card key={auto.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${auto.is_active ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                      <CardTitle className="text-base">{auto.name}</CardTitle>
                    </div>
                    <Switch checked={auto.is_active} onCheckedChange={(v) => toggleActive(auto.id, v)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Trigger */}
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-0">
                      <Zap className="size-3 mr-1" /> {auto.trigger}
                    </Badge>
                    <ArrowRight className="size-4 text-muted-foreground" />
                    {/* Actions */}
                    {actions.map((action, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-muted">
                        {actionIcons[action.type] || <Zap className="size-3.5" />}
                        <span className="ml-1 capitalize">{action.type.replace(/_/g, ' ')}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
