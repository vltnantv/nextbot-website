"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Потвърди",
  cancelLabel = "Отказ",
  danger = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-[16px] shadow-2xl p-6"
            >
              {/* Icon */}
              {danger && (
                <div className="w-12 h-12 rounded-full bg-[#FF3B30]/10 flex items-center justify-center mb-4">
                  <span className="text-[24px]">⚠️</span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-[17px] font-semibold text-[#1D1D1F] mb-2">
                {title}
              </h3>

              {/* Message */}
              <p className="text-[13px] text-[#6E6E73] mb-6 leading-relaxed">
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-11 rounded-lg border border-[#D2D2D7] bg-white text-[#1D1D1F] text-[15px] font-medium hover:bg-[#F5F5F7] transition-all active:scale-[0.98]"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`
                    flex-1 h-11 rounded-lg text-white text-[15px] font-semibold
                    transition-all active:scale-[0.98]
                    ${
                      danger
                        ? "bg-[#FF3B30] hover:bg-[#FF4540]"
                        : "bg-[#0071E3] hover:bg-[#0077ED]"
                    }
                  `}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
