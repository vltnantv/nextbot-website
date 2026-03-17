'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const stats = [
  { label: 'Conversations', value: '284', change: '+12%', up: true, icon: MessageSquare, gradient: 'from-blue-500 to-indigo-600' },
  { label: 'Leads Generated', value: '47', change: '+8%', up: true, icon: Users, gradient: 'from-green-500 to-emerald-600' },
  { label: 'Conversion Rate', value: '16.5%', change: '+2.1%', up: true, icon: TrendingUp, gradient: 'from-purple-500 to-violet-600' },
  { label: 'Avg Response', value: '0.8s', change: '-0.2s', up: true, icon: Clock, gradient: 'from-orange-500 to-amber-600' },
]

const conversationsOverTime = [
  { date: 'Mon', conversations: 42, leads: 8 },
  { date: 'Tue', conversations: 38, leads: 6 },
  { date: 'Wed', conversations: 55, leads: 12 },
  { date: 'Thu', conversations: 47, leads: 9 },
  { date: 'Fri', conversations: 63, leads: 15 },
  { date: 'Sat', conversations: 28, leads: 4 },
  { date: 'Sun', conversations: 21, leads: 3 },
]

const leadsFunnel = [
  { stage: 'Visitors', count: 1240 },
  { stage: 'Engaged', count: 580 },
  { stage: 'Leads', count: 284 },
  { stage: 'Qualified', count: 142 },
  { stage: 'Converted', count: 47 },
]

const channelData = [
  { name: 'WhatsApp', value: 134, color: '#22c55e' },
  { name: 'Messenger', value: 89, color: '#3b82f6' },
  { name: 'Instagram', value: 43, color: '#ec4899' },
  { name: 'Web Chat', value: 18, color: '#6366f1' },
]

const recentActivity = [
  { icon: '✅', text: 'Booking confirmed — Иван Петров', time: '2m ago' },
  { icon: '📧', text: 'Confirmation email sent', time: '2m ago' },
  { icon: '👤', text: 'New lead: Maria Schmidt (Messenger)', time: '18m ago' },
  { icon: '💬', text: '4 new conversations started', time: '1h ago' },
  { icon: '🤖', text: 'Neo resolved 12 conversations', time: '2h ago' },
  { icon: '📈', text: 'Weekly report generated', time: '3h ago' },
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

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.up ? (
                      <ArrowUpRight className="size-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="size-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
                  <stat.icon className="size-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations area chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversations & Leads</CardTitle>
            <CardDescription>Weekly trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={conversationsOverTime}>
                <defs>
                  <linearGradient id="convGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="conversations" stroke="#6366f1" fill="url(#convGradient)" strokeWidth={2} name="Conversations" />
                <Area type="monotone" dataKey="leads" stroke="#22c55e" fill="url(#leadsGradient)" strokeWidth={2} name="Leads" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Channel distribution pie */}
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Distribution this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {channelData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                  <span className="text-xs text-muted-foreground truncate">{ch.name}</span>
                  <span className="text-xs font-medium ml-auto">{ch.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Funnel</CardTitle>
            <CardDescription>Visitor to customer journey</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={leadsFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from your AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
