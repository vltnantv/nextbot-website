// ═══════════════════════════════════════════════════════════
// Nextbot Neo - Product Constants
// ═══════════════════════════════════════════════════════════

export const NEO_PRODUCT = {
  name: "Nextbot Neo",
  tagline: "Един чатбот. Безкрайни възможности.",
  description:
    "AI асистент за твоя бизнес. Отговаря на клиентите 24/7 навсякъде. Разширяем с добавки.",
  basePrice: 199,

  baseFeatures: [
    "AI чат на твоя сайт (24/7)",
    "Отговаря на въпроси автоматично",
    "Български + Английски",
    "Събира контакти (Име, Тел, Email)",
    "Месечен performance отчет",
    "Email поддръжка",
  ],

  packages: [
    {
      id: "starter",
      name: "Neo Starter",
      price: 199,
      color: "#06B6D4",
      description: "За малкия бизнес",
      features: [
        "Base чатбот (сайт)",
        "Български + Английски",
        "Lead capture",
        "Месечен отчет",
        "Email поддръжка",
      ],
      addons: "à la carte",
    },
    {
      id: "business",
      name: "Neo Business",
      price: 449,
      color: "#6366F1",
      highlighted: true,
      description: "За растящия бизнес",
      features: [
        "Всичко в Starter",
        "WhatsApp Business",
        "Facebook Messenger",
        "Email автоматизация",
        "CRM интеграция",
        "Booking система",
        "Advanced analytics",
      ],
      addons: "à la carte",
    },
    {
      id: "pro",
      name: "Neo Pro",
      price: 799,
      color: "#F59E0B",
      description: "За сериозния бизнес",
      features: [
        "Всичко в Business",
        "Voice AI",
        "Custom AI training",
        "White-label",
        "Всички езици",
        "Dedicated support",
        "Без лимити",
      ],
      addons: "Всичко включено",
    },
  ],

  addonCategories: [
    {
      id: "social",
      name: "Социални мрежи",
      icon: "📱",
      color: "#EC4899",
      addons: [
        { id: "whatsapp", name: "WhatsApp Business", price: 79, popular: true },
        { id: "facebook", name: "Facebook Messenger", price: 49 },
        { id: "instagram", name: "Instagram DM", price: 49 },
        { id: "telegram", name: "Telegram", price: 39 },
      ],
      bundlePrice: 179,
      bundleName: "Social Pack",
    },
    {
      id: "email",
      name: "Email автоматизация",
      icon: "📧",
      color: "#F59E0B",
      addons: [
        { id: "email_responder", name: "Email responder", price: 89, popular: true },
        { id: "email_sequences", name: "Email sequences", price: 69 },
        { id: "newsletter", name: "Newsletter AI", price: 59 },
        { id: "lead_capture", name: "Email lead capture", price: 39 },
      ],
      bundlePrice: 199,
      bundleName: "Email Pack",
    },
    {
      id: "sales",
      name: "CRM & Продажби",
      icon: "💰",
      color: "#10B981",
      addons: [
        { id: "crm", name: "CRM интеграция", price: 99, popular: true },
        { id: "lead_qual", name: "Lead qualification", price: 79 },
        { id: "demo_booking", name: "Demo booking", price: 59 },
        { id: "followup", name: "Follow-up sequences", price: 69 },
      ],
      bundlePrice: 249,
      bundleName: "Sales Pack",
    },
    {
      id: "ops",
      name: "Операции",
      icon: "⚙️",
      color: "#6366F1",
      addons: [
        { id: "booking", name: "Booking система", price: 89 },
        { id: "invoices", name: "Фактури (basic)", price: 69 },
        { id: "internal", name: "Вътрешен бот", price: 79 },
        { id: "appointments", name: "Appointments", price: 59 },
      ],
      bundlePrice: 249,
      bundleName: "Ops Pack",
    },
    {
      id: "languages",
      name: "Езици",
      icon: "🌍",
      color: "#0EA5E9",
      addons: [
        { id: "german", name: "Немски", price: 49 },
        { id: "russian", name: "Руски", price: 49 },
        { id: "romanian", name: "Румънски", price: 49 },
        { id: "greek", name: "Гръцки", price: 49 },
        { id: "all_lang", name: "Всички езици", price: 149, popular: true },
      ],
    },
    {
      id: "intelligence",
      name: "Analytics",
      icon: "📊",
      color: "#8B5CF6",
      addons: [
        { id: "analytics", name: "Advanced analytics", price: 79 },
        { id: "sentiment", name: "Sentiment analysis", price: 59 },
        { id: "weekly_report", name: "Weekly AI report", price: 39 },
        { id: "competitor", name: "Competitor mentions", price: 49 },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      icon: "⚡",
      color: "#F59E0B",
      addons: [
        { id: "voice", name: "Voice AI", price: 129, popular: true },
        { id: "video", name: "Video responses", price: 99 },
        { id: "training", name: "Custom AI training", price: 149 },
        { id: "whitelabel", name: "White-label", price: 199 },
      ],
    },
  ],
} as const;

export const NEO_USE_CASES = [
  {
    id: "hotel",
    name: "Хотел 40 стаи",
    icon: "🏨",
    addons: ["Base", "WhatsApp", "Booking", "Немски"],
    price: 426,
    result: "0 пропуснати резервации",
    description: "Автоматични резервации през WhatsApp 24/7",
  },
  {
    id: "ecommerce",
    name: "Онлайн магазин",
    icon: "🛒",
    addons: ["Base", "WhatsApp", "Facebook", "CRM"],
    price: 376,
    result: "70% по-малко support tickets",
    description: "Клиентска поддръжка и проследяване на поръчки",
  },
  {
    id: "restaurant",
    name: "Ресторант",
    icon: "🍽️",
    addons: ["Base", "WhatsApp", "Booking"],
    price: 367,
    result: "Резервации 24/7 без телефон",
    description: "Автоматични резервации и меню информация",
  },
  {
    id: "law",
    name: "Адвокатска кантора",
    icon: "⚖️",
    addons: ["Base", "Email", "CRM", "Appointments"],
    price: 465,
    result: "3x повече qualified клиенти",
    description: "Lead qualification и автоматично записване",
  },
  {
    id: "fitness",
    name: "Фитнес",
    icon: "💪",
    addons: ["Base", "WhatsApp", "Appointments"],
    price: 337,
    result: "Записвания без рецепционист",
    description: "Класове, членства, тренировъчни планове",
  },
] as const;

// Navigation
export const NEO_NAV_LINKS = [
  { label: "Neo", href: "/" },
  { label: "Добавки", href: "/#addons" },
  { label: "Пакети", href: "/#packages" },
  { label: "Цени", href: "/#builder" },
  { label: "Пилот", href: "/pilot" },
] as const;

// Company info
export const NEO_COMPANY = {
  name: "Nextbot EOOD",
  email: "info@nextbot.me",
  phone: "+359 894 288 119",
  url: "https://nextbot.me",
} as const;
