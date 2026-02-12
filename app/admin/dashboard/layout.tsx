"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminStore } from "@/lib/admin-store";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import { ToastContainer } from "@/components/admin/Toast";
import type { Toast } from "@/lib/admin-types";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Check authentication
  useEffect(() => {
    // Initialize store
    adminStore.initialize();

    // Check auth
    if (!adminStore.isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Don't render until auth check is complete
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-3 border-[#0071E3]/30 border-t-[#0071E3] rounded-full animate-spin" />
          <p className="text-[13px] text-[#6E6E73]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Sidebar */}
      <Sidebar />

      {/* TopBar */}
      <TopBar />

      {/* Main Content */}
      <main className="ml-[260px] mt-12 min-h-[calc(100vh-48px)]">
        <div className="p-8">{children}</div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
