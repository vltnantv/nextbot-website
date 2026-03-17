// ── Shared types for the NextBot SaaS platform ──

export type UserRole = 'admin' | 'member' | 'viewer'
export type BotTone = 'professional' | 'friendly' | 'casual'
export type BotLanguage = 'bg' | 'en' | 'de' | 'ru'
export type Industry = 'hotel' | 'restaurant' | 'dental' | 'realestate' | 'education' | 'ecommerce' | 'services' | 'custom'
export type Channel = 'whatsapp' | 'messenger' | 'instagram' | 'web' | 'email'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type ConversationStatus = 'active' | 'waiting' | 'resolved' | 'archived'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type KnowledgeType = 'text' | 'faq' | 'url' | 'file'

// ── Database row types ──

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar_url: string | null
  tenant_id: string | null
  created_at: string
}

export interface Tenant {
  id: string
  name: string
  logo_url: string | null
  primary_color: string
  domain: string | null
  created_at: string
}

export interface Bot {
  id: string
  tenant_id: string
  name: string
  welcome_message: string
  tone: BotTone
  language: BotLanguage
  industry: Industry
  is_active: boolean
  created_at: string
}

export interface KnowledgeEntry {
  id: string
  bot_id: string
  type: KnowledgeType
  title: string
  content: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface Conversation {
  id: string
  bot_id: string
  channel: Channel
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  status: ConversationStatus
  lead_detected: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export interface Lead {
  id: string
  tenant_id: string
  name: string
  email: string | null
  phone: string | null
  source: Channel
  status: LeadStatus
  notes: string | null
  conversation_id: string | null
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  tenant_id: string
  customer_name: string
  customer_email: string | null
  customer_phone: string | null
  date: string
  time_slot: string
  status: BookingStatus
  notes: string | null
  created_at: string
}

export interface Automation {
  id: string
  tenant_id: string
  name: string
  trigger: string
  actions: AutomationAction[]
  is_active: boolean
  created_at: string
}

export interface AutomationAction {
  type: 'send_email' | 'send_sms' | 'create_lead' | 'notify_human' | 'send_offer' | 'capture_data'
  config: Record<string, unknown>
}

export interface ChannelConfig {
  id: string
  tenant_id: string
  channel: Channel
  is_enabled: boolean
  config: Record<string, unknown>
  created_at: string
}

export interface Settings {
  id: string
  tenant_id: string
  key: string
  value: string
  updated_at: string
}

// ── API types ──

export interface ChatRequest {
  message: string
  conversation_id?: string
  bot_id: string
  industry?: Industry
  channel?: Channel
}

export interface ChatStreamResponse {
  content: string
  conversation_id: string
  lead_detected?: boolean
}

// ── Analytics types ──

export interface AnalyticsOverview {
  total_conversations: number
  total_leads: number
  conversion_rate: number
  avg_response_time: number
  conversations_today: number
  leads_today: number
}

export interface ConversationsByDay {
  date: string
  count: number
}

export interface LeadsByStatus {
  status: LeadStatus
  count: number
}

export interface ChannelDistribution {
  channel: Channel
  count: number
  percentage: number
}
