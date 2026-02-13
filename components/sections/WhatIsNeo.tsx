"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    icon: "🧠",
    title: "Base чатботът",
    description:
      "Умният AI core. Отговаря, помага, учи се от всеки разговор.",
  },
  {
    icon: "🔌",
    title: "Твоите добавки",
    description:
      "Добавяш само това което ти трябва. WhatsApp, CRM, email, voice...",
  },
  {
    icon: "📈",
    title: "Расте с теб",
    description:
      "Стартираш малко. Добавяш с времето. Плащаш само за това което ползваш.",
  },
];

export function WhatIsNeo() {
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
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-[48px] font-bold text-nextbot-midnight mb-4">
            Какво е Neo?
          </h2>
          <p className="text-[20px] text-gray-600 max-w-3xl mx-auto">
            Модулен AI асистент. Като iPhone + App Store.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative group"
            >
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 h-full transition-all hover:border-neo-purple hover:shadow-xl hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neo-purple/10 to-nextbot-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-[40px]">{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-[24px] font-bold text-nextbot-midnight mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[16px] text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
