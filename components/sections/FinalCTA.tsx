"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const badgeFade = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const buttonScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
  },
};

const staggerReassurance = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const reassuranceFade = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const REASSURANCES = [
  "✓ Setup за 2-3 дни",
  "✓ Без договор",
  "✓ от €120/месец",
];

const PHONE_NUMBER = "+359 894 288 119"; // Replace with real number
const PHONE_DISPLAY = "+359 894 288 119"; // Format for display

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ArrowRightIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-40 max-md:py-24">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A0E27 0%, #1E40AF 60%, #06B6D4 100%)",
        }}
        aria-hidden="true"
      />

      {/* Background mesh effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top-left blur */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/[0.03] blur-[100px]" />
        {/* Bottom-right blur */}
<div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/[0.03] blur-[100px] max-md:hidden" />        {/* Center blur */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nextbot-cyan/[0.04] blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-[700px] px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div variants={badgeFade} className="mb-6 inline-block">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-[10px]"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-[13px] font-semibold text-white">
                🎯 Ограничени места
              </span>
            </motion.div>
          </motion.div>

          {/* Headline - Line 1 */}
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-[clamp(2.5rem,5vw,3rem)] font-normal leading-[1.1] text-white/80"
            style={{ transitionDelay: "0.1s" }}
          >
            Готови ли сте?
          </motion.h2>

          {/* Headline - Line 2 */}
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-[clamp(3.5rem,7vw,4.5rem)] font-bold leading-[1.1]"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transitionDelay: "0.2s",
            }}
          >
            Започни с Neo.
          </motion.h2>

          {/* Sub text */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-12 max-w-[600px] text-xl leading-[1.6] text-white/75 max-md:text-lg"
            style={{ transitionDelay: "0.3s" }}
          >
            Инсталираме AI асистент в сайта ви. Виждате резултати. Вие
            решавате.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div variants={buttonScale}>
            <Button
              size="lg"
              className="group mb-8 rounded-2xl bg-white px-12 py-5 text-lg font-semibold text-nextbot-midnight shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] active:scale-[0.98]"
              iconRight={<ArrowRightIcon />}
            >
              Започни сега
            </Button>
          </motion.div>

          {/* Micro-reassurances */}
          <motion.div
            variants={staggerReassurance}
            className="mb-8 flex flex-wrap items-center justify-center gap-6 max-md:gap-4"
          >
            {REASSURANCES.map((text, i) => (
              <motion.span
                key={i}
                variants={reassuranceFade}
                className="text-[13px] text-white/65"
              >
                {text}
              </motion.span>
            ))}
          </motion.div>

          {/* Contact alternative */}
          <motion.div
            variants={fadeUp}
            className="mt-8"
            style={{ transitionDelay: "0.6s" }}
          >
            <p className="mb-2 text-sm text-white/60">
              Или се обадете директно:
            </p>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="text-lg font-semibold text-white transition-colors hover:text-nextbot-cyan"
            >
              {PHONE_DISPLAY}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
