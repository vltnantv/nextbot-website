"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import { StatCard } from "@/components/admin/StatCard";
import type { Lead, Activity } from "@/lib/admin-types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);

  useEffect(() => {
    setLeads(adminStore.getLeads());
    setActivity(adminStore.getActivity(8));
    setAnalytics(adminStore.getAnalytics(7));
  }, []);

  // Calculate stats
  const totalLeads = leads.length;
  const newLeadsThisWeek = leads.filter(
    (l) =>
      new Date(l.createdAt) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;
  const activePilots = adminStore.getPilots().filter((p) => p.status === "active")
    .length;
  const totalMRR = leads
    .filter((l) => l.status === "client")
    .reduce((sum, l) => sum + l.monthlyValue, 0);
  const conversionRate = totalLeads > 0
    ? Math.round(
        (leads.filter((l) => l.status === "client").length / totalLeads) * 100,
      )
    : 0;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={fadeIn}>
          <StatCard
            icon="💰"
            value={`${totalMRR.toLocaleString("bg-BG")} лв`}
            label="Месечни приходи (MRR)"
            trend="+23%"
            trendUp={true}
            sparklineData={analytics.map((a) => a.revenue)}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            icon="👥"
            value={totalLeads}
            label="Общо Leads"
            trend={`+${newLeadsThisWeek} тази седмица`}
            trendUp={true}
            sparklineData={analytics.map((a) => a.leads)}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            icon="🚀"
            value={activePilots}
            label="Активни пилоти"
            trend="1 нов"
            trendUp={true}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            icon="📊"
            value={`${conversionRate}%`}
            label="Конверсия"
            trend="+4%"
            trendUp={true}
          />
        </motion.div>
      </motion.div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed - Left 2/3 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white rounded-xl border border-[#E5E5EA] p-6"
        >
          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-4">
            Последна активност
          </h2>

          <div className="space-y-3">
            {activity.map((item, index) => {
              const relativeTime = getRelativeTime(item.timestamp);
              const typeColors = {
                lead: "bg-[#0071E3]",
                pilot: "bg-[#34C759]",
                booking: "bg-[#FF9500]",
                system: "bg-[#6E6E73]",
              };

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                  onClick={() => {
                    if (item.type === "lead") router.push("/admin/dashboard/leads");
                    if (item.type === "pilot") router.push("/admin/dashboard/pilots");
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 ${typeColors[item.type]}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#1D1D1F]">{item.message}</p>
                    <p className="text-[11px] text-[#6E6E73] mt-0.5">
                      {relativeTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions - Right 1/3 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-[#E5E5EA] p-6"
        >
          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-4">
            Бързи действия
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon="➕"
              label="Нов Lead"
              onClick={() => router.push("/admin/dashboard/leads")}
            />
            <QuickActionButton
              icon="🚀"
              label="Нов Пилот"
              onClick={() => router.push("/admin/dashboard/pilots")}
            />
            <QuickActionButton
              icon="📧"
              label="Отчет"
              onClick={() => {
                adminStore.exportToCSV(leads, `leads_${new Date().toISOString().split("T")[0]}`);
              }}
            />
            <QuickActionButton
              icon="💬"
              label="Отвори бот"
              onClick={() => window.open("https://nextbot.me", "_blank")}
            />
            <QuickActionButton
              icon="📊"
              label="Анализи"
              onClick={() => router.push("/admin/dashboard/analytics")}
            />
            <QuickActionButton
              icon="⚙️"
              label="Настройки"
              onClick={() => router.push("/admin/dashboard/settings")}
            />
          </div>
        </motion.div>
      </div>

      {/* Sales Pipeline */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl border border-[#E5E5EA] p-6"
      >
        <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-6">
          Sales Pipeline
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {["new", "contacted", "demo", "pilot", "client"].map((status) => {
            const statusLeads = leads.filter((l) => l.status === status);
            const statusLabels: Record<string, string> = {
              new: "Нови",
              contacted: "Контакт",
              demo: "Демо",
              pilot: "Пилот",
              client: "Клиент",
            };
            const statusColors: Record<string, string> = {
              new: "border-[#6E6E73]",
              contacted: "border-[#0071E3]",
              demo: "border-[#FF9500]",
              pilot: "border-[#06B6D4]",
              client: "border-[#34C759]",
            };

            return (
              <div
                key={status}
                className={`flex-shrink-0 w-64 border-t-4 ${statusColors[status]} bg-[#F5F5F7] rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-semibold text-[#1D1D1F]">
                    {statusLabels[status]}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#6E6E73]">
                    {statusLeads.length}
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {statusLeads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => router.push("/admin/dashboard/leads")}
                    >
                      <p className="text-[13px] font-medium text-[#1D1D1F] mb-1">
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-[#6E6E73] truncate">
                        {lead.company}
                      </p>
                      <p className="text-[11px] text-[#0071E3] font-semibold mt-1">
                        {lead.monthlyValue} лв/мес
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function QuickActionButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-[#E5E5EA] bg-white hover:bg-[#F5F5F7] hover:border-[#06B6D4] transition-all active:scale-[0.97]"
    >
      <span className="text-[24px]">{icon}</span>
      <span className="text-[11px] font-medium text-[#1D1D1F] text-center">
        {label}
      </span>
    </button>
  );
}

function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "току-що";
  if (minutes < 60) return `преди ${minutes} мин`;
  if (hours < 24) return `преди ${hours} ${hours === 1 ? "час" : "часа"}`;
  if (days < 7) return `преди ${days} ${days === 1 ? "ден" : "дни"}`;
  return time.toLocaleDateString("bg-BG");
}
