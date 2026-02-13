"use client";

import { motion } from "framer-motion";

interface AddonCardProps {
  icon?: string;
  name: string;
  description?: string;
  price: number;
  popular?: boolean;
  color?: string;
}

export function AddonCard({
  icon,
  name,
  description,
  price,
  popular,
  color = "#6366F1",
}: AddonCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: color }}
      className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all hover:bg-white/10"
    >
      {popular && (
        <div className="absolute -top-3 right-4">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold text-white shadow-lg"
            style={{ backgroundColor: color }}
          >
            Popular
          </span>
        </div>
      )}

      {icon && <div className="text-[32px] mb-4">{icon}</div>}

      <h3 className="text-[16px] font-bold text-white mb-2">{name}</h3>

      {description && (
        <p className="text-[13px] text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-[11px] text-gray-500">+</span>
        <span className="text-[20px] font-bold" style={{ color }}>
          {price}
        </span>
        <span className="text-[13px] text-gray-500">лв/м</span>
      </div>
    </motion.div>
  );
}

interface BundleCardProps {
  name: string;
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  color: string;
  itemCount: number;
}

export function BundleCard({
  name,
  originalPrice,
  bundlePrice,
  savings,
  color,
  itemCount,
}: BundleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl p-6 border-2 transition-all"
      style={{
        backgroundColor: `${color}10`,
        borderColor: color,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[24px]">📦</span>
            <h3 className="text-[18px] font-bold text-white">{name}</h3>
          </div>
          <p className="text-[13px] text-gray-400 mb-3">
            всички {itemCount} добавки
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[15px] text-gray-500 line-through">
              {originalPrice} лв
            </span>
            <span className="text-[32px] font-bold text-white">
              {bundlePrice}
            </span>
            <span className="text-[13px] text-gray-400">лв/мес</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="px-4 py-2 rounded-full bg-green-500 text-white text-[13px] font-semibold">
            Спести {savings} лв
          </div>
        </div>
      </div>
    </motion.div>
  );
}
