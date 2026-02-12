"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { adminStore } from "@/lib/admin-store";

const NAV_ITEMS = [
  {
    icon: "📊",
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: "👥",
    label: "Leads",
    href: "/admin/dashboard/leads",
  },
  {
    icon: "🚀",
    label: "Пилоти",
    href: "/admin/dashboard/pilots",
  },
  {
    icon: "💰",
    label: "Ценообразуване",
    href: "/admin/dashboard/pricing",
  },
  {
    icon: "📈",
    label: "Анализи",
    href: "/admin/dashboard/analytics",
  },
  {
    icon: "⚙️",
    label: "Настройки",
    href: "/admin/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    adminStore.logout();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#1D1D1F] flex flex-col">
      {/* Logo Area */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/logo.png"
            alt="Nextbot"
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span className="text-[15px] font-semibold text-white">
            Nextbot Admin
          </span>
        </div>
        <span className="inline-block px-2 py-0.5 rounded-full bg-[#6E6E73] text-[11px] text-white font-medium">
          v1.0
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all duration-150
                ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-[#06B6D4]"
                    : "text-[#8E8E93] hover:bg-white/[0.06] hover:text-white"
                }
              `}
            >
              <span className="text-[18px]">{item.icon}</span>
              <span className="text-[13px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-6 border-t border-white/10 space-y-3">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071E3] to-[#06B6D4] flex items-center justify-center">
            <span className="text-[13px] font-semibold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-white truncate">
              Admin
            </p>
            <p className="text-[11px] text-[#8E8E93] truncate">
              admin@nextbot.me
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all duration-150"
        >
          <span className="text-[18px]">🚪</span>
          <span className="text-[13px] font-medium">Изход</span>
        </button>

        {/* Version */}
        <p className="text-[11px] text-[#6E6E73] text-center">
          Nextbot v1.0
        </p>
      </div>
    </aside>
  );
}
