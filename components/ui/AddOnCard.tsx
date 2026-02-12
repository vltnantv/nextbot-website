"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AddOnCardProps {
  /** Icon (emoji or SVG string) */
  icon: string;
  /** Card title */
  title: string;
  /** Description text */
  description: string;
  /** Monthly price in лв */
  price: number;
  /** Show "Най-търсено" badge */
  popular?: boolean;
  /** Optional className for customization */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AddOnCard({
  icon,
  title,
  description,
  price,
  popular = false,
  className,
}: AddOnCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-[20px] border-2 bg-white p-6 transition-all duration-300",
        popular
          ? "border-nextbot-cyan"
          : "border-nextbot-cloud hover:border-nextbot-cyan",
        "hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
        className,
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-[18px] bg-nextbot-cyan px-3 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
            Най-търсено
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-3 text-[32px] leading-none">{icon}</div>

      {/* Title */}
      <h3 className="mb-1 text-base font-semibold text-nextbot-midnight">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
        {description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm text-gray-500">+</span>
        <span className="text-2xl font-bold text-nextbot-ocean">{price}</span>
        <span className="text-sm text-gray-500"> лв/месец</span>
      </div>
    </motion.div>
  );
}
