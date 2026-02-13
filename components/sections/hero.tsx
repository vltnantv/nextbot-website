"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HERO, HERO_STATS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const statFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Particle field (client-only, subtle floating dots)
// ---------------------------------------------------------------------------

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = [];
    for (let i = 0; i < 35; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }
    setParticles(items);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
            y: [0, -25, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scroll indicator
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
        Scroll
      </span>
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </motion.svg>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export function Hero() {
  const headlineLines = HERO.headline.split("\n");

  return (
    <section
      id="main-content"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* ── Animated gradient background ── */}
      <div
        className="pointer-events-none absolute inset-0 animate-gradient-shift bg-[length:200%_200%]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0A0E27 0%, #111a4a 25%, #1E40AF 50%, #155e75 75%, #06B6D4 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Radial glow overlays ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-1/4 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-nextbot-ocean/30 blur-[140px] max-md:hidden" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-nextbot-cyan/15 blur-[120px]" />
      </div>

      {/* ── Noise texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Particles ── */}
      <ParticleField />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[980px] px-4 text-center sm:px-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-nextbot-cyan"
          style={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
        >
          {HERO.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto font-display font-bold leading-[1.1] tracking-[-0.03em] text-balance [font-size:clamp(3rem,8vw,6rem)]"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #A5B4FC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headlineLines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-12 mt-6 max-w-[700px] text-lg font-normal leading-[1.6] text-white/80 max-[640px]:text-base md:text-2xl"
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 max-[640px]:flex-col max-[640px]:px-4"
        >
          <Button
            size="lg"
            className="rounded-full px-8 transition-transform hover:scale-105 max-[640px]:w-full"
            iconRight={<ArrowRightIcon />}
            onClick={() => scrollToSection("#pilot")}
          >
            {HERO.ctaPrimary}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full px-8 max-[640px]:w-full"
            iconLeft={<PlayIcon />}
            onClick={() => scrollToSection("#pricing")}
          >
            {HERO.ctaSecondary}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-16 max-[640px]:mt-14 max-[640px]:flex-col max-[640px]:gap-8"
          variants={stagger}
        >
          {HERO_STATS.map((stat) => (
            <motion.div key={stat.label} variants={statFade} className="text-center">
              <span
                className="block font-display text-5xl font-bold leading-none tracking-tight max-[640px]:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span className="mt-2 block text-[12px] font-medium uppercase tracking-[0.05em] text-white/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
