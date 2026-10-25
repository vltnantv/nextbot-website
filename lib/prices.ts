// All prices in ONE place (BRAND.md „Цени“). EUR, without VAT. Pages read from here - never hard-code a price.
//
// 25.10.2026: new model. Products are sold separately (CORE, NEO) or together (CORE + NEO, the usual choice);
// ECHO is an add-on, included in the bundle. Development (sites, systems, apps) is quoted after a call.

export type Plan = {
  id: 'core' | 'bundle' | 'neo'
  name: string
  /** one line: who this plan is for */
  forWhom: string
  monthly: number
  /** EUR per month when paid yearly (ANNUAL_FREE_MONTHS free) */
  yearlyMonthly: number
  setup: number
  /** people included in CORE (null: no CORE in the plan) */
  seats: number | null
  /** setup includes a visit on site */
  onSite?: boolean
  features: string[]
  popular?: boolean
}

export const ANNUAL_FREE_MONTHS = 2
const yearly = (m: number) => Math.round((m * (12 - ANNUAL_FREE_MONTHS)) / 12)

export const PLANS: Plan[] = [
  {
    id: 'core',
    name: 'CORE',
    forWhom: 'Имате екип и искате да виждате кой с кого говори и кой е забравен.',
    monthly: 59,
    yearlyMonthly: yearly(59),
    setup: 190,
    seats: 3,
    onSite: true,
    features: ['Клиенти, обаждания и сделки на едно място', 'Списък „обади се днес“ за всеки продавач', 'Табло на собственика', 'Внасяме старите ви таблици'],
  },
  {
    id: 'bundle',
    name: 'CORE + NEO',
    forWhom: 'Цялата верига: асистентът отговаря, системата помни, екипът знае на кого да звънне.',
    monthly: 129,
    yearlyMonthly: yearly(129),
    setup: 390,
    seats: 10,
    onSite: true,
    popular: true,
    features: ['NEO във всички канали', 'CORE за до 10 души', 'ECHO включен: напомняния и отзиви', 'Седмичен отчет', 'Приоритетна поддръжка по телефон'],
  },
  {
    id: 'neo',
    name: 'NEO',
    forWhom: 'Искате клиентите да получават отговор веднага, а вие – имената и телефоните им.',
    monthly: 79,
    yearlyMonthly: yearly(79),
    setup: 290,
    seats: null,
    features: ['Асистент в сайта + Viber или Messenger', 'Записва име, телефон и въпрос', 'Записва часове и огледи', 'Месечен отчет'],
  },
]

/** ECHO as an add-on to CORE or NEO (included in CORE + NEO). */
export const ECHO_ADDON = 29
/** Each person in CORE above the plan's seats. */
export const CORE_EXTRA_SEAT = 15
/** Про: several sites, voice assistant, links with the client's programs. Quoted after a call. */
export const PRO_FROM = 299

/** Development (sites, shops, systems, apps): quoted after a 15-minute call, written offer within DEV_OFFER_DAYS. */
export const DEV_OFFER_DAYS = 2
/** kept for /studio: the smallest custom job */
export const STUDIO_FROM = 1500 // € per project

export type WebOffer = { name: string; from: number | null; monthly?: number; includes: string; popular?: boolean }

export const WEB_OFFERS: WebOffer[] = [
  { name: 'Визитка', from: 490, includes: '1 страница, контакти, карта, форма, мобилна версия, до 7 дни' },
  { name: 'Бизнес сайт', from: 990, popular: true, includes: 'До 6 страници, услуги, цени, галерия, основно SEO, до 14 дни' },
  { name: 'Онлайн магазин', from: 1900, includes: 'Продукти, количка, плащане и доставка, до 30 дни' },
  { name: 'Поддръжка', from: null, monthly: 29, includes: 'Хостинг, сигурност, резервни копия, до 1 час промени месечно' },
]

export const WEB_RULES = {
  neoTrialMonths: 1, // every site comes with NEO free for 1 month
  growthDiscountPercent: 30, // business site with the CORE + NEO plan
}

export const GUARANTEE_DAYS = 14
export const SETUP_DAYS = 7

/**
 * Pilot programme: first 10 businesses get the setup at half price for an honest review.
 * Set the REAL number of free spots by hand. null hides the counter (BRAND.md: never a made-up number).
 */
export const PILOT = { total: 10, spotsLeft: 10 as number | null } // updated by hand: no pilot clients yet, 10 free spots (04.10.2026)

/** 1900 -> "1 900 €" with non-breaking spaces (bg-BG locale leaves 4-digit numbers ungrouped). */
export const eur = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`
