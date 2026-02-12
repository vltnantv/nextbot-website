"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Feature } from "@/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Icon map — maps string keys to inline SVGs (48x48)
// ---------------------------------------------------------------------------

const icons: Record<string, React.ReactNode> = {
  hotel: (
    <svg
      className="h-12 w-12"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="14" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 26h36" stroke="currentColor" strokeWidth="2.5" />
      <rect x="14" y="18" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="18" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M21 32v6M27 32v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 8v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="6" r="2" fill="currentColor" />
    </svg>
  ),
  "shopping-cart": (
    <svg
      className="h-12 w-12"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 8h4l2.68 13.39a4 4 0 003.92 3.11h14.8a4 4 0 003.92-3.11L40 12H14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="36" r="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 16h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 20h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  headphones: (
    <svg
      className="h-12 w-12"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 28v-4a14 14 0 1128 0v4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="6" y="28" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <rect x="34" y="28" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 36h2M32 36h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path
        d="M42 38v2a4 4 0 01-4 4h-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const icon = icons[feature.icon] ?? icons.hotel;

  const content = (
    <>
      {/* Icon */}
      <div
        className="mb-4 inline-flex text-nextbot-ocean transition-transform duration-400 ease-out group-hover:scale-110 group-hover:rotate-[5deg]"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-semibold text-nextbot-midnight">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-base leading-[1.6] text-gray-500">
        {feature.description}
      </p>

      {/* CTA link — visible on hover */}
      {feature.href && (
        <span
          className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-nextbot-ocean opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
        >
          Научи повече
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      )}
    </>
  );

  const cardClasses = cn(
    "group relative rounded-3xl bg-white p-8 text-left",
    "shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)]",
    "transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
    "hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]",
    // Gradient border on hover (via pseudo, done with ring)
    "ring-1 ring-transparent hover:ring-nextbot-cyan/20",
  );

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        cardClasses,
        // Tablet: last odd card spans 2 columns, centered
        index === 2 && "md:col-span-2 md:max-w-[calc(50%-16px)] md:justify-self-center lg:col-span-1 lg:max-w-none",
      )}
    >
      {feature.href ? (
        <Link href={feature.href} className="block" tabIndex={-1}>
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.article>
  );
}
