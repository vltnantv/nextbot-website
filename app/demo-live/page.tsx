'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type WizardStep = 1 | 2 | 3 | 4 | 5
type DemoTab = 'chat' | 'dashboard' | 'conversations' | 'leads' | 'analytics' | 'knowledge' | 'settings'
type ChatMessage = { id: string; role: 'user' | 'bot'; text: string; time: string }
type LeadEntry = { id: string; name: string; email: string; phone: string; source: string; status: string; notes: string; created: string }
type ConversationEntry = { id: string; dbId: string | null; name: string; channel: string; messages: ChatMessage[]; time: string; status: string }
type KnowledgeEntry = { id: string; type: 'faq' | 'text' | 'link'; title: string; content: string }
type Notification = { id: string; icon: string; text: string; accent: string }

interface BusinessConfig {
  companyName: string
  industry: string
  website: string
  services: string
  phone: string
  workingHours: string
  knowledge: KnowledgeEntry[]
  botName: string
  tone: string
  language: string
  welcomeMessage: string
  goal: string
  autoLeadCapture: boolean
  autoBooking: boolean
  autoNotifications: boolean
}

const DEFAULT_CONFIG: BusinessConfig = {
  companyName: '',
  industry: 'hotel',
  website: '',
  services: '',
  phone: '',
  workingHours: '',
  knowledge: [],
  botName: 'Neo',
  tone: 'professional',
  language: 'en',
  welcomeMessage: '',
  goal: 'leads',
  autoLeadCapture: true,
  autoBooking: true,
  autoNotifications: true,
}

const INDUSTRIES = [
  { value: 'hotel', label: 'Hotel & Hospitality', icon: '🏨' },
  { value: 'restaurant', label: 'Restaurant & Food', icon: '🍽️' },
  { value: 'dental', label: 'Dental & Medical', icon: '🦷' },
  { value: 'realestate', label: 'Real Estate', icon: '🏠' },
  { value: 'education', label: 'Education', icon: '🎓' },
  { value: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
  { value: 'services', label: 'Professional Services', icon: '💼' },
  { value: 'custom', label: 'Other', icon: '⚙️' },
]

const TONES = [
  { value: 'professional', label: 'Professional', desc: 'Clear, precise, courteous' },
  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable, helpful' },
  { value: 'casual', label: 'Casual / Sales', desc: 'Conversational, persuasive' },
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'de', label: 'German' },
  { value: 'ru', label: 'Russian' },
]

const GOALS = [
  { value: 'leads', label: 'Lead Generation', icon: '🎯', desc: 'Capture contact info and qualify prospects' },
  { value: 'booking', label: 'Booking & Scheduling', icon: '📅', desc: 'Automate appointment booking' },
  { value: 'support', label: 'Customer Support', icon: '💬', desc: 'Answer questions and resolve issues' },
]

/* ═══════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS (outside main component to prevent re-render)
   ═══════════════════════════════════════════════════════════════ */

function FormInput({ label, value, onChange, placeholder, type = 'text', textarea = false }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 transition-all resize-none" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 transition-all" />
      )}
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 ${className}`}>{children}</div>
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function DemoLivePage() {
  /* ─── Core state ─── */
  const [phase, setPhase] = useState<'wizard' | 'generating' | 'demo'>('wizard')
  const [step, setStep] = useState<WizardStep>(1)
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG)

  /* ─── Demo state ─── */
  const [demoTab, setDemoTab] = useState<DemoTab>('chat')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [userInput, setUserInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [dbConversationId, setDbConversationId] = useState<string | null>(null)
  const [leads, setLeads] = useState<LeadEntry[]>([])
  const [conversations, setConversations] = useState<ConversationEntry[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [totalMessages, setTotalMessages] = useState(0)
  const [visitorName, setVisitorName] = useState('Demo Visitor')
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null)
  const [capturedPhone, setCapturedPhone] = useState<string | null>(null)
  const [leadCreated, setLeadCreated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ─── Wizard knowledge entry state ─── */
  const [kbType, setKbType] = useState<'faq' | 'text' | 'link'>('faq')
  const [kbTitle, setKbTitle] = useState('')
  const [kbContent, setKbContent] = useState('')

  /* ─── Website extraction state ─── */
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractStatus, setExtractStatus] = useState('')
  const [extractedFromUrl, setExtractedFromUrl] = useState<string | null>(null)

  /* ─── Update config helper ─── */
  const updateConfig = useCallback((patch: Partial<BusinessConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }))
  }, [])

  /* ─── Ref to always have latest config (avoids stale closures) ─── */
  const configRef = useRef(config)
  configRef.current = config

  /* ─── Extract website data ─── */
  const extractWebsite = async () => {
    const currentConfig = configRef.current
    const url = currentConfig.website.trim()
    if (!url || isExtracting) return
    setIsExtracting(true)
    setExtractStatus('Fetching website content...')

    try {
      setTimeout(() => setExtractStatus('Crawling subpages (menu, rooms, services, pricing)...'), 2500)
      setTimeout(() => setExtractStatus('Analyzing all content with AI...'), 6000)
      setTimeout(() => setExtractStatus('Extracting detailed business data...'), 10000)

      const res = await fetch('/api/extract-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) throw new Error('Extraction failed')
      const result = await res.json()

      if (result.success && result.data) {
        const d = result.data
        setExtractStatus(result.generated ? 'Generated sample data from URL' : 'Extraction complete!')

        // Safely convert any value to string (AI may return objects)
        const str = (v: unknown): string => {
          if (!v) return ''
          if (typeof v === 'string') return v
          if (Array.isArray(v)) return v.map(str).join(', ')
          if (typeof v === 'object') return Object.entries(v as Record<string, unknown>).map(([k, val]) => `${k}: ${str(val)}`).join(', ')
          return String(v)
        }

        // Use setConfig directly with functional update to avoid stale state
        setConfig(prev => {
          const updated = { ...prev }

          if (d.companyName) updated.companyName = str(d.companyName)
          if (d.industry && INDUSTRIES.some(i => i.value === d.industry)) updated.industry = d.industry
          if (d.services) updated.services = str(d.services)
          if (d.workingHours) updated.workingHours = str(d.workingHours)

          // Phone: only set if API returned a concrete number
          const phone = str(d.phone).trim()
          if (phone) updated.phone = phone

          // Build knowledge entries from ALL extracted data
          const newKnowledge: KnowledgeEntry[] = []
          const ts = Date.now()
          if (d.description) newKnowledge.push({ id: `kb-desc-${ts}`, type: 'text', title: 'About the company', content: str(d.description) })
          if (d.pricing) newKnowledge.push({ id: `kb-price-${ts}`, type: 'text', title: 'Pricing Overview', content: str(d.pricing) })
          if (d.contactInfo) newKnowledge.push({ id: `kb-contact-${ts}`, type: 'text', title: 'Contact Information', content: str(d.contactInfo) })
          // Detailed info entries (rooms, menu, procedures, etc.)
          if (d.detailedInfo && Array.isArray(d.detailedInfo)) {
            d.detailedInfo.forEach((info: { category?: string; title?: string; content?: unknown }, i: number) => {
              const title = str(info.title)
              const content = str(info.content)
              if (title && content) {
                newKnowledge.push({ id: `kb-detail-${ts}-${i}`, type: 'text', title: `${info.category ? `[${str(info.category)}] ` : ''}${title}`, content })
              }
            })
          }
          // FAQs
          if (d.faqs && Array.isArray(d.faqs)) {
            d.faqs.forEach((faq: { question?: unknown; answer?: unknown }, i: number) => {
              const q = str(faq.question)
              const a = str(faq.answer)
              if (q && a) newKnowledge.push({ id: `kb-faq-${ts}-${i}`, type: 'faq', title: q, content: a })
            })
          }
          newKnowledge.push({ id: `kb-link-${ts}`, type: 'link', title: 'Company Website', content: url })
          updated.knowledge = [...prev.knowledge, ...newKnowledge]

          // Welcome message
          if (d.companyName && !prev.welcomeMessage) {
            updated.welcomeMessage = `Hello! Welcome to ${d.companyName}. How can I help you today?`
          }

          return updated
        })

        setExtractedFromUrl(url)
        setTimeout(() => setExtractStatus(''), 3000)
      } else {
        throw new Error('No data returned')
      }
    } catch {
      setExtractStatus('Extraction failed — try a different URL or add data manually.')
      setTimeout(() => setExtractStatus(''), 4000)
    } finally {
      setIsExtracting(false)
    }
  }

  /* ─── Build knowledge context string from wizard data ─── */
  const buildKnowledgeContext = useCallback(() => {
    let ctx = ''
    ctx += `Company: ${config.companyName}\n`
    ctx += `Industry: ${config.industry}\n`
    if (config.website) ctx += `Website: ${config.website}\n`
    if (config.services) ctx += `Services offered: ${config.services}\n`
    if (config.phone) ctx += `Phone: ${config.phone}\n`
    if (config.workingHours) ctx += `Working hours: ${config.workingHours}\n`
    ctx += '\n'
    if (config.knowledge.length > 0) {
      ctx += '--- KNOWLEDGE BASE ---\n'
      config.knowledge.forEach(k => {
        if (k.type === 'faq') ctx += `Q: ${k.title}\nA: ${k.content}\n\n`
        else if (k.type === 'text') ctx += `[INFO] ${k.title}:\n${k.content}\n\n`
        else ctx += `[LINK] ${k.title}: ${k.content}\n\n`
      })
      ctx += '--- END KNOWLEDGE BASE ---\n'
    }
    ctx += '\nAlways prefer the knowledge base. If info is not available, say so honestly.'
    return ctx
  }, [config])

  /* ─── Initialize chat after generation ─── */
  useEffect(() => {
    if (phase === 'demo' && chatMessages.length === 0) {
      const welcome = config.welcomeMessage || `Hello! I'm ${config.botName}, the AI assistant for ${config.companyName}. How can I help you today?`
      setChatMessages([{ id: 'welcome', role: 'bot', text: welcome, time: now() }])
    }
  }, [phase, chatMessages.length, config.botName, config.companyName, config.welcomeMessage])

  /* ─── Scroll to bottom ─── */
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMessages, isTyping])

  /* ─── Notifications are now real-only (from lead capture, messages, etc.) ─── */

  /* ─── Time helper ─── */
  function now() { return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }

  /* ─── Send message ─── */
  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return
    const trimmed = text.trim()
    const ts = now()
    setChatMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text: trimmed, time: ts }])
    setUserInput('')
    setIsStreaming(true)
    setIsTyping(true)
    setTotalMessages(prev => prev + 1)
    const botMsgId = `b-${Date.now()}`

    const history: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
      { role: 'system', content: `You are ${config.botName}, AI assistant for ${config.companyName}.\n\nUse this knowledge:\n\n${buildKnowledgeContext()}\n\nPrefer knowledge base info. Company goal: ${config.goal}.` },
    ]
    for (const m of chatMessages) {
      if (m.id !== 'welcome') history.push({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })
    }
    history.push({ role: 'user', content: trimmed })

    let accumulated = ''
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          industry: config.industry,
          tone: config.tone,
          language: config.language,
          saveToDb: true,
          conversationId: dbConversationId,
          channel: 'web',
          customerName: visitorName,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setIsTyping(false)
      setChatMessages(prev => [...prev, { id: botMsgId, role: 'bot', text: '', time: now() }])
      setTotalMessages(prev => prev + 1)

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('No reader')
      let newConvId: string | null = null
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value, { stream: true }).split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                accumulated += parsed.content
                const acc = accumulated
                setChatMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: acc } : m))
              }
              if (parsed.conversationId) {
                newConvId = parsed.conversationId
                setDbConversationId(parsed.conversationId)
              }
            } catch { /* skip */ }
          }
        }
      }

      // Use the conversationId we got from the stream (or the one we already had)
      const activeConvId = newConvId || dbConversationId

      // Update conversations list from latest chatMessages state
      setChatMessages(currentMsgs => {
        // Read current messages inside this updater to get fresh state
        const allMsgs = currentMsgs.filter(m => m.id !== 'welcome')
        setConversations(prev => {
          const existing = prev.find(c => c.dbId === activeConvId)
          if (existing) {
            return prev.map(c => c.dbId === activeConvId ? { ...c, dbId: activeConvId, messages: allMsgs, time: now() } : c)
          }
          return [{ id: `conv-${Date.now()}`, dbId: activeConvId, name: visitorName, channel: 'Web Chat', messages: allMsgs, time: now(), status: 'active' }, ...prev]
        })
        return currentMsgs // don't modify chatMessages
      })
    } catch {
      setIsTyping(false)
      setChatMessages(prev => [...prev, { id: botMsgId, role: 'bot', text: 'Sorry, something went wrong. Please try again.', time: ts }])
    } finally {
      setIsStreaming(false)
    }

    // AI-based lead extraction — runs in background after each exchange
    if (config.autoLeadCapture) {
      setChatMessages(currentMsgs => {
        const msgsForAI = currentMsgs.filter(m => m.id !== 'welcome').map(m => ({ role: m.role, text: m.text }))
        if (msgsForAI.length >= 2) {
          fetch('/api/extract-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: msgsForAI, companyName: config.companyName }),
          })
            .then(r => r.json())
            .then(({ lead }) => {
              if (!lead?.found) return

              // Update visitor name
              if (lead.name) {
                setVisitorName(lead.name)
                setConversations(prev => prev.map(c => c.name === 'Demo Visitor' ? { ...c, name: lead.name } : c))
              }

              // Track captured contact info
              if (lead.email) setCapturedEmail(lead.email)
              if (lead.phone) setCapturedPhone(lead.phone)

              // Create or update lead
              if (lead.email || lead.phone) {
                const notesParts = [lead.interest, lead.address ? `Address: ${lead.address}` : ''].filter(Boolean).join(' | ')
                setLeadCreated(prev => {
                  if (prev) {
                    // Update existing lead with latest info
                    setLeads(leads => leads.map((l, i) => i === 0 ? {
                      ...l,
                      name: lead.name || l.name,
                      email: lead.email || l.email,
                      phone: lead.phone || l.phone,
                      status: lead.status || l.status,
                      notes: notesParts || l.notes,
                    } : l))
                    return true
                  }

                  // Create new lead
                  const leadName = lead.name || lead.email || lead.phone || 'Unknown'
                  fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: leadName, email: lead.email || null, phone: lead.phone || null, source: 'web', notes: notesParts || `${config.companyName} demo`, companyName: config.companyName }),
                  }).catch(() => {})

                  const newLead: LeadEntry = {
                    id: `l-${Date.now()}`,
                    name: leadName,
                    email: lead.email || '',
                    phone: lead.phone || '',
                    source: 'Web Chat',
                    status: lead.status || 'new',
                    notes: notesParts || `From ${config.companyName} demo`,
                    created: 'just now',
                  }
                  setLeads(prev => [newLead, ...prev])
                  setNotifications(prev => [{ id: `n-${Date.now()}`, icon: '🎯', text: `Lead captured — ${leadName}`, accent: 'text-emerald-400' }, ...prev].slice(0, 5))
                  return true
                })
              }
            })
            .catch(() => {})
        }
        return currentMsgs
      })
    }
  }

  /* ─── Add knowledge entry ─── */
  const addKnowledge = () => {
    if (!kbTitle.trim() || !kbContent.trim()) return
    updateConfig({ knowledge: [...config.knowledge, { id: `kb-${Date.now()}`, type: kbType, title: kbTitle.trim(), content: kbContent.trim() }] })
    setKbTitle('')
    setKbContent('')
  }

  /* ─── Handle generation ─── */
  const handleGenerate = () => {
    // Reset all demo state from previous session
    setLeads([])
    setConversations([])
    setNotifications([])
    setChatMessages([])
    setDbConversationId(null)
    setTotalMessages(0)
    setVisitorName('Demo Visitor')
    setCapturedEmail(null)
    setCapturedPhone(null)
    setLeadCreated(false)
    setUserInput('')
    setIsStreaming(false)
    setIsTyping(false)

    setPhase('generating')
    setTimeout(() => {
      setPhase('demo')
      setDemoTab('chat')
    }, 2800)
  }

  /* ─── Start new conversation ─── */
  const startNewConversation = () => {
    setDbConversationId(null)
    const welcome = config.welcomeMessage || `Hello! I'm ${config.botName}, the AI assistant for ${config.companyName}. How can I help you today?`
    setChatMessages([{ id: 'welcome', role: 'bot', text: welcome, time: now() }])
  }

  /* ─── Step validation ─── */
  const canProceed = (s: WizardStep) => {
    if (s === 1) return config.companyName.trim().length > 0
    if (s === 2) return true
    if (s === 3) return config.botName.trim().length > 0
    if (s === 4) return true
    return true
  }

  /* ─── Reusable UI aliases ─── */
  const Input = FormInput

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400', contacted: 'bg-amber-500/20 text-amber-400', qualified: 'bg-violet-500/20 text-violet-400', converted: 'bg-emerald-500/20 text-emerald-400',
    active: 'bg-emerald-500/20 text-emerald-400', waiting: 'bg-amber-500/20 text-amber-400', resolved: 'bg-zinc-500/20 text-zinc-400',
  }

  const industryLabel = INDUSTRIES.find(i => i.value === config.industry)?.label || config.industry
  const industryIcon = INDUSTRIES.find(i => i.value === config.industry)?.icon || '🏢'

  /* ═══════════════════════════════════════════════════════════════
     RENDER — WIZARD PHASE
     ═══════════════════════════════════════════════════════════════ */

  if (phase === 'wizard') {
    return (
      <div className="min-h-screen bg-[#08080c] text-white antialiased">
        {/* Header */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-500/20">N</div>
              <span className="text-[14px] font-semibold tracking-tight">NextBot</span>
              <span className="text-[11px] text-zinc-600 ml-2">Setup Wizard</span>
            </div>
            <div className="text-[12px] text-zinc-500">Step {step} of 5</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <div className="flex gap-2 mb-8">
            {([1, 2, 3, 4, 5] as WizardStep[]).map(s => (
              <div key={s} className="flex-1 flex flex-col items-center gap-2">
                <div className={`h-1 w-full rounded-full transition-all duration-500 ${s <= step ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-white/[0.06]'}`} />
                <span className={`text-[10px] font-medium transition-colors ${s === step ? 'text-blue-400' : s < step ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {['Business', 'Knowledge', 'Bot Config', 'Automation', 'Review'][s - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

              {/* ─── STEP 1: Business Info ─── */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Business Information</h2>
                    <p className="text-[13px] text-zinc-500 mt-1">Tell us about the company this bot will represent.</p>
                  </div>

                  {/* Website extraction card */}
                  <Card className="space-y-4 border-blue-500/10 bg-blue-500/[0.02]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌐</span>
                      <div>
                        <div className="text-[14px] font-semibold">Quick Setup from Website</div>
                        <div className="text-[11px] text-zinc-500">Enter a URL and let AI extract the business data automatically.</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.website}
                        onChange={e => updateConfig({ website: e.target.value })}
                        placeholder="https://example.com"
                        disabled={isExtracting}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); extractWebsite() } }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 disabled:opacity-50 transition-all"
                      />
                      <button
                        onClick={extractWebsite}
                        disabled={!config.website.trim() || isExtracting}
                        className={`px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all shrink-0 ${
                          isExtracting
                            ? 'bg-blue-500/20 text-blue-400 cursor-wait'
                            : config.website.trim()
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-[0.98]'
                              : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        {isExtracting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                            Analyzing...
                          </span>
                        ) : (
                          '⚡ Auto-Extract'
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {extractStatus && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`text-[12px] font-medium flex items-center gap-2 ${
                            extractStatus.includes('failed') ? 'text-red-400' : extractStatus.includes('complete') || extractStatus.includes('sample') ? 'text-emerald-400' : 'text-blue-400'
                          }`}
                        >
                          {isExtracting && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                          {extractStatus}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {extractedFromUrl && !isExtracting && (
                      <div className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                        <span className="text-emerald-400">✓</span> Data extracted from {extractedFromUrl} — edit any field below.
                      </div>
                    )}
                  </Card>

                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-[11px] text-zinc-600">or fill in manually</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  <Input label="Company Name *" value={config.companyName} onChange={v => updateConfig({ companyName: v })} placeholder="e.g. Grand Hotel Sofia" />

                  {/* Industry: only show selector if not auto-detected from URL */}
                  {extractedFromUrl && config.industry !== 'custom' ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-lg">{INDUSTRIES.find(i => i.value === config.industry)?.icon}</span>
                      <div className="flex-1">
                        <div className="text-[13px] font-medium">{INDUSTRIES.find(i => i.value === config.industry)?.label}</div>
                        <div className="text-[11px] text-zinc-500">Auto-detected from website</div>
                      </div>
                      <button onClick={() => setExtractedFromUrl(null)} className="text-[11px] text-zinc-500 hover:text-blue-400 transition-colors">Change</button>
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Industry *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {INDUSTRIES.map(ind => (
                          <button key={ind.value} onClick={() => updateConfig({ industry: ind.value })} className={`px-3 py-2.5 rounded-xl text-[12px] font-medium text-left transition-all ${config.industry === ind.value ? 'bg-blue-500/15 border border-blue-500/30 text-white' : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:bg-white/[0.06]'}`}>
                            <span className="mr-1.5">{ind.icon}</span>{ind.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Phone" value={config.phone} onChange={v => updateConfig({ phone: v })} placeholder="+359 888 123 456" />
                    <Input label="Working Hours" value={config.workingHours} onChange={v => updateConfig({ workingHours: v })} placeholder="e.g. Mon-Fri 09:00-18:00" />
                  </div>
                  <Input label="Services Offered" value={config.services} onChange={v => updateConfig({ services: v })} placeholder="e.g. Rooms, SPA, Restaurant, Conference halls, Airport transfer" textarea />
                </div>
              )}

              {/* ─── STEP 2: Knowledge Training ─── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Knowledge Training</h2>
                    <p className="text-[13px] text-zinc-500 mt-1">Add information the bot will use to answer questions. More knowledge = better responses.</p>
                  </div>

                  {/* Add entry form */}
                  <Card className="space-y-4">
                    <div className="flex gap-2">
                      {(['faq', 'text', 'link'] as const).map(t => (
                        <button key={t} onClick={() => setKbType(t)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${kbType === t ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06] hover:text-zinc-300'}`}>
                          {t === 'faq' ? '❓ FAQ' : t === 'text' ? '📝 Text' : '🔗 Link'}
                        </button>
                      ))}
                    </div>
                    <Input label={kbType === 'faq' ? 'Question' : kbType === 'text' ? 'Title' : 'Link Name'} value={kbTitle} onChange={setKbTitle} placeholder={kbType === 'faq' ? 'e.g. What are your room prices?' : kbType === 'text' ? 'e.g. Pricing Information' : 'e.g. Menu PDF'} />
                    <Input label={kbType === 'faq' ? 'Answer' : kbType === 'text' ? 'Content' : 'URL'} value={kbContent} onChange={setKbContent} placeholder={kbType === 'faq' ? 'e.g. Single from €40, Double from €60...' : kbType === 'text' ? 'Enter detailed information...' : 'https://example.com/menu.pdf'} textarea={kbType !== 'link'} />
                    <button onClick={addKnowledge} disabled={!kbTitle.trim() || !kbContent.trim()} className="px-4 py-2 rounded-lg bg-blue-600 text-[12px] font-semibold hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      + Add Entry
                    </button>
                  </Card>

                  {/* Knowledge list */}
                  {config.knowledge.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium">{config.knowledge.length} {config.knowledge.length === 1 ? 'entry' : 'entries'} added</div>
                      {config.knowledge.map(k => (
                        <div key={k.id} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-sm mt-0.5">{k.type === 'faq' ? '❓' : k.type === 'text' ? '📝' : '🔗'}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium">{k.title}</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2">{k.content}</div>
                          </div>
                          <button onClick={() => updateConfig({ knowledge: config.knowledge.filter(x => x.id !== k.id) })} className="text-[11px] text-zinc-600 hover:text-red-400 transition-colors shrink-0 mt-0.5">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {config.knowledge.length === 0 && (
                    <div className="text-center py-8 text-zinc-600 text-[13px]">
                      No knowledge entries yet. Add FAQs, text, or links to train the bot.<br />
                      <span className="text-zinc-500">You can also skip this step and add knowledge later.</span>
                    </div>
                  )}
                </div>
              )}

              {/* ─── STEP 3: Bot Configuration ─── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Bot Configuration</h2>
                    <p className="text-[13px] text-zinc-500 mt-1">Customize how your AI assistant behaves and communicates.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Bot Name *" value={config.botName} onChange={v => updateConfig({ botName: v })} placeholder="e.g. Neo, Ava, Max" />
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Language</label>
                      <div className="flex gap-2">
                        {LANGUAGES.map(l => (
                          <button key={l.value} onClick={() => updateConfig({ language: l.value })} className={`flex-1 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all ${config.language === l.value ? 'bg-blue-500/15 border border-blue-500/30 text-white' : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:bg-white/[0.06]'}`}>
                            {l.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Tone</label>
                    <div className="grid grid-cols-3 gap-3">
                      {TONES.map(t => (
                        <button key={t.value} onClick={() => updateConfig({ tone: t.value })} className={`px-4 py-3 rounded-xl text-left transition-all ${config.tone === t.value ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'}`}>
                          <div className={`text-[13px] font-semibold ${config.tone === t.value ? 'text-white' : 'text-zinc-300'}`}>{t.label}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input label="Welcome Message" value={config.welcomeMessage} onChange={v => updateConfig({ welcomeMessage: v })} placeholder={`e.g. Hello! Welcome to ${config.companyName || 'our business'}. How can I help you?`} textarea />

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Primary Goal</label>
                    <div className="grid grid-cols-3 gap-3">
                      {GOALS.map(g => (
                        <button key={g.value} onClick={() => updateConfig({ goal: g.value })} className={`px-4 py-3 rounded-xl text-left transition-all ${config.goal === g.value ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'}`}>
                          <div className="text-lg mb-1">{g.icon}</div>
                          <div className={`text-[13px] font-semibold ${config.goal === g.value ? 'text-white' : 'text-zinc-300'}`}>{g.label}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{g.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: Automation Setup ─── */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Automation Setup</h2>
                    <p className="text-[13px] text-zinc-500 mt-1">Enable automatic workflows for your bot.</p>
                  </div>
                  {[
                    { key: 'autoLeadCapture' as const, icon: '🎯', title: 'Lead Capture', desc: 'Automatically detect and save contact info (email, phone) from conversations. Leads are synced to your CRM.', result: 'Avg. 15 leads/day captured without manual work' },
                    { key: 'autoBooking' as const, icon: '📅', title: 'Booking Automation', desc: 'Allow the bot to collect booking details and create appointments. Synced with Google Calendar.', result: '40% reduction in no-shows with automated reminders' },
                    { key: 'autoNotifications' as const, icon: '🔔', title: 'Notifications & Follow-ups', desc: 'Send automatic confirmation emails, reminders (24h before), and follow-up messages after visits.', result: '3x more Google reviews with automated follow-ups' },
                  ].map(auto => (
                    <Card key={auto.key} className={`transition-all ${config[auto.key] ? '' : 'opacity-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-xl mt-0.5">{auto.icon}</span>
                          <div>
                            <div className="text-[15px] font-semibold">{auto.title}</div>
                            <div className="text-[12px] text-zinc-400 mt-1 max-w-md">{auto.desc}</div>
                            <div className="text-[11px] text-emerald-400/70 mt-2">✓ {auto.result}</div>
                          </div>
                        </div>
                        <button onClick={() => updateConfig({ [auto.key]: !config[auto.key] } as Partial<BusinessConfig>)} className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${config[auto.key] ? 'bg-blue-500' : 'bg-zinc-700'}`}>
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${config[auto.key] ? 'left-[26px]' : 'left-0.5'}`} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ─── STEP 5: Review & Generate ─── */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[24px] font-bold tracking-tight">Review & Generate</h2>
                    <p className="text-[13px] text-zinc-500 mt-1">Everything looks good? Generate your AI bot.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Business</div>
                      <div className="space-y-2">
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Company</span><span className="text-[13px] font-medium">{config.companyName}</span></div>
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Industry</span><span className="text-[13px]">{industryIcon} {industryLabel}</span></div>
                        {config.website && <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Website</span><span className="text-[13px] text-blue-400">{config.website}</span></div>}
                        {config.phone && <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Phone</span><span className="text-[13px]">{config.phone}</span></div>}
                        {config.workingHours && <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Hours</span><span className="text-[13px] text-right max-w-[200px]">{config.workingHours}</span></div>}
                      </div>
                    </Card>
                    <Card>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Bot Configuration</div>
                      <div className="space-y-2">
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Bot Name</span><span className="text-[13px] font-medium">{config.botName}</span></div>
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Tone</span><span className="text-[13px] capitalize">{config.tone}</span></div>
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Language</span><span className="text-[13px]">{LANGUAGES.find(l => l.value === config.language)?.label}</span></div>
                        <div className="flex justify-between"><span className="text-[12px] text-zinc-500">Goal</span><span className="text-[13px]">{GOALS.find(g => g.value === config.goal)?.label}</span></div>
                      </div>
                    </Card>
                  </div>

                  <Card>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Knowledge Base — {config.knowledge.length} {config.knowledge.length === 1 ? 'entry' : 'entries'}</div>
                    {config.knowledge.length > 0 ? (
                      <div className="space-y-1.5">
                        {config.knowledge.map(k => (
                          <div key={k.id} className="flex items-center gap-2 text-[12px]">
                            <span>{k.type === 'faq' ? '❓' : k.type === 'text' ? '📝' : '🔗'}</span>
                            <span className="text-zinc-300">{k.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[12px] text-zinc-600">No knowledge entries — bot will use general knowledge.</div>
                    )}
                  </Card>

                  {config.services && (
                    <Card>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Services</div>
                      <div className="text-[13px] text-zinc-300">{config.services}</div>
                    </Card>
                  )}

                  <Card>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Automations</div>
                    <div className="flex gap-4">
                      {[
                        { label: 'Lead Capture', on: config.autoLeadCapture },
                        { label: 'Booking', on: config.autoBooking },
                        { label: 'Notifications', on: config.autoNotifications },
                      ].map(a => (
                        <div key={a.label} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${a.on ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                          <span className={`text-[12px] ${a.on ? 'text-zinc-300' : 'text-zinc-600'}`}>{a.label}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {config.welcomeMessage && (
                    <Card>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Welcome Message</div>
                      <div className="text-[13px] text-zinc-300 italic">&ldquo;{config.welcomeMessage}&rdquo;</div>
                    </Card>
                  )}

                  <motion.button onClick={handleGenerate} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-[15px] font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow">
                    ⚡ Generate AI Bot
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-white/[0.06] bg-[#08080c]/90 backdrop-blur-xl z-20">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={() => setStep(prev => Math.max(1, prev - 1) as WizardStep)} disabled={step === 1} className="px-5 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Back
            </button>
            {step < 5 ? (
              <button onClick={() => setStep(prev => Math.min(5, prev + 1) as WizardStep)} disabled={!canProceed(step)} className="px-6 py-2.5 rounded-xl bg-blue-600 text-[13px] font-semibold hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Continue
              </button>
            ) : (
              <div className="text-[11px] text-zinc-600">Click &ldquo;Generate AI Bot&rdquo; above</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER — GENERATING PHASE
     ═══════════════════════════════════════════════════════════════ */

  if (phase === 'generating') {
    return (
      <div className="min-h-screen bg-[#08080c] text-white antialiased flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-2xl shadow-blue-500/30">
            N
          </motion.div>
          <h2 className="text-[22px] font-bold mb-2">Generating {config.botName}...</h2>
          <p className="text-[13px] text-zinc-500">Building AI assistant for {config.companyName}</p>
          <div className="mt-6 flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-2 h-2 rounded-full bg-blue-400" />
            ))}
          </div>
          <div className="mt-8 space-y-2 text-[12px] text-zinc-600">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>✓ Loading business profile...</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>✓ Training on {config.knowledge.length} knowledge entries...</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>✓ Configuring {config.tone} tone in {LANGUAGES.find(l => l.value === config.language)?.label}...</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>✓ Enabling automations...</motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER — DEMO PHASE
     ═══════════════════════════════════════════════════════════════ */

  const DEMO_TABS: { key: DemoTab; label: string; icon: string }[] = [
    { key: 'chat', label: 'Live Chat', icon: '💬' },
    { key: 'dashboard', label: 'Dashboard', icon: '◻' },
    { key: 'conversations', label: 'Conversations', icon: '📋' },
    { key: 'leads', label: 'Leads', icon: '👤' },
    { key: 'analytics', label: 'Analytics', icon: '📊' },
    { key: 'knowledge', label: 'Knowledge', icon: '📚' },
    { key: 'settings', label: 'Settings', icon: '⚙' },
  ]

  return (
    <div className="h-screen bg-[#08080c] text-white antialiased flex flex-col overflow-hidden">

      {/* ═══ NAV ═══ */}
      <nav className="border-b border-white/[0.06] shrink-0 z-30">
        <div className="px-5 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2.5 mr-4 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-500/20">N</div>
            <span className="text-[14px] font-semibold tracking-tight">NextBot</span>
            <span className="text-[11px] text-zinc-600 mx-1">·</span>
            <span className="text-[12px] text-zinc-400">{config.companyName}</span>
          </div>
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
            {DEMO_TABS.map(t => (
              <button key={t.key} onClick={() => setDemoTab(t.key)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${demoTab === t.key ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'}`}>
                <span className="mr-1.5 text-[11px]">{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <button onClick={() => { setPhase('wizard'); setStep(1); setConfig(DEFAULT_CONFIG); setExtractedFromUrl(null) }} className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors mr-3">← Wizard</button>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/80 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live</div>
        </div>
      </nav>

      {/* ═══ CONTENT ═══ */}
      <div className="flex-1 overflow-y-auto">

        {/* ═══ CHAT TAB ═══ */}
        {demoTab === 'chat' && (
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 items-start">
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-400 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{config.botName} is live for {config.companyName}
                  </div>
                  <h1 className="text-[2.2rem] lg:text-[2.8rem] font-bold leading-[1.05] tracking-[-0.03em]">
                    {industryIcon} {config.companyName}
                  </h1>
                  <p className="mt-3 text-[14px] text-zinc-400 leading-relaxed max-w-lg">
                    {config.botName} handles conversations, captures leads, and manages bookings — 24/7.
                    {config.services && <span className="block mt-1 text-zinc-500">Services: {config.services}</span>}
                  </p>
                </motion.div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[22px] font-bold text-blue-400 tabular-nums">{totalMessages}</div>
                    <div className="text-[11px] text-zinc-500">Messages</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[22px] font-bold text-emerald-400 tabular-nums">{leads.length}</div>
                    <div className="text-[11px] text-zinc-500">Leads</div>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[22px] font-bold text-violet-400 tabular-nums">{conversations.length}</div>
                    <div className="text-[11px] text-zinc-500">Conversations</div>
                  </div>
                </div>

                {/* Live notifications */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-zinc-500 font-medium mb-2">Live Activity</div>
                  <div className="space-y-1.5 h-[160px] overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {notifications.map(n => (
                        <motion.div key={n.id} initial={{ opacity: 0, x: -16, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }} exit={{ opacity: 0, x: 16, height: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                          <span className="text-sm">{n.icon}</span><span className={`text-[12px] font-medium ${n.accent}`}>{n.text}</span><span className="text-[10px] text-zinc-700 ml-auto">just now</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <button onClick={startNewConversation} className="text-[12px] text-zinc-500 hover:text-blue-400 transition-colors">+ New conversation</button>
              </div>

              {/* Chat panel */}
              <div className="lg:sticky lg:top-6">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c14]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col">
                  <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold shadow-lg">{config.botName[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold">{config.botName}</div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{config.companyName}</div>
                    </div>
                    <span className="text-[10px] text-zinc-600 capitalize">{config.tone}</span>
                  </div>
                  <div className="h-[440px] overflow-y-auto px-4 py-3 space-y-3 flex-1">
                    <AnimatePresence>
                      {chatMessages.map(msg => (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className="max-w-[85%]">
                            <div className={`px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white/[0.06] text-zinc-200 rounded-bl-md border border-white/[0.04]'}`}>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                            <div className={`text-[10px] text-zinc-600 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                              {msg.role === 'bot' && <span className="text-blue-400/60 font-medium">{config.botName} · </span>}{msg.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isTyping && (
                      <div className="flex justify-start"><div className="bg-white/[0.06] border border-white/[0.04] rounded-2xl rounded-bl-md px-4 py-2.5">
                        <div className="flex gap-1.5">{[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}</div>
                      </div></div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={e => { e.preventDefault(); sendMessage(userInput) }} className="px-3 py-2.5 border-t border-white/[0.06] shrink-0">
                    <div className="flex items-center gap-2">
                      <input ref={inputRef} type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Type a message..." disabled={isStreaming} className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.06] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 disabled:opacity-40 transition-all" />
                      <button type="submit" disabled={!userInput.trim() || isStreaming} className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${userInput.trim() && !isStreaming ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'}`}>Send</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ DASHBOARD TAB ═══ */}
        {demoTab === 'dashboard' && (
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-6">
            <div><h2 className="text-[22px] font-bold tracking-tight">Dashboard</h2><p className="text-[13px] text-zinc-500 mt-1">Real-time overview — {config.companyName}</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { v: String(conversations.length || 0), l: 'Conversations', s: 'This session', c: 'text-blue-400' },
                { v: String(leads.length), l: 'Leads Generated', s: 'Captured from chat', c: 'text-emerald-400' },
                { v: String(totalMessages), l: 'Messages', s: 'Total exchanged', c: 'text-amber-400' },
                { v: config.knowledge.length > 0 ? `${config.knowledge.length}` : '0', l: 'Knowledge Entries', s: 'Training data', c: 'text-violet-400' },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2">{s.l}</div>
                  <div className={`text-[28px] font-bold tabular-nums ${s.c}`}>{s.v}</div>
                  <div className="text-[11px] text-zinc-600 mt-1">{s.s}</div>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <div className="text-[14px] font-semibold mb-4">Bot Configuration</div>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Name</span><span className="text-zinc-300 font-medium">{config.botName}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Company</span><span className="text-zinc-300">{config.companyName}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Industry</span><span className="text-zinc-300">{industryIcon} {industryLabel}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Tone</span><span className="text-zinc-300 capitalize">{config.tone}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Language</span><span className="text-zinc-300">{LANGUAGES.find(l => l.value === config.language)?.label}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Goal</span><span className="text-zinc-300">{GOALS.find(g => g.value === config.goal)?.label}</span></div>
                </div>
              </Card>
              <Card>
                <div className="text-[14px] font-semibold mb-4">Recent Activity</div>
                <div className="space-y-3">
                  {notifications.length > 0 ? notifications.slice(0, 5).map((n, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-sm mt-0.5">{n.icon}</span>
                      <div className="flex-1"><div className={`text-[12px] ${n.accent}`}>{n.text}</div><div className="text-[10px] text-zinc-600">just now</div></div>
                    </div>
                  )) : (
                    <div className="text-[12px] text-zinc-600">No activity yet. Start a chat conversation!</div>
                  )}
                </div>
              </Card>
            </div>
            <Card>
              <div className="text-[14px] font-semibold mb-3">Automations Status</div>
              <div className="flex gap-6">
                {[
                  { label: 'Lead Capture', on: config.autoLeadCapture },
                  { label: 'Booking', on: config.autoBooking },
                  { label: 'Notifications', on: config.autoNotifications },
                ].map(a => (
                  <div key={a.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${a.on ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                    <span className={`text-[13px] ${a.on ? 'text-zinc-300' : 'text-zinc-600 line-through'}`}>{a.label}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${a.on ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-500/15 text-zinc-500'}`}>{a.on ? 'ON' : 'OFF'}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ═══ CONVERSATIONS TAB ═══ */}
        {demoTab === 'conversations' && (
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-6">
            <div><h2 className="text-[22px] font-bold tracking-tight">Conversations</h2><p className="text-[13px] text-zinc-500 mt-1">{conversations.length} total — {config.companyName}</p></div>
            {conversations.length > 0 ? (
              <div className="space-y-4">
                {conversations.map(conv => (
                  <Card key={conv.id}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-sm">👤</div>
                        <div>
                          <div className="text-[14px] font-semibold">{conv.name}</div>
                          <div className="text-[11px] text-zinc-500">{conv.channel} · {conv.time}</div>
                        </div>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusColors[conv.status] || statusColors.active}`}>{conv.status}</span>
                    </div>
                    <div className="space-y-2 pl-12">
                      {conv.messages.slice(-4).map((m, i) => (
                        <div key={i} className="text-[12px]">
                          <span className={`font-medium ${m.role === 'user' ? 'text-blue-400' : 'text-emerald-400'}`}>{m.role === 'user' ? 'Visitor' : config.botName}:</span>
                          <span className="text-zinc-400 ml-1.5">{m.text.length > 120 ? m.text.substring(0, 120) + '...' : m.text}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">💬</div>
                <div className="text-[15px] font-semibold mb-1">No conversations yet</div>
                <div className="text-[13px] text-zinc-500">Start a chat to see conversations appear here in real time.</div>
                <button onClick={() => setDemoTab('chat')} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-[12px] font-semibold hover:bg-blue-500 transition-colors">Go to Live Chat</button>
              </div>
            )}
          </div>
        )}

        {/* ═══ LEADS TAB ═══ */}
        {demoTab === 'leads' && (
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-6">
            <div><h2 className="text-[22px] font-bold tracking-tight">Leads</h2><p className="text-[13px] text-zinc-500 mt-1">{leads.length} contacts — {config.companyName}</p></div>
            {leads.length > 0 ? (
              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {['Name', 'Email', 'Phone', 'Source', 'Status', 'Notes', 'Created'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-zinc-500 font-medium">{h}</th>)}
                  </tr></thead>
                  <tbody>{leads.map(lead => (
                    <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-[13px] font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-[12px] text-zinc-400">{lead.email || '—'}</td>
                      <td className="px-4 py-3 text-[12px] text-zinc-400">{lead.phone || '—'}</td>
                      <td className="px-4 py-3 text-[12px] text-zinc-400">{lead.source}</td>
                      <td className="px-4 py-3"><span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusColors[lead.status] || statusColors.new}`}>{lead.status}</span></td>
                      <td className="px-4 py-3 text-[12px] text-zinc-500 max-w-[200px] truncate">{lead.notes}</td>
                      <td className="px-4 py-3 text-[11px] text-zinc-600">{lead.created}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🎯</div>
                <div className="text-[15px] font-semibold mb-1">No leads captured yet</div>
                <div className="text-[13px] text-zinc-500">{config.autoLeadCapture ? 'Send a message with an email or phone number in the chat to test lead capture.' : 'Lead capture is disabled. Enable it in automation settings.'}</div>
                <button onClick={() => setDemoTab('chat')} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-[12px] font-semibold hover:bg-blue-500 transition-colors">Go to Live Chat</button>
              </div>
            )}
          </div>
        )}

        {/* ═══ ANALYTICS TAB ═══ */}
        {demoTab === 'analytics' && (
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-6">
            <div><h2 className="text-[22px] font-bold tracking-tight">Analytics</h2><p className="text-[13px] text-zinc-500 mt-1">Performance metrics — {config.companyName}</p></div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: String(totalMessages), l: 'Total Messages', s: 'This session', g: 'from-blue-500 to-indigo-600' },
                { v: `${conversations.length > 0 ? '100' : '0'}%`, l: 'Resolution Rate', s: `${conversations.length} resolved`, g: 'from-emerald-500 to-teal-600' },
                { v: String(leads.length), l: 'Leads Captured', s: 'From conversations', g: 'from-amber-500 to-orange-600' },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl bg-gradient-to-br ${s.g} p-5`}>
                  <div className="text-[12px] font-medium opacity-80 mb-1">{s.l}</div>
                  <div className="text-[32px] font-bold tabular-nums leading-none mb-1">{s.v}</div>
                  <div className="text-[12px] opacity-60">{s.s}</div>
                </div>
              ))}
            </div>
            <Card>
              <div className="text-[14px] font-semibold mb-4">Session Summary</div>
              <div className="space-y-3">
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Bot Name</span><span className="text-zinc-300">{config.botName}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Company</span><span className="text-zinc-300">{config.companyName}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Industry</span><span className="text-zinc-300">{industryLabel}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Knowledge Entries</span><span className="text-zinc-300">{config.knowledge.length}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Lead Capture</span><span className={config.autoLeadCapture ? 'text-emerald-400' : 'text-zinc-500'}>{config.autoLeadCapture ? 'Active' : 'Disabled'}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-zinc-500">Booking Automation</span><span className={config.autoBooking ? 'text-emerald-400' : 'text-zinc-500'}>{config.autoBooking ? 'Active' : 'Disabled'}</span></div>
              </div>
            </Card>
          </div>
        )}

        {/* ═══ KNOWLEDGE TAB ═══ */}
        {demoTab === 'knowledge' && (
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div><h2 className="text-[22px] font-bold tracking-tight">Knowledge Base</h2><p className="text-[13px] text-zinc-500 mt-1">{config.knowledge.length} entries — {config.companyName}</p></div>
            </div>

            {/* Quick add */}
            <Card className="space-y-4">
              <div className="text-[13px] font-semibold">Add Knowledge Entry</div>
              <div className="flex gap-2">
                {(['faq', 'text', 'link'] as const).map(t => (
                  <button key={t} onClick={() => setKbType(t)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${kbType === t ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06]'}`}>
                    {t === 'faq' ? '❓ FAQ' : t === 'text' ? '📝 Text' : '🔗 Link'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" value={kbTitle} onChange={e => setKbTitle(e.target.value)} placeholder={kbType === 'faq' ? 'Question...' : 'Title...'} className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 transition-all" />
                <div className="flex gap-2">
                  <input type="text" value={kbContent} onChange={e => setKbContent(e.target.value)} placeholder={kbType === 'faq' ? 'Answer...' : 'Content...'} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/40 transition-all" />
                  <button onClick={addKnowledge} disabled={!kbTitle.trim() || !kbContent.trim()} className="px-4 py-2 rounded-xl bg-blue-600 text-[12px] font-semibold hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0">Add</button>
                </div>
              </div>
            </Card>

            {/* Business info as implicit knowledge */}
            <Card>
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-3">Business Context (auto-included)</div>
              <div className="space-y-1.5 text-[12px]">
                <div className="text-zinc-400">Company: <span className="text-zinc-300">{config.companyName}</span></div>
                {config.services && <div className="text-zinc-400">Services: <span className="text-zinc-300">{config.services}</span></div>}
                {config.workingHours && <div className="text-zinc-400">Hours: <span className="text-zinc-300">{config.workingHours}</span></div>}
                {config.phone && <div className="text-zinc-400">Phone: <span className="text-zinc-300">{config.phone}</span></div>}
                {config.website && <div className="text-zinc-400">Website: <span className="text-blue-400">{config.website}</span></div>}
              </div>
            </Card>

            {/* Knowledge entries */}
            {config.knowledge.length > 0 ? (
              <div className="space-y-3">
                {config.knowledge.map(k => (
                  <Card key={k.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">{k.type === 'faq' ? '❓' : k.type === 'text' ? '📝' : '🔗'}</span>
                        <div>
                          <div className="text-[14px] font-semibold">{k.title}</div>
                          <div className="text-[12px] text-zinc-400 mt-1 whitespace-pre-wrap">{k.content}</div>
                        </div>
                      </div>
                      <button onClick={() => updateConfig({ knowledge: config.knowledge.filter(x => x.id !== k.id) })} className="text-[11px] text-zinc-600 hover:text-red-400 transition-colors shrink-0">Remove</button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-600 text-[13px]">
                No custom knowledge entries. The bot uses business context above.<br />
                Add FAQs, pricing info, or other details to improve responses.
              </div>
            )}
          </div>
        )}

        {/* ═══ SETTINGS TAB ═══ */}
        {demoTab === 'settings' && (
          <div className="max-w-[600px] mx-auto px-6 py-8 space-y-6">
            <div><h2 className="text-[22px] font-bold tracking-tight">Settings</h2><p className="text-[13px] text-zinc-500 mt-1">Edit bot configuration — changes apply instantly.</p></div>
            <Card className="space-y-5">
              <Input label="Company Name" value={config.companyName} onChange={v => updateConfig({ companyName: v })} placeholder="Company name" />
              <Input label="Bot Name" value={config.botName} onChange={v => updateConfig({ botName: v })} placeholder="Bot name" />
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Tone</label>
                <div className="flex gap-2">
                  {TONES.map(t => (
                    <button key={t.value} onClick={() => updateConfig({ tone: t.value })} className={`flex-1 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all ${config.tone === t.value ? 'bg-blue-500/15 border border-blue-500/30 text-white' : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 font-medium block mb-2">Language</label>
                <div className="flex gap-2">
                  {LANGUAGES.map(l => (
                    <button key={l.value} onClick={() => updateConfig({ language: l.value })} className={`flex-1 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all ${config.language === l.value ? 'bg-blue-500/15 border border-blue-500/30 text-white' : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Welcome Message" value={config.welcomeMessage} onChange={v => updateConfig({ welcomeMessage: v })} placeholder="Custom welcome message" textarea />
              <Input label="Services" value={config.services} onChange={v => updateConfig({ services: v })} placeholder="Services offered" textarea />
              <Input label="Working Hours" value={config.workingHours} onChange={v => updateConfig({ workingHours: v })} placeholder="Mon-Fri 9:00-18:00" />
              <Input label="Phone" value={config.phone} onChange={v => updateConfig({ phone: v })} placeholder="+359 888 123 456" />
            </Card>
            <div className="flex gap-3">
              <button onClick={startNewConversation} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-[12px] font-semibold hover:bg-blue-500 transition-colors">Apply & Reset Chat</button>
              <button onClick={() => { setPhase('wizard'); setStep(1); setConfig(DEFAULT_CONFIG); setExtractedFromUrl(null) }} className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium text-zinc-400 hover:text-white transition-all">Back to Wizard</button>
            </div>
            <div className="text-[11px] text-zinc-600 text-center">Changes to company name, services, hours, and knowledge are used in real-time by the AI.</div>
          </div>
        )}

      </div>
    </div>
  )
}
