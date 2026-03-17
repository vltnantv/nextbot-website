'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useBotStore } from '@/lib/stores/bot-store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import type { Bot } from '@/lib/types'

export default function SettingsPage() {
  const { bot, setBot } = useBotStore()
  const [form, setForm] = useState<Partial<Bot>>({})
  const [humanTakeover, setHumanTakeover] = useState(true)
  const [tenantName, setTenantName] = useState('')
  const [tenantColor, setTenantColor] = useState('#007AFF')
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data: bots } = await supabase.from('bots').select('*').limit(1)
      if (bots?.[0]) {
        setBot(bots[0])
        setForm(bots[0])
      }
      const { data: tenants } = await supabase.from('tenants').select('*').limit(1)
      if (tenants?.[0]) {
        setTenantName(tenants[0].name)
        setTenantColor(tenants[0].primary_color || '#007AFF')
      }
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveBot = async () => {
    if (!bot?.id) return
    const { error } = await supabase.from('bots').update({
      name: form.name,
      welcome_message: form.welcome_message,
      tone: form.tone,
      language: form.language,
      industry: form.industry,
    }).eq('id', bot.id)
    if (error) { toast.error('Failed to save'); return }
    setBot({ ...bot, ...form } as Bot)
    toast.success('Bot settings saved')
  }

  const saveTenant = async () => {
    const { error } = await supabase.from('tenants').update({
      name: tenantName,
      primary_color: tenantColor,
    }).eq('id', bot?.tenant_id || '')
    if (error) { toast.error('Failed to save'); return }
    toast.success('Brand settings saved')
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Bot settings */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
          <CardDescription>Customize how Neo behaves and responds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bot Name</Label>
              <Input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={form.language || 'bg'} onValueChange={(v) => setForm({ ...form, language: v as Bot['language'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg">Bulgarian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={form.tone || 'professional'} onValueChange={(v) => setForm({ ...form, tone: v as Bot['tone'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={form.industry || 'hotel'} onValueChange={(v) => setForm({ ...form, industry: v as Bot['industry'] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="dental">Dental Clinic</SelectItem>
                  <SelectItem value="realestate">Real Estate</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Welcome Message</Label>
            <Textarea rows={3} value={form.welcome_message || ''} onChange={(e) => setForm({ ...form, welcome_message: e.target.value })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Human Takeover</Label>
              <p className="text-xs text-muted-foreground">Allow agents to take over conversations</p>
            </div>
            <Switch checked={humanTakeover} onCheckedChange={setHumanTakeover} />
          </div>
          <Button onClick={saveBot}>Save Bot Settings</Button>
        </CardContent>
      </Card>

      <Separator />

      {/* White label */}
      <Card>
        <CardHeader>
          <CardTitle>White Label / Branding</CardTitle>
          <CardDescription>Customize the platform appearance for your brand</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Brand Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tenantColor}
                onChange={(e) => setTenantColor(e.target.value)}
                className="h-10 w-14 rounded-md border border-border cursor-pointer"
              />
              <Input value={tenantColor} onChange={(e) => setTenantColor(e.target.value)} className="flex-1" />
            </div>
          </div>
          <Button onClick={saveTenant}>Save Brand Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
