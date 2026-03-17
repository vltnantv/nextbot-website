'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'

const weeklyData = [
  { day: 'Mon', conversations: 42, leads: 8, resolved: 38 },
  { day: 'Tue', conversations: 38, leads: 6, resolved: 35 },
  { day: 'Wed', conversations: 55, leads: 12, resolved: 49 },
  { day: 'Thu', conversations: 47, leads: 9, resolved: 44 },
  { day: 'Fri', conversations: 63, leads: 15, resolved: 56 },
  { day: 'Sat', conversations: 28, leads: 4, resolved: 25 },
  { day: 'Sun', conversations: 21, leads: 3, resolved: 19 },
]

const topQuestions = [
  { question: 'Room availability & pricing', count: 89, pct: 100 },
  { question: 'SPA & wellness hours', count: 67, pct: 75 },
  { question: 'Restaurant menu', count: 54, pct: 61 },
  { question: 'Parking information', count: 43, pct: 48 },
  { question: 'Cancellation policy', count: 31, pct: 35 },
]

const channelPieData = [
  { name: 'WhatsApp', value: 134, color: '#22c55e' },
  { name: 'Messenger', value: 89, color: '#3b82f6' },
  { name: 'Instagram', value: 43, color: '#ec4899' },
  { name: 'Web Chat', value: 18, color: '#6366f1' },
]

const responseTimeData = [
  { range: '< 1s', value: 87, color: '#22c55e' },
  { range: '1-3s', value: 11, color: '#eab308' },
  { range: '3-5s', value: 2, color: '#f97316' },
]

const satisfactionData = [
  { rating: 'Excellent', value: 68, color: '#22c55e' },
  { rating: 'Good', value: 22, color: '#3b82f6' },
  { rating: 'Average', value: 7, color: '#eab308' },
  { rating: 'Poor', value: 3, color: '#ef4444' },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header with date range */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-sm text-muted-foreground">Performance overview and insights</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { v: '284', l: 'Total Conversations', sub: '+12% from last week', gradient: 'from-blue-500 to-indigo-600' },
          { v: '88%', l: 'Resolution Rate', sub: '251 of 284 resolved', gradient: 'from-green-500 to-emerald-600' },
          { v: '47', l: 'Leads Generated', sub: '+8% from last week', gradient: 'from-purple-500 to-violet-600' },
          { v: '0.8s', l: 'Avg Response Time', sub: '-0.2s improvement', gradient: 'from-orange-500 to-amber-600' },
        ].map((s, i) => (
          <Card key={i} className={`bg-gradient-to-br ${s.gradient} border-0 text-white`}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium opacity-80">{s.l}</p>
              <p className="text-3xl font-bold tracking-tight mt-1">{s.v}</p>
              <p className="text-xs opacity-70 mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversations chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversations & Resolution</CardTitle>
          <CardDescription>Daily conversations, leads, and resolution rate</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="aConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="conversations" stroke="#6366f1" fill="url(#aConv)" strokeWidth={2} name="Conversations" />
              <Area type="monotone" dataKey="resolved" stroke="#22c55e" fill="url(#aResolved)" strokeWidth={2} name="Resolved" />
              <Area type="monotone" dataKey="leads" stroke="#a855f7" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Leads" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top questions */}
        <Card>
          <CardHeader>
            <CardTitle>Top Questions</CardTitle>
            <CardDescription>Most frequently asked topics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topQuestions.map((q, i) => (
              <div key={i} className="flex items-center gap-4">
                <Badge variant="outline" className="size-6 p-0 flex items-center justify-center text-xs shrink-0">{i + 1}</Badge>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">{q.question}</span>
                    <span className="text-sm text-muted-foreground tabular-nums">{q.count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${q.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Channel distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Distribution</CardTitle>
            <CardDescription>Conversations by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={channelPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {channelPieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {channelPieData.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                  <span className="text-sm text-muted-foreground">{ch.name}</span>
                  <span className="text-sm font-medium ml-auto tabular-nums">{ch.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response time */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Distribution of AI response times</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={responseTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} unit="%" />
                <YAxis dataKey="range" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={50} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Percentage">
                  {responseTimeData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Based on post-conversation ratings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {satisfactionData.map((s) => (
              <div key={s.rating} className="flex items-center gap-4">
                <span className="text-sm w-20 shrink-0">{s.rating}</span>
                <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                </div>
                <span className="text-sm font-medium tabular-nums w-10 text-right">{s.value}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
