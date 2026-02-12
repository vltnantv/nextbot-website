"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FAQItemProps {
  /** The question text */
  question: string;
  /** The answer text or React node */
  answer: React.ReactNode;
  /** Whether this item is open by default */
  defaultOpen?: boolean;
  /** External control of open state */
  isOpen?: boolean;
  /** Callback when toggled */
  onToggle?: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FAQItem({
  question,
  answer,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
}: FAQItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="border-b border-nextbot-cloud py-6">
      {/* Question row */}
      <button
        type="button"
        onClick={handleToggle}
        className="group flex w-full items-start justify-between gap-4 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-lg font-semibold text-nextbot-midnight transition-colors group-hover:text-nextbot-ocean">
          {question}
        </span>

        {/* Plus/X icon */}
        <motion.div
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-nextbot-cyan"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-base leading-[1.7] text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
