"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Toast } from "@/lib/admin-types";

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastIcons = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const ToastColors = {
  success: {
    bg: "bg-[#34C759]",
    text: "text-white",
  },
  error: {
    bg: "bg-[#FF3B30]",
    text: "text-white",
  },
  warning: {
    bg: "bg-[#FF9500]",
    text: "text-white",
  },
  info: {
    bg: "bg-[#0071E3]",
    text: "text-white",
  },
};

export function ToastItem({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration || 3000;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const colors = ToastColors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
        ${colors.bg} ${colors.text}
        min-w-[320px] max-w-[420px]
      `}
    >
      <div className="flex-shrink-0 text-xl font-semibold">
        {ToastIcons[toast.type]}
      </div>
      <p className="flex-1 text-[13px] font-medium">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
      >
        <span className="text-[11px]">✕</span>
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
