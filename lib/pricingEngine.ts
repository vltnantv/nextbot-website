// ─── Types ───────────────────────────────────────────────────────────────────

export interface Industry {
  id: string
  name: { bg: string; en: string }
  icon: string
  recommendedModules: string[]
  recommendedChannels: string[]
  packPrice: number
}

export interface Channel {
  id: string
  name: { bg: string; en: string }
  icon: string
  price: number
}

export interface Module {
  id: string
  name: { bg: string; en: string }
  description: { bg: string; en: string }
  price: number
}

export interface VolumeTier {
  id: string
  label: { bg: string; en: string }
  conversations: number | null // null = unlimited
  price: number
}

export interface VoiceTier {
  id: string
  label: { bg: string; en: string }
  minutes: number | null // null = unlimited
  price: number
}

export interface PlatformConfig {
  industry: string | null
  channels: string[]
  modules: string[]
  conversationTier: string
  voiceTier: string
  locations: number
  operators: number
}

export interface PricingBreakdown {
  label: { bg: string; en: string }
  amount: number
}

export interface PricingResult {
  monthly: number
  setupFee: number
  breakdown: PricingBreakdown[]
  savingsVsEmployee: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const BASE_PLATFORM_PRICE = 112

export const INDUSTRIES: Industry[] = [
  {
    id: 'taxi',
    name: { bg: 'Такси & Транспорт', en: 'Taxi & Transport' },
    icon: '🚕',
    recommendedModules: ['booking', 'dispatch', 'voice_routing'],
    recommendedChannels: ['social', 'voice'],
    packPrice: 92,
  },
  {
    id: 'hotel',
    name: { bg: 'Хотели & Туризъм', en: 'Hotels & Tourism' },
    icon: '🏨',
    recommendedModules: ['booking', 'multilang', 'crm_sync'],
    recommendedChannels: ['website_chat', 'social', 'email'],
    packPrice: 102,
  },
  {
    id: 'dental',
    name: { bg: 'Дентални клиники', en: 'Dental Clinics' },
    icon: '🦷',
    recommendedModules: ['booking', 'crm_sync', 'analytics'],
    recommendedChannels: ['website_chat', 'social', 'voice'],
    packPrice: 82,
  },
  {
    id: 'parking',
    name: { bg: 'Паркинги', en: 'Parking' },
    icon: '🅿️',
    recommendedModules: ['barrier_control', 'voice_routing', 'analytics'],
    recommendedChannels: ['voice'],
    packPrice: 128,
  },
  {
    id: 'real_estate',
    name: { bg: 'Недвижими имоти', en: 'Real Estate' },
    icon: '🏠',
    recommendedModules: ['lead_qual', 'booking', 'crm_sync'],
    recommendedChannels: ['website_chat', 'social'],
    packPrice: 87,
  },
  {
    id: 'restaurants',
    name: { bg: 'Ресторанти', en: 'Restaurants' },
    icon: '🍽️',
    recommendedModules: ['booking', 'multilang', 'analytics'],
    recommendedChannels: ['website_chat', 'social'],
    packPrice: 61,
  },
  {
    id: 'other',
    name: { bg: 'Друго', en: 'Other' },
    icon: '•••',
    recommendedModules: [],
    recommendedChannels: [],
    packPrice: 0,
  },
]

export const CHANNELS: Channel[] = [
  { id: 'website_chat', name: { bg: 'Neo Assistant', en: 'Neo Assistant' }, icon: '💬', price: 0 },
  { id: 'social', name: { bg: 'Social Network Automation', en: 'Social Network Automation' }, icon: '📱', price: 15 },
  { id: 'email', name: { bg: 'Email автоматизация', en: 'Email Automation' }, icon: '📧', price: 13 },
  { id: 'voice', name: { bg: 'Voice AI', en: 'Voice AI' }, icon: '🎙️', price: 31 },
]

export const MODULES: Module[] = [
  {
    id: 'booking',
    name: { bg: 'Резервации', en: 'Booking' },
    description: { bg: 'Автоматично управление на резервации и записвания', en: 'Automated booking and appointment management' },
    price: 20,
  },
  {
    id: 'lead_qual',
    name: { bg: 'Квалификация на лийдове', en: 'Lead Qualification' },
    description: { bg: 'AI оценка и класиране на потенциални клиенти', en: 'AI-powered lead scoring and qualification' },
    price: 26,
  },
  {
    id: 'crm_sync',
    name: { bg: 'CRM синхронизация', en: 'CRM Sync' },
    description: { bg: 'Интеграция с вашата CRM система в реално време', en: 'Real-time integration with your CRM system' },
    price: 18,
  },
  {
    id: 'voice_routing',
    name: { bg: 'AI гласово насочване', en: 'AI Voice Routing' },
    description: { bg: 'Интелигентно насочване на обаждания с AI', en: 'Intelligent call routing powered by AI' },
    price: 28,
  },
  {
    id: 'multilang',
    name: { bg: 'Многоезичност', en: 'Multi-language' },
    description: { bg: 'Поддръжка на 15+ езика с автоматичен превод', en: 'Support for 15+ languages with auto-translation' },
    price: 23,
  },
  {
    id: 'dispatch',
    name: { bg: 'Диспечерска автоматизация', en: 'Dispatch Automation' },
    description: { bg: 'Автоматично разпределение на заявки и ресурси', en: 'Automated request and resource dispatching' },
    price: 33,
  },
  {
    id: 'barrier_control',
    name: { bg: 'Гласов контрол на бариери', en: 'Barrier Voice Control' },
    description: { bg: 'Гласово управление на паркинг бариери и достъп', en: 'Voice-controlled parking barrier and access management' },
    price: 41,
  },
  {
    id: 'analytics',
    name: { bg: 'Analytics Pro', en: 'Analytics Pro' },
    description: { bg: 'Разширени анализи, отчети и бизнес инсайти', en: 'Advanced analytics, reports and business insights' },
    price: 15,
  },
]

export const VOLUME_TIERS: VolumeTier[] = [
  { id: 'vol_500', label: { bg: '500 разговора/м', en: '500 conv/mo' }, conversations: 500, price: 0 },
  { id: 'vol_1000', label: { bg: '1,000 разговора/м', en: '1,000 conv/mo' }, conversations: 1000, price: 15 },
  { id: 'vol_2500', label: { bg: '2,500 разговора/м', en: '2,500 conv/mo' }, conversations: 2500, price: 36 },
  { id: 'vol_5000', label: { bg: '5,000 разговора/м', en: '5,000 conv/mo' }, conversations: 5000, price: 61 },
  { id: 'vol_unlimited', label: { bg: 'Неограничени', en: 'Unlimited' }, conversations: null, price: 102 },
]

export const VOICE_TIERS: VoiceTier[] = [
  { id: 'voice_0', label: { bg: 'Без минути', en: 'No minutes' }, minutes: 0, price: 0 },
  { id: 'voice_100', label: { bg: '100 мин/м', en: '100 min/mo' }, minutes: 100, price: 13 },
  { id: 'voice_500', label: { bg: '500 мин/м', en: '500 min/mo' }, minutes: 500, price: 41 },
  { id: 'voice_1000', label: { bg: '1,000 мин/м', en: '1,000 min/mo' }, minutes: 1000, price: 72 },
  { id: 'voice_unlimited', label: { bg: 'Неограничени', en: 'Unlimited' }, minutes: null, price: 128 },
]

// ─── Calculation ─────────────────────────────────────────────────────────────

export function calculateTotal(config: PlatformConfig): PricingResult {
  const breakdown: PricingBreakdown[] = []

  // Base platform
  breakdown.push({
    label: { bg: 'Платформа Neo', en: 'Neo Platform' },
    amount: BASE_PLATFORM_PRICE,
  })

  // Channels
  const channelTotal = config.channels.reduce((sum, chId) => {
    const ch = CHANNELS.find((c) => c.id === chId)
    return sum + (ch?.price ?? 0)
  }, 0)
  if (channelTotal > 0) {
    breakdown.push({
      label: { bg: `Канали (${config.channels.length})`, en: `Channels (${config.channels.length})` },
      amount: channelTotal,
    })
  }

  // Modules
  const moduleTotal = config.modules.reduce((sum, modId) => {
    const mod = MODULES.find((m) => m.id === modId)
    return sum + (mod?.price ?? 0)
  }, 0)
  if (moduleTotal > 0) {
    breakdown.push({
      label: { bg: `Модули (${config.modules.length})`, en: `Modules (${config.modules.length})` },
      amount: moduleTotal,
    })
  }

  // Volume tier
  const volTier = VOLUME_TIERS.find((v) => v.id === config.conversationTier)
  if (volTier && volTier.price > 0) {
    breakdown.push({
      label: volTier.label,
      amount: volTier.price,
    })
  }

  // Voice tier
  const voiceTier = VOICE_TIERS.find((v) => v.id === config.voiceTier)
  if (voiceTier && voiceTier.price > 0) {
    breakdown.push({
      label: voiceTier.label,
      amount: voiceTier.price,
    })
  }

  // Extra locations (first included, +25 EUR per additional)
  if (config.locations > 1) {
    const extra = (config.locations - 1) * 25
    breakdown.push({
      label: { bg: `Допълнителни локации (${config.locations - 1})`, en: `Extra locations (${config.locations - 1})` },
      amount: extra,
    })
  }

  // Extra operators (first 2 included, +10 EUR per additional)
  if (config.operators > 2) {
    const extra = (config.operators - 2) * 10
    breakdown.push({
      label: { bg: `Допълнителни оператори (${config.operators - 2})`, en: `Extra operators (${config.operators - 2})` },
      amount: extra,
    })
  }

  const monthly = breakdown.reduce((sum, b) => sum + b.amount, 0)

  // Setup fee: 15% of monthly, minimum 100 EUR
  const setupFee = Math.max(100, Math.round(monthly * 0.15))

  // Savings vs employee: avg salary in Bulgaria ~1,280 EUR
  const savingsVsEmployee = 1280 - monthly

  return { monthly, setupFee, breakdown, savingsVsEmployee }
}
