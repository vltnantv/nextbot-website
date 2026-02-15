"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-nextbot-ocean/15 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-12 text-center backdrop-blur-sm md:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Ready to transform
            <br />
            <span className="gradient-text">your business?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-nextbot-cloud/60">
            Join thousands of companies using Nextbot to automate their
            operations and drive growth with AI.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg">
              Get Started
              <svg
                className="ml-2 h-4 w-4"
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
            </Button>
            <Button variant="secondary" size="lg">
              Talk to Sales
            </Button>
          </div>
          <p className="mt-6 text-sm text-nextbot-cloud/40">
            Book a demo to see Nextbot in action.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
