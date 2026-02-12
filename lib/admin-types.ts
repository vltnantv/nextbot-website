// ═══════════════════════════════════════════════════════════
// Admin Panel TypeScript Types
// ═══════════════════════════════════════════════════════════

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: "hotel" | "ecommerce" | "callcenter" | "other";
  status: "new" | "contacted" | "demo" | "pilot" | "client" | "lost";
  score: number; // 0-100
  notes: string;
  createdAt: string; // ISO date
  updatedAt: string;
  source: "website" | "phone" | "referral" | "email" | "linkedin";
  assignedAddOns: string[];
  monthlyValue: number;
}

export interface PilotApplication {
  id: string;
  hotelName: string;
  contactName: string;
  email: string;
  phone: string;
  rooms: number;
  city: string;
  website: string;
  status: "pending" | "approved" | "active" | "completed" | "rejected";
  appliedAt: string;
  notes: string;
  startDate?: string;
  endDate?: string;
}

export interface AddOn {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  popular: boolean;
  active: boolean;
  category: "channel" | "language" | "integration" | "support";
}

export interface BotSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  category: "voiceflow" | "general" | "notifications";
}

export interface AnalyticsData {
  date: string;
  conversations: number;
  bookings: number;
  leads: number;
  revenue: number;
}

export interface Activity {
  id: string;
  type: "lead" | "pilot" | "booking" | "system";
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
