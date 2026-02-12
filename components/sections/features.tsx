"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { FEATURES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Features() {
  return (
    <section
      id="products"
      className="relative bg-nextbot-silver py-32 max-[768px]:py-16"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* ── Section header ── */}
          <motion.div className="mx-auto mb-16 max-w-2xl text-center" variants={headerFade}>
            {/* Eyebrow */}
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-nextbot-cyan">
              Нашите решения
            </p>

            {/* Headline */}
            <h2
              className="font-display font-bold leading-[1.2] tracking-tight text-nextbot-midnight text-balance [font-size:clamp(2.5rem,5vw,4rem)]"
            >
              Всеки бизнес. Всяка индустрия.
              <br className="hidden sm:block" />
              Едно решение.
            </h2>
          </motion.div>

          {/* ── Feature grid ── */}
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
          >
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
