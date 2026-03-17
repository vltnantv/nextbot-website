'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { ChannelConfig } from '@/lib/types'

const channelInfo: Record<string, { icon: string; name: string; description: string; color: string }> = {
  web: { icon: '🌐', name: 'Website Widget', description: 'Chat widget embedded on your website', color: 'text-indigo-500' },
  whatsapp: { icon: '📱', name: 'WhatsApp', description: 'WhatsApp Business API integration', color: 'text-green-500' },
  messenger: { icon: '💬', name: 'Messenger', description: 'Facebook Messenger integration', color: 'text-blue-500' },
  instagram: { icon: '📸', name: 'Instagram', description: 'Instagram Direct Messages', color: 'text-pink-500' },
  email: { icon: '📧', name: 'Email', description: 'Automated email responses', color: 'text-orange-500' },
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<ChannelConfig[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('channel_configs').select('*')
      if (data) setChannels(data)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleChannel = async (id: string, enabled: boolean) => {
    const { error } = await supabase.from('channel_configs').update({ is_enabled: enabled }).eq('id', id)
    if (error) { toast.error('Failed to update'); return }
    setChannels(prev => prev.map(c => c.id === id ? { ...c, is_enabled: enabled } : c))
    toast.success(enabled ? 'Channel enabled' : 'Channel disabled')
  }

  // If no channels in DB, show all with defaults
  const allChannels = Object.entries(channelInfo).map(([key, info]) => {
    const dbChannel = channels.find(c => c.channel === key)
    return { key, ...info, id: dbChannel?.id || key, isEnabled: dbChannel?.is_enabled ?? false, fromDb: !!dbChannel }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Channels</h2>
        <p className="text-sm text-muted-foreground">Manage where Neo communicates with your customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allChannels.map((ch) => (
          <Card key={ch.key}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{ch.icon}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${ch.isEnabled ? 'bg-green-500/10 text-green-500 border-0' : ''}`}>
                    {ch.isEnabled ? 'Active' : 'Inactive'}
                  </Badge>
                  {ch.fromDb && (
                    <Switch checked={ch.isEnabled} onCheckedChange={(v) => toggleChannel(ch.id, v)} />
                  )}
                </div>
              </div>
              <CardTitle className="text-base mt-2">{ch.name}</CardTitle>
              <CardDescription>{ch.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {ch.isEnabled ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Connected and receiving messages</span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Enable to start receiving messages on this channel</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
