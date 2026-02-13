"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { adminStore } from "@/lib/admin-store";
import type { AnalyticsData } from "@/lib/admin-types";

type DateRange = 7 | 30 | 90;

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>(30);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

  const loadAnalytics = useCallback(() => {
    setAnalytics(adminStore.getAnalytics(dateRange));
  }, [dateRange]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Calculate KPIs
  const totalConversations = analytics.reduce(
    (sum, a) => sum + a.conversations,
    0,
  );
  const totalLeads = analytics.reduce((sum, a) => sum + a.leads, 0);
  const totalRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0);
  const avgResponseTime = 1.3; // Mock

  // Previous period for trends
  const prevPeriodConversations = Math.floor(totalConversations * 0.85);
  const conversationTrend = Math.round(
    ((totalConversations - prevPeriodConversations) / prevPeriodConversations) *
      100,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1D1D1F]">Анализи</h1>
          <p className="text-[13px] text-[#6E6E73] mt-1">
            Performance статистики и тенденции
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 bg-[#F5F5F7] rounded-lg p-1">
          {([7, 30, 90] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`
                px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                ${
                  dateRange === range
                    ? "bg-white text-[#0071E3] shadow-sm"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }
              `}
            >
              {range}д
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon="💬"
          value={totalConversations.toLocaleString("bg-BG")}
          label="Общо разговори"
          trend={`+${conversationTrend}%`}
          trendUp={true}
        />
        <KPICard
          icon="👥"
          value={totalLeads}
          label="Генерирани leads"
          trend="+5"
          trendUp={true}
        />
        <KPICard
          icon="💰"
          value={`${totalRevenue.toLocaleString("bg-BG")} лв`}
          label="MRR"
          trend="+23%"
          trendUp={true}
        />
        <KPICard
          icon="⚡"
          value={`${avgResponseTime}s`}
          label="Avg Response Time"
          trend="-0.2s"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-[#E5E5EA] p-6">
          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-6">
            Разговори по дни
          </h2>
          <LineChart data={analytics.map((a) => a.conversations)} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-[#E5E5EA] p-6">
          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-6">
            Leads по статус
          </h2>
          <DonutChart
            data={[
              { label: "Нови", value: 5, color: "#6E6E73" },
              { label: "Контакт", value: 3, color: "#0071E3" },
              { label: "Демо", value: 4, color: "#FF9500" },
              { label: "Пилот", value: 3, color: "#06B6D4" },
              { label: "Клиент", value: 8, color: "#34C759" },
            ]}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-[#E5E5EA] p-6 lg:col-span-2">
          <h2 className="text-[17px] font-semibold text-[#1D1D1F] mb-6">
            MRR Growth
          </h2>
          <BarChart data={analytics.map((a) => a.revenue)} />
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-xl border border-[#E5E5EA] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5EA]">
          <h2 className="text-[17px] font-semibold text-[#1D1D1F]">
            Последни транзакции
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F7] border-b border-[#E5E5EA]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Дата
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Събитие
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Детайли
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold text-[#6E6E73] uppercase">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.slice(-10).reverse().map((item, index) => (
                <tr
                  key={index}
                  className={`
                    border-b border-[#E5E5EA] transition-colors
                    ${index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                    hover:bg-[#F5F5F7]
                  `}
                >
                  <td className="px-4 py-4 text-[13px] text-[#1D1D1F]">
                    {new Date(item.date).toLocaleDateString("bg-BG")}
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#1D1D1F]">
                    {item.conversations} разговора
                  </td>
                  <td className="px-4 py-4 text-[13px] text-[#6E6E73]">
                    {item.leads} leads, {item.bookings} резервации
                  </td>
                  <td className="px-4 py-4 text-[13px] font-semibold text-[#34C759] text-right">
                    +{item.revenue} лв
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            adminStore.exportToCSV(
              analytics,
              `analytics_${new Date().toISOString().split("T")[0]}`,
            );
          }}
          className="h-10 px-4 rounded-lg border border-[#D2D2D7] text-[#1D1D1F] text-[13px] font-medium hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
        >
          <span>📥</span>
          <span>Изтегли CSV</span>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// KPI CARD
// ═══════════════════════════════════════════════════════════

function KPICard({
  icon,
  value,
  label,
  trend,
  trendUp,
}: {
  icon: string;
  value: string | number;
  label: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#E5E5EA] p-6"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0071E3]/10 to-[#06B6D4]/10 flex items-center justify-center mb-4">
        <span className="text-[20px]">{icon}</span>
      </div>

      <div className="text-[28px] font-bold text-[#1D1D1F] leading-none mb-2">
        {value}
      </div>

      <p className="text-[13px] text-[#6E6E73] mb-3">{label}</p>

      <div className="flex items-center gap-1">
        <span
          className={`text-[11px] font-semibold ${trendUp ? "text-[#34C759]" : "text-[#FF3B30]"}`}
        >
          {trendUp ? "↗" : "↘"} {trend}
        </span>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// LINE CHART (SVG)
// ═══════════════════════════════════════════════════════════

function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#E5E5EA"
            strokeWidth="0.2"
          />
        ))}

        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="url(#lineGradient)"
          opacity="0.2"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DONUT CHART
// ═══════════════════════════════════════════════════════════

function DonutChart({
  data,
}: {
  data: Array<{ label: string; value: number; color: string }>;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  return (
    <div className="flex items-center justify-center gap-8">
      {/* Chart */}
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 =
              50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 =
              50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;

            const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
            currentAngle += angle;

            return <path key={index} d={path} fill={item.color} />;
          })}

          {/* Center hole */}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[24px] font-bold text-[#1D1D1F]">{total}</div>
          <div className="text-[11px] text-[#6E6E73]">Total</div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[13px] text-[#1D1D1F]">{item.label}</span>
            <span className="text-[13px] font-semibold text-[#6E6E73]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BAR CHART
// ═══════════════════════════════════════════════════════════

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);

  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((value, index) => {
        const height = (value / max) * 100;

        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full bg-gradient-to-t from-[#0071E3] to-[#06B6D4] rounded-t-lg relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1D1D1F] text-white text-[11px] px-2 py-1 rounded whitespace-nowrap">
                {value} лв
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
