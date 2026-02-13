"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-3 border-[#0071E3]/30 border-t-[#0071E3] rounded-full animate-spin" />
        <p className="text-[13px] text-[#6E6E73]">Redirecting...</p>
      </div>
    </div>
  );
}
