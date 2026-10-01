// All prices in ONE place (BRAND.md „Цени“). EUR, without VAT. Pages read from here - never hard-code a price.

export type Plan = {
  id: 'start' | 'growth' | 'pro'
  name: string
  monthly: number
  /** "from" price (Про) */
  from?: boolean
  setup: number | null // null = по договаряне
  features: string[]
  popular?: boolean
}

export const PLANS: Plan[] = [
  { id: 'start', name: 'Старт', monthly: 99, setup: 390, features: ['NEO в сайта + 1 канал', 'CORE за до 2 души', 'Месечен отчет'] },
  {
    id: 'growth',
    name: 'Растеж',
    monthly: 199,
    setup: 690,
    popular: true,
    features: ['NEO във всички канали', 'CORE за до 10 души', 'ECHO: напомняния и отзиви', 'Седмичен отчет'],
  },
  {
    id: 'pro',
    name: 'Про',
    monthly: 399,
    from: true,
    setup: null,
    features: ['Всичко от Растеж', 'ARIA, гласов асистент', 'Връзки с вашите програми', 'Няколко обекта'],
  },
]

export const STUDIO_FROM = 1500 // € per project

export type WebOffer = { name: string; from: number | null; monthly?: number; includes: string }

export const WEB_OFFERS: WebOffer[] = [
  { name: 'Визитка', from: 490, includes: '1 страница, контакти, карта, форма, мобилна версия, до 7 дни' },
  { name: 'Бизнес сайт', from: 990, includes: 'До 6 страници, услуги, цени, галерия, основно SEO, до 14 дни' },
  { name: 'Онлайн магазин', from: 1900, includes: 'Продукти, количка, плащане и доставка, до 30 дни' },
  { name: 'Поддръжка', from: null, monthly: 29, includes: 'Хостинг, сигурност, резервни копия, до 1 час промени месечно' },
]

export const WEB_RULES = {
  neoTrialMonths: 1, // every site comes with NEO free for 1 month
  growthDiscountPercent: 30, // business site with the Growth plan
}

export const GUARANTEE_DAYS = 14
export const SETUP_DAYS = 7

/**
 * Pilot programme: first 10 businesses get the setup at half price for an honest review.
 * Set the REAL number of free spots by hand. null hides the counter (BRAND.md: never a made-up number).
 */
export const PILOT = { total: 10, spotsLeft: null as number | null }

/** 1900 -> "1 900 €" with non-breaking spaces (bg-BG locale leaves 4-digit numbers ungrouped). */
export const eur = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}\u00A0€`
