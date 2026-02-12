"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/dashboard/leads": "Leads & Клиенти",
  "/admin/dashboard/pilots": "Pilot Program",
  "/admin/dashboard/pricing": "Ценообразуване",
  "/admin/dashboard/analytics": "Анализи",
  "/admin/dashboard/settings": "Настройки",
};

export function TopBar() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("bg-BG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const pageTitle = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="fixed top-0 left-[260px] right-0 h-12 bg-white/80 backdrop-blur-xl border-b border-[#E5E5EA] z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-[17px] font-semibold text-[#1D1D1F]">
          {pageTitle}
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Current Time */}
          <time className="text-[13px] text-[#6E6E73]">{currentTime}</time>

          {/* Notifications Badge */}
          <button className="relative p-2 hover:bg-[#F5F5F7] rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-[#6E6E73]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3B30] rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
