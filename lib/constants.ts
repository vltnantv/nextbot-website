import type { NavLink, Feature, Stat } from "@/types";

// ---------------------------------------------------------------------------
// Company
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: "NextBot",
  tagline: "AI Automation Excellence",
  description:
    "Nextbot delivers enterprise-grade AI automation — from hotel bookings to e-commerce support and call-center quality assurance.",
  url: "https://nextbot.me",
  email: "info@nextbot.me",
  phone: "+359 894 288 119",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Продукти", href: "#products" },
  { label: "Пилот", href: "#pilot" },
  { label: "Цени", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакти", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Features (3 core products)
// ---------------------------------------------------------------------------

export const FEATURES: Feature[] = [
  {
    icon: "hotel",
    title: "Хотелиерство",
    description:
      "24/7 AI асистент за резервации. Многоезична поддръжка. Автоматични потвърждения и follow-up. Никога не пропускайте резервация.",
    href: "#products",
  },
  {
    icon: "shopping-cart",
    title: "Е-търговия",
    description:
      "Интелигентна поддръжка на клиенти. Проследяване на поръчки. Персонализирани препоръки за продукти. 60% намаление в support tickets.",
    href: "#products",
  },
  {
    icon: "headphones",
    title: "Кол Центрове",
    description:
      "Автоматизация на QA процеса. 100% coverage на разговори. Real-time agent assist и sentiment analysis за всяко обаждане.",
    href: "#products",
  },
];

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const STATS: Stat[] = [
  {
    value: "22h",
    label: "Hours Saved Weekly",
    description: "Average time saved per team member each week",
  },
  {
    value: "0%",
    label: "Missed Bookings",
    description: "Zero missed bookings with 24/7 AI coverage",
  },
  {
    value: "94%",
    label: "Satisfaction Rate",
    description: "Customer satisfaction across all automated interactions",
  },
];

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export const PRICING = {
  setup: 2850,
  monthly: 750,
  currency: "лв",
  guarantee: "30 дни",
} as const;

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/nextbot",
  email: `mailto:${SITE_CONFIG.email}`,
} as const;

/** Alias for SITE_CONFIG — convenient shorthand used across components. */
export const COMPANY_INFO = SITE_CONFIG;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: "Представяме Nextbot Concierge",
  headline: "Вашият бизнес.\nВинаги достъпен.",
  subheadline:
    "AI автоматизация, която работи денонощно — приема резервации, отговаря на клиенти и контролира качеството. Без почивни дни, без пропуснати възможности.",
  ctaPrimary: "Тествай Demo",
  ctaSecondary: "Виж как работи",
} as const;

export const HERO_STATS = [
  { value: "22h", label: "седмично спестени" },
  { value: "0%", label: "пропуснати възможности" },
  { value: "94%", label: "удовлетвореност" },
] as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FOOTER_PRODUCTS = [
  { label: "Concierge (хотели)", href: "#products" },
  { label: "Commerce (е-търговия)", href: "#products" },
  { label: "Sentinel (кол центрове)", href: "#products" },
] as const;

export const FOOTER_COMPANY = [
  { label: "За нас", href: "#company" },
  { label: "Блог", href: "#" },
  { label: "Кариери", href: "#" },
  { label: "Контакти", href: "#" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Политика за поверителност", href: "#" },
  { label: "Общи условия", href: "#" },
] as const;

export const CONTACT_INFO = {
  email: SITE_CONFIG.email,
  phone: SITE_CONFIG.phone,
  address: "София, България",
} as const;

/** Navigation links used in the header (excludes "Demo" CTA). */
export const NAVIGATION_LINKS = NAV_LINKS.filter(
  (link) => link.label !== "Demo",
);
