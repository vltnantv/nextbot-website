// ═══════════════════════════════════════════════════════════
// Admin Panel Data Store (localStorage)
// ═══════════════════════════════════════════════════════════

import type {
  Lead,
  PilotApplication,
  AddOn,
  BotSetting,
  AnalyticsData,
  Activity,
} from "./admin-types";

const STORAGE_KEYS = {
  LEADS: "nextbot_admin_leads",
  PILOTS: "nextbot_admin_pilots",
  ADDONS: "nextbot_admin_addons",
  SETTINGS: "nextbot_admin_settings",
  ANALYTICS: "nextbot_admin_analytics",
  ACTIVITY: "nextbot_admin_activity",
  AUTH: "nextbot_admin_auth",
} as const;

// ═══════════════════════════════════════════════════════════
// SEED DATA
// ═══════════════════════════════════════════════════════════

const SEED_LEADS: Lead[] = [
  {
    id: "lead_1",
    name: "Георги Петров",
    email: "georgi@hotelparadise.bg",
    phone: "+359 88 123 4567",
    company: "Hotel Paradise",
    industry: "hotel",
    status: "pilot",
    score: 87,
    notes: "Много активен клиент. Има 45 стаи в Банско. Интересува се от WhatsApp интеграция.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    source: "website",
    assignedAddOns: ["addon_1", "addon_3"],
    monthlyValue: 526,
  },
  {
    id: "lead_2",
    name: "Мария Иванова",
    email: "maria@grandbansko.bg",
    phone: "+359 88 234 5678",
    company: "Grand Hotel Bansko",
    industry: "hotel",
    status: "demo",
    score: 72,
    notes: "Schedulнато demo за следващата седмица. Интерес към немски език.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: "linkedin",
    assignedAddOns: ["addon_3"],
    monthlyValue: 378,
  },
  {
    id: "lead_3",
    name: "Стефан Димитров",
    email: "stefan@shopbg.com",
    phone: "+359 88 345 6789",
    company: "ShopBG EOOD",
    industry: "ecommerce",
    status: "new",
    score: 45,
    notes: "Нов lead от формата на сайта. Все още не е отговорил на email.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    source: "website",
    assignedAddOns: [],
    monthlyValue: 447,
  },
  {
    id: "lead_4",
    name: "Елена Николова",
    email: "elena@morski-rai.bg",
    phone: "+359 88 456 7890",
    company: "Морски рай",
    industry: "hotel",
    status: "contacted",
    score: 61,
    notes: "Разговаряхме по телефона. Иска оферта за WhatsApp + Facebook.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: "phone",
    assignedAddOns: ["addon_1", "addon_2"],
    monthlyValue: 299,
  },
  {
    id: "lead_5",
    name: "Иван Стоянов",
    email: "ivan@blacksea.bg",
    phone: "+359 88 567 8901",
    company: "Black Sea Resort",
    industry: "hotel",
    status: "client",
    score: 94,
    notes: "Платещ клиент от 2 месеца. Много доволен. Referral source за нови клиенти.",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: "referral",
    assignedAddOns: ["addon_1", "addon_3", "addon_4", "addon_6"],
    monthlyValue: 799,
  },
];

const SEED_PILOTS: PilotApplication[] = [
  {
    id: "pilot_1",
    hotelName: "Hotel Paradise",
    contactName: "Георги Петров",
    email: "georgi@hotelparadise.bg",
    phone: "+359 88 123 4567",
    rooms: 45,
    city: "Банско",
    website: "https://hotelparadise.bg",
    status: "active",
    appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Отличен пилот. Генерира 15+ резервации седмично.",
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "pilot_2",
    hotelName: "Grand Hotel Bansko",
    contactName: "Мария Иванова",
    email: "maria@grandbansko.bg",
    phone: "+359 88 234 5678",
    rooms: 62,
    city: "Банско",
    website: "https://grandbansko.bg",
    status: "pending",
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Чака одобрение. Голям хотел с потенциал.",
  },
  {
    id: "pilot_3",
    hotelName: "Морски рай",
    contactName: "Елена Николова",
    email: "elena@morski-rai.bg",
    phone: "+359 88 456 7890",
    rooms: 28,
    city: "Несебър",
    website: "https://morski-rai.bg",
    status: "approved",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Одобрен. Планиран старт следващата седмица.",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const SEED_ADDONS: AddOn[] = [
  {
    id: "addon_1",
    icon: "💬",
    title: "WhatsApp Business",
    description:
      "Интеграция с WhatsApp Business API. Автоматични отговори и резервации през WhatsApp.",
    price: 79,
    popular: true,
    active: true,
    category: "channel",
  },
  {
    id: "addon_2",
    icon: "📱",
    title: "Facebook & Instagram",
    description:
      "Messenger и Instagram DM интеграция. Отговори на съобщения в социалните мрежи.",
    price: 49,
    popular: false,
    active: true,
    category: "channel",
  },
  {
    id: "addon_3",
    icon: "🌍",
    title: "Немски или Руски",
    description:
      "Допълнителен език за вашия бот. Немски ИЛИ руски на избор.",
    price: 49,
    popular: false,
    active: true,
    category: "language",
  },
  {
    id: "addon_4",
    icon: "🔗",
    title: "Системна интеграция",
    description:
      "API интеграция с вашата booking система или CRM. Директен sync на данни.",
    price: 99,
    popular: true,
    active: true,
    category: "integration",
  },
  {
    id: "addon_5",
    icon: "♾️",
    title: "Unlimited разговори",
    description:
      "Премахваме лимита от 1000 разговора/месец. Неограничен брой чат сесии.",
    price: 99,
    popular: false,
    active: true,
    category: "support",
  },
  {
    id: "addon_6",
    icon: "⚡",
    title: "Приоритетна поддръжка",
    description:
      "Dedicated Slack канал, отговор до 1 час, видео обучения, месечни консултации.",
    price: 149,
    popular: false,
    active: true,
    category: "support",
  },
];

const SEED_SETTINGS: BotSetting[] = [
  {
    id: "setting_1",
    key: "voiceflow_project_id",
    value: "6989fab0edb54740de5b4ea5",
    description: "Voiceflow Project ID",
    category: "voiceflow",
  },
  {
    id: "setting_2",
    key: "voiceflow_version",
    value: "production",
    description: "Voiceflow Version ID",
    category: "voiceflow",
  },
  {
    id: "setting_3",
    key: "bot_name",
    value: "Нео",
    description: "Име на бота",
    category: "general",
  },
  {
    id: "setting_4",
    key: "welcome_message",
    value: "Здравейте! Как мога да Ви помогна?",
    description: "Съобщение за добре дошли",
    category: "general",
  },
  {
    id: "setting_5",
    key: "company_name",
    value: "Nextbot EOOD",
    description: "Име на компанията",
    category: "general",
  },
  {
    id: "setting_6",
    key: "contact_email",
    value: "info@nextbot.me",
    description: "Контактен email",
    category: "general",
  },
  {
    id: "setting_7",
    key: "contact_phone",
    value: "+359 88 123 4567",
    description: "Контактен телефон",
    category: "general",
  },
  {
    id: "setting_8",
    key: "site_url",
    value: "https://nextbot.me",
    description: "URL на сайта",
    category: "general",
  },
  {
    id: "setting_9",
    key: "pilot_total_spots",
    value: "10",
    description: "Общо места за пилоти",
    category: "general",
  },
  {
    id: "setting_10",
    key: "notifications_new_lead",
    value: "true",
    description: "Известия за нови leads",
    category: "notifications",
  },
  {
    id: "setting_11",
    key: "notifications_new_pilot",
    value: "true",
    description: "Известия за нови пилотни кандидати",
    category: "notifications",
  },
  {
    id: "setting_12",
    key: "notifications_weekly_report",
    value: "true",
    description: "Седмичен email отчет",
    category: "notifications",
  },
];

const SEED_ANALYTICS: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    conversations: Math.floor(Math.random() * 50) + 20,
    bookings: Math.floor(Math.random() * 10) + 5,
    leads: Math.floor(Math.random() * 3) + 1,
    revenue: Math.floor(Math.random() * 500) + 200,
  };
});

const SEED_ACTIVITY: Activity[] = [
  {
    id: "activity_1",
    type: "lead",
    message: "Нов lead: Георги Петров от Hotel Paradise",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_2",
    type: "pilot",
    message: "Одобрен пилот: Морски рай (Несебър)",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_3",
    type: "booking",
    message: "Нова резервация: Hotel Paradise - 3 нощувки",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_4",
    type: "lead",
    message: "Lead status update: Мария Иванова → Demo",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_5",
    type: "system",
    message: "Weekly report sent to info@nextbot.me",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_6",
    type: "pilot",
    message: "Нова пилотна кандидатура: Grand Hotel Bansko",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_7",
    type: "lead",
    message: "Нов lead: Елена Николова от Морски рай",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "activity_8",
    type: "booking",
    message: "Нова резервация: Black Sea Resort - 5 нощувки",
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
  },
];

// ═══════════════════════════════════════════════════════════
// ADMIN STORE CLASS
// ═══════════════════════════════════════════════════════════

class AdminStore {
  // Initialize store with seed data on first load
  initialize(): void {
    if (typeof window === "undefined") return;

    try {
      // Check if already initialized
      const hasData = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (!hasData) {
        // First time - seed the data
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(SEED_LEADS));
        localStorage.setItem(
          STORAGE_KEYS.PILOTS,
          JSON.stringify(SEED_PILOTS),
        );
        localStorage.setItem(
          STORAGE_KEYS.ADDONS,
          JSON.stringify(SEED_ADDONS),
        );
        localStorage.setItem(
          STORAGE_KEYS.SETTINGS,
          JSON.stringify(SEED_SETTINGS),
        );
        localStorage.setItem(
          STORAGE_KEYS.ANALYTICS,
          JSON.stringify(SEED_ANALYTICS),
        );
        localStorage.setItem(
          STORAGE_KEYS.ACTIVITY,
          JSON.stringify(SEED_ACTIVITY),
        );
      }
    } catch (error) {
      console.error("Failed to initialize admin store:", error);
    }
  }

  // ─────────────────────────────────────────────────────────
  // LEADS
  // ─────────────────────────────────────────────────────────

  getLeads(): Lead[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get leads:", error);
      return [];
    }
  }

  saveLead(lead: Lead): void {
    if (typeof window === "undefined") return;
    try {
      const leads = this.getLeads();
      const existingIndex = leads.findIndex((l) => l.id === lead.id);

      if (existingIndex >= 0) {
        leads[existingIndex] = { ...lead, updatedAt: new Date().toISOString() };
      } else {
        leads.push({
          ...lead,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

      // Add activity
      this.addActivity({
        id: this.generateId(),
        type: "lead",
        message: existingIndex >= 0
          ? `Lead updated: ${lead.name}`
          : `Нов lead: ${lead.name} от ${lead.company}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to save lead:", error);
      throw error;
    }
  }

  deleteLead(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const leads = this.getLeads();
      const filtered = leads.filter((l) => l.id !== id);
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete lead:", error);
      throw error;
    }
  }

  updateLeadStatus(id: string, status: Lead["status"]): void {
    if (typeof window === "undefined") return;
    try {
      const leads = this.getLeads();
      const lead = leads.find((l) => l.id === id);
      if (lead) {
        lead.status = status;
        lead.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

        // Add activity
        this.addActivity({
          id: this.generateId(),
          type: "lead",
          message: `Lead status update: ${lead.name} → ${status}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to update lead status:", error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────
  // PILOTS
  // ─────────────────────────────────────────────────────────

  getPilots(): PilotApplication[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PILOTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get pilots:", error);
      return [];
    }
  }

  savePilot(pilot: PilotApplication): void {
    if (typeof window === "undefined") return;
    try {
      const pilots = this.getPilots();
      const existingIndex = pilots.findIndex((p) => p.id === pilot.id);

      if (existingIndex >= 0) {
        pilots[existingIndex] = pilot;
      } else {
        pilots.push({ ...pilot, appliedAt: new Date().toISOString() });
      }

      localStorage.setItem(STORAGE_KEYS.PILOTS, JSON.stringify(pilots));

      // Add activity
      this.addActivity({
        id: this.generateId(),
        type: "pilot",
        message: existingIndex >= 0
          ? `Pilot updated: ${pilot.hotelName}`
          : `Нова пилотна кандидатура: ${pilot.hotelName}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to save pilot:", error);
      throw error;
    }
  }

  deletePilot(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const pilots = this.getPilots();
      const filtered = pilots.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PILOTS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete pilot:", error);
      throw error;
    }
  }

  updatePilotStatus(
    id: string,
    status: PilotApplication["status"],
  ): void {
    if (typeof window === "undefined") return;
    try {
      const pilots = this.getPilots();
      const pilot = pilots.find((p) => p.id === id);
      if (pilot) {
        pilot.status = status;
        localStorage.setItem(STORAGE_KEYS.PILOTS, JSON.stringify(pilots));

        // Add activity
        this.addActivity({
          id: this.generateId(),
          type: "pilot",
          message: `Pilot status: ${pilot.hotelName} → ${status}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to update pilot status:", error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────
  // ADD-ONS
  // ─────────────────────────────────────────────────────────

  getAddOns(): AddOn[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADDONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get add-ons:", error);
      return [];
    }
  }

  saveAddOn(addOn: AddOn): void {
    if (typeof window === "undefined") return;
    try {
      const addOns = this.getAddOns();
      const existingIndex = addOns.findIndex((a) => a.id === addOn.id);

      if (existingIndex >= 0) {
        addOns[existingIndex] = addOn;
      } else {
        addOns.push(addOn);
      }

      localStorage.setItem(STORAGE_KEYS.ADDONS, JSON.stringify(addOns));
    } catch (error) {
      console.error("Failed to save add-on:", error);
      throw error;
    }
  }

  deleteAddOn(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const addOns = this.getAddOns();
      const filtered = addOns.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEYS.ADDONS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete add-on:", error);
      throw error;
    }
  }

  updateAddOnsOrder(addOns: AddOn[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.ADDONS, JSON.stringify(addOns));
    } catch (error) {
      console.error("Failed to update add-ons order:", error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────
  // SETTINGS
  // ─────────────────────────────────────────────────────────

  getSettings(): BotSetting[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get settings:", error);
      return [];
    }
  }

  getSetting(key: string): string | null {
    const settings = this.getSettings();
    const setting = settings.find((s) => s.key === key);
    return setting?.value || null;
  }

  updateSetting(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      const settings = this.getSettings();
      const setting = settings.find((s) => s.key === key);

      if (setting) {
        setting.value = value;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      }
    } catch (error) {
      console.error("Failed to update setting:", error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────
  // ANALYTICS
  // ─────────────────────────────────────────────────────────

  getAnalytics(days: number = 30): AnalyticsData[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      const all: AnalyticsData[] = data ? JSON.parse(data) : [];
      return all.slice(-days);
    } catch (error) {
      console.error("Failed to get analytics:", error);
      return [];
    }
  }

  // ─────────────────────────────────────────────────────────
  // ACTIVITY
  // ─────────────────────────────────────────────────────────

  getActivity(limit: number = 20): Activity[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      const all: Activity[] = data ? JSON.parse(data) : [];
      return all.slice(-limit).reverse();
    } catch (error) {
      console.error("Failed to get activity:", error);
      return [];
    }
  }

  addActivity(activity: Activity): void {
    if (typeof window === "undefined") return;
    try {
      const activities = this.getActivity(100);
      activities.unshift(activity);
      localStorage.setItem(
        STORAGE_KEYS.ACTIVITY,
        JSON.stringify(activities.slice(0, 100)),
      );
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  }

  // ─────────────────────────────────────────────────────────
  // AUTH
  // ─────────────────────────────────────────────────────────

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEYS.AUTH) === "authenticated";
  }

  login(email: string, password: string): boolean {
    // Hardcoded credentials
    if (email === "admin@nextbot.me" && password === "Nextbot2025!") {
      localStorage.setItem(STORAGE_KEYS.AUTH, "authenticated");
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  // ─────────────────────────────────────────────────────────
  // UTILS
  // ─────────────────────────────────────────────────────────

  generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  exportToCSV(data: any[], filename: string): void {
    if (typeof window === "undefined") return;

    try {
      if (data.length === 0) {
        throw new Error("No data to export");
      }

      // Get headers from first object
      const headers = Object.keys(data[0]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header];
              // Escape quotes and wrap in quotes if contains comma
              const stringValue = String(value || "");
              return stringValue.includes(",")
                ? `"${stringValue.replace(/"/g, '""')}"`
                : stringValue;
            })
            .join(","),
        ),
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }

  clearAllData(): void {
    if (typeof window === "undefined") return;
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (key !== STORAGE_KEYS.AUTH) {
        localStorage.removeItem(key);
      }
    });
    // Re-initialize with seed data
    this.initialize();
  }
}

// Export singleton instance
export const adminStore = new AdminStore();
