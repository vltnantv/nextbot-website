"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const FLOATING_ICONS = ["💬", "📧", "📱", "📊", "⚡"];

export function NeoHero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-nextbot-midnight via-neo-purple to-nextbot-cyan">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_ICONS.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-[48px] opacity-15"
            style={{
              left: `${15 + index * 18}%`,
              top: `${30 + (index % 3) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neo-purple/20 border border-neo-purple/30 neo-glow mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neo-purple animate-pulse" />
            <span className="text-[13px] font-semibold text-nextbot-cyan">
              Представяме Nextbot Neo
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-6"
          >
            <div className="text-[48px] md:text-[64px] lg:text-[80px] leading-[0.9] font-normal text-white mb-2 tracking-tight">
              Един чатбот.
            </div>
            <div className="text-[48px] md:text-[64px] lg:text-[80px] leading-[0.9] font-bold text-neo-gradient tracking-tight">
              Безкрайни възможности.
            </div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-white/70 max-w-3xl mx-auto mb-12 px-4"
          >
            Отговаря на клиентите ти 24/7.
            <br />
            Навсякъде. На всеки език.
            <br />
            Разширяем с добавки по твоя нужда.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-8 mb-12"
          >
            <StatPill value="199 лв" label="от / месец" />
            <StatPill value="24/7" label="без почивен ден" />
            <StatPill value="30 дни" label="безплатно" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="#pilot"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-nextbot-midnight hover:bg-nextbot-silver shadow-2xl font-semibold text-[15px] transition-all active:scale-[0.98]"
            >
              Започни безплатно →
            </Link>
            <Link
              href="#addons"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/30 text-white hover:bg-white/10 font-semibold text-[15px] transition-all active:scale-[0.98]"
            >
              Виж добавките ↓
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[32px] font-bold text-white">{value}</div>
      <div className="text-[13px] text-white/60">{label}</div>
    </div>
  );
}
