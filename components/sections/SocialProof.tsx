"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button-legacy";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
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

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const timelineStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const timelineFade = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

interface BenefitCard {
  icon: string;
  title: string;
  description: string;
}

interface TimelineStep {
  day: string;
  icon: string;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS: Stat[] = [
  { number: 2, suffix: "-3 дни", label: "Setup време" },
  { number: 22, suffix: "h", label: "Средно спестени седмично" },
  { number: 94, suffix: "%", label: "Удовлетвореност от гостите" },
  { number: 14, suffix: " дни", label: "От договор до launch" },
];

const BENEFITS: BenefitCard[] = [
  {
    icon: "🎯",
    title: "Персонален setup",
    description:
      "Ние лично конфигурираме всичко за вашия хотел. 0 технически усилия от ваша страна.",
  },
  {
    icon: "📊",
    title: "Реални данни",
    description:
      "Детайлен отчет. Виждате точно колко разговора, резервации и часове сте спестили.",
  },
  {
    icon: "🤝",
    title: "Приоритетна цена",
    description:
      "Ранните партньори получават специална цена за 12 месеца.",
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  {
    day: "Ден 1",
    icon: "📞",
    title: "Разговор (20 мин)",
    description:
      "Разбираме вашия хотел, гостите и нуждите. Никакви технически въпроси.",
  },
  {
    day: "Ден 2-3",
    icon: "⚙️",
    title: "Конфигурация",
    description:
      "Изграждаме AI асистент специално за вашия хотел. Вие не правите нищо.",
  },
  {
    day: "Ден 4",
    icon: "🚀",
    title: "Live в сайта ви",
    description:
      "Един малък код в сайта (5 минути) и ботът е жив. Реални гости, реални разговори.",
  },
  {
    day: "Ден 5-30",
    icon: "📈",
    title: "Следим и оптимизираме",
    description:
      "Ежедневно следим разговорите и подобряваме. Получавате WhatsApp updates.",
  },
  {
    day: "Ден 30",
    icon: "📊",
    title: "Отчет и решение",
    description:
      "Пълен отчет с резултатите. Вие решавате: продължаваме или не. Нула натиск.",
  },
];

// ---------------------------------------------------------------------------
// CountUp Component
// ---------------------------------------------------------------------------

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
}

function CountUp({ end, duration = 2000, delay = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // EaseOut curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * end);

        setCount(currentCount);

        if (now >= endTime) {
          setCount(end);
          clearInterval(timer);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
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
// Sub-components
// ---------------------------------------------------------------------------

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="mb-2 flex items-baseline justify-center gap-1">
        <span
          className="text-[56px] font-bold leading-none max-md:text-[42px]"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <CountUp end={stat.number} duration={2000} delay={delay * 1000} />
        </span>
        <span
          className="text-2xl font-bold max-md:text-xl"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {stat.suffix}
        </span>
      </div>
      <p className="text-[13px] uppercase tracking-[0.05em] text-white/60">
        {stat.label}
      </p>
    </motion.div>
  );
}

function BenefitCard({ benefit }: { benefit: BenefitCard }) {
  return (
    <motion.div
      variants={cardFade}
      className="rounded-2xl border border-nextbot-cloud bg-white p-6 transition-all hover:border-nextbot-cyan hover:shadow-[0_8px_24px_rgba(6,182,212,0.1)]"
    >
      <div className="mb-3 text-[40px] leading-none">{benefit.icon}</div>
      <h4 className="mb-2 text-lg font-semibold text-nextbot-midnight">
        {benefit.title}
      </h4>
      <p className="text-[14px] leading-relaxed text-gray-600">
        {benefit.description}
      </p>
    </motion.div>
  );
}

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: TimelineStep;
  index: number;
  isLast: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={timelineFade}
      className="relative flex items-start gap-6 max-md:flex-col"
    >
      {/* Timeline line (vertical) */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-nextbot-cyan to-nextbot-midnight max-md:left-8" />
      )}

      {/* Content - alternating sides on desktop, left-aligned on mobile */}
      <div
        className={cn(
          "flex w-full items-start gap-6",
          isEven ? "flex-row" : "flex-row-reverse max-md:flex-row",
        )}
      >
        {/* Left/Right spacer for alternating layout (desktop only) */}
        <div className="flex-1 max-md:hidden" />

        {/* Circle icon (center) */}
        <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-nextbot-silver bg-white text-[28px] shadow-lg">
          {step.icon}
        </div>

        {/* Content card */}
        <div className="flex-1">
          <div
            className={cn(
              "rounded-2xl border border-nextbot-cloud bg-white p-6 shadow-sm",
              isEven ? "text-left" : "text-right max-md:text-left",
            )}
          >
            <div className="mb-2 inline-block rounded-full bg-nextbot-cyan/10 px-3 py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-nextbot-cyan">
                {step.day}
              </span>
            </div>
            <h4 className="mb-2 text-xl font-bold text-nextbot-midnight">
              {step.title}
            </h4>
            <p className="text-[14px] leading-relaxed text-gray-600">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function SocialProof() {
  const [nextAvailableDate, setNextAvailableDate] = useState("");

  useEffect(() => {
    // Calculate next available date (7 days from now)
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const formatted = date.toLocaleDateString("bg-BG", {
      day: "numeric",
      month: "long",
    });
    setNextAvailableDate(formatted);
  }, []);

  // Progress: 3 taken, 7 remaining
  const taken = 3;
  const total = 10;
  const remaining = total - taken;
  const progressPercent = (taken / total) * 100;

  return (
    <section id="pilot">
      {/* ══════════════════════════════════════════
          SUBSECTION 1: STATS BAR
          ══════════════════════════════════════════ */}
      <div className="bg-nextbot-midnight py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-16 max-md:gap-10">
            {STATS.map((stat, i) => (
              <StatItem key={i} stat={stat} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SUBSECTION 2: PILOT PROGRAM SECTION
          ══════════════════════════════════════════ */}
      <div className="bg-white py-24">
        <motion.div
          className="container mx-auto px-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-wider text-nextbot-cyan"
            >
              Early Access
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mx-auto mb-4 text-[clamp(2rem,4vw,2.5rem)] font-bold leading-tight text-nextbot-midnight"
            >
              Първите 10 хотела в България
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-[600px] text-lg text-gray-600"
            >
              Търсим 10 хотела партньори. Ограничени места.
            </motion.p>
          </div>

          {/* Benefits Grid */}
          <motion.div
            className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={cardStagger}
          >
            {BENEFITS.map((benefit, i) => (
              <BenefitCard key={i} benefit={benefit} />
            ))}
          </motion.div>

          {/* Availability Bar */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-8 max-w-[600px] rounded-2xl border border-nextbot-cloud bg-nextbot-silver p-6"
          >
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-nextbot-midnight">
              <span>Оставащи места:</span>
              <span className="text-lg">
                {remaining} от {total}
              </span>
            </div>

            {/* Progress bar with animation */}
            <motion.div
              className="h-2 overflow-hidden rounded-full bg-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-nextbot-cyan to-nextbot-ocean"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </motion.div>

            <div className="mt-2 text-xs text-gray-500">
              {taken} взети • {remaining} свободни
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <Button
              size="lg"
              className="mb-3 rounded-full px-8 transition-transform hover:scale-105"
              iconRight={<ArrowRightIcon />}
            >
              Кандидатствай сега
            </Button>
            <p className="text-[13px] italic text-gray-500">
              Местата се запълват бързо. Следващата налична дата:{" "}
              <span className="font-semibold text-nextbot-midnight">
                {nextAvailableDate || "скоро"}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          SUBSECTION 3: HOW IT WORKS TIMELINE
          ══════════════════════════════════════════ */}
      <div className="bg-nextbot-silver py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-[clamp(2rem,4vw,2.5rem)] font-bold text-nextbot-midnight">
              Как протича пилотът
            </h2>
            <p className="text-lg text-gray-600">
              От първи контакт до работещ AI асистент
            </p>
          </div>

          {/* Timeline */}
          <motion.div
            className="mx-auto max-w-[900px] space-y-12"
            variants={timelineStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                index={i}
                isLast={i === TIMELINE_STEPS.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
