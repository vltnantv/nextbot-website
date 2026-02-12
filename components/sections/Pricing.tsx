"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AddOnCard } from "@/components/ui/AddOnCard";
import { PricingCalculator } from "@/components/sections/PricingCalculator";
import { cn } from "@/lib/utils";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TRUST_BADGES = [
  { icon: "✓", text: "Без setup такса" },
  { icon: "✓", text: "30 дни безплатен пилот" },
  { icon: "✓", text: "Спирате когато искате" },
];

const BASE_FEATURES = [
  "1 AI асистент на вашия сайт",
  "До 1,000 разговора/месец",
  "Български + Английски",
  "Email поддръжка",
  "Месечен performance отчет",
];

const ADD_ONS = [
  {
    icon: "💬",
    title: "WhatsApp Business",
    description:
      "Ботът отговаря директно в WhatsApp на вашите клиенти",
    price: 79,
    popular: true,
  },
  {
    icon: "📱",
    title: "Facebook & Instagram",
    description:
      "Автоматични отговори на всички съобщения в социалните мрежи",
    price: 49,
    popular: false,
  },
  {
    icon: "🌍",
    title: "Немски или Руски",
    description: "Добавете пълна поддръжка на допълнителен език",
    price: 49,
    popular: false,
  },
  {
    icon: "⚙️",
    title: "Системна интеграция",
    description: "Свързване с вашата booking система, CRM или ERP",
    price: 99,
    popular: true,
  },
  {
    icon: "♾️",
    title: "Unlimited разговори",
    description:
      "Без лимит на разговорите, колкото и да се развие бизнесът",
    price: 99,
    popular: false,
  },
  {
    icon: "⚡",
    title: "Приоритетна поддръжка",
    description:
      "Отговор до 2 часа, 7 дни в седмицата включително уикенди",
    price: 149,
    popular: false,
  },
];

interface PricingExample {
  icon: string;
  title: string;
  subtitle: string;
  items: { label: string; price: number }[];
  total: number;
  caption: string;
  highlighted?: boolean;
}

const EXAMPLES: PricingExample[] = [
  {
    icon: "🏨",
    title: "Малък хотел",
    subtitle: "25 стаи, Банско",
    items: [
      { label: "База", price: 299 },
      { label: "WhatsApp", price: 79 },
    ],
    total: 378,
    caption: "По-малко от 2 работни дни на рецепционист",
    highlighted: false,
  },
  {
    icon: "🏨",
    title: "Среден хотел",
    subtitle: "50 стаи, морски курорт",
    items: [
      { label: "База", price: 299 },
      { label: "WhatsApp", price: 79 },
      { label: "Немски", price: 49 },
      { label: "Unlimited", price: 99 },
    ],
    total: 526,
    caption: "Рецепционистът се фокусира само на гости",
    highlighted: true,
  },
  {
    icon: "🛒",
    title: "Онлайн магазин",
    subtitle: "200+ поръчки месечно",
    items: [
      { label: "База", price: 299 },
      { label: "Facebook/Instagram", price: 49 },
      { label: "Unlimited", price: 99 },
    ],
    total: 447,
    caption: "Support tickets намаляха с 70%",
    highlighted: false,
  },
];

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-nextbot-cyan"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

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

function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-50 px-4 py-2">
      <span className="text-sm font-bold text-green-600">{icon}</span>
      <span className="text-sm font-semibold text-nextbot-midnight">
        {text}
      </span>
    </div>
  );
}

function ExampleCard({ example }: { example: PricingExample }) {
  return (
    <motion.div
      variants={cardFade}
      className={cn(
        "rounded-[20px] border bg-white p-8",
        example.highlighted
          ? "border-nextbot-cyan shadow-[0_8px_32px_rgba(6,182,212,0.15)]"
          : "border-nextbot-cloud",
      )}
    >
      <div className="mb-4 text-[40px] leading-none">{example.icon}</div>
      <h4 className="text-xl font-bold text-nextbot-midnight">
        {example.title}
      </h4>
      <p className="mb-6 text-sm text-gray-500">{example.subtitle}</p>

      {/* Items */}
      <div className="mb-4 space-y-2">
        {example.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-600">
            <span>• {item.label}:</span>
            <span>{item.price} лв</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mb-4 border-t border-gray-200" />

      {/* Total */}
      <div className="mb-3 text-[28px] font-bold text-nextbot-midnight">
        {example.total} лв/месец
      </div>

      {/* Caption */}
      <p className="text-xs italic text-green-600">{example.caption}</p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-32 max-md:py-20">
      {/* ══════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════ */}
      <motion.div
        className="container mx-auto px-4 pb-16 text-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="mb-4 text-xs font-semibold uppercase tracking-wider text-nextbot-cyan"
        >
          Прозрачно ценообразуване
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="mx-auto mb-6 max-w-[800px] text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] text-nextbot-midnight"
        >
          Плащате само за това което ползвате.
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-[600px] text-xl text-gray-600 max-md:text-lg"
        >
          Без setup такса. Без скрити разходи. Започнете безплатно - плащате
          само след доказани резултати.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          variants={stagger}
          className="flex flex-wrap items-center justify-center gap-3 max-md:flex-col"
        >
          {TRUST_BADGES.map((badge, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TrustBadge icon={badge.icon} text={badge.text} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════
          SECTION 2: BASE PRICE CARD
          ══════════════════════════════════════════ */}
      <motion.div
        className="container mx-auto mb-24 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          variants={scaleIn}
          className="mx-auto max-w-[480px] rounded-[32px] border border-white/10 bg-gradient-to-br from-nextbot-midnight to-nextbot-ocean p-12 shadow-[0_24px_80px_rgba(30,64,175,0.35)] max-md:p-8"
        >
          {/* Label */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
            NEXTBOT PROFESSIONAL
          </p>

          {/* Price */}
          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-2xl text-white/70">от</span>
            <span className="text-[80px] font-bold leading-none text-white max-md:text-[64px]">
              299
            </span>
            <span className="text-2xl text-white/70">лв</span>
          </div>
          <p className="mb-8 text-base text-white/60">/месец</p>

          {/* Divider */}
          <div className="mb-8 border-t border-white/10" />

          {/* Features */}
          <ul className="mb-8 space-y-4">
            {BASE_FEATURES.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="flex-1 text-base text-white/90">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full rounded-[14px] bg-white text-nextbot-midnight transition-transform hover:scale-[1.02] hover:bg-nextbot-silver"
            iconRight={<ArrowRightIcon />}
          >
            Започни безплатен пилот
          </Button>

          {/* Caption */}
          <p className="mt-4 text-center text-xs text-white/50">
            30 дни безплатно • Без кредитна карта
          </p>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════
          SECTION 3: ADD-ONS GRID
          ══════════════════════════════════════════ */}
      <div className="container mx-auto mb-24 px-4">
        <h3 className="mb-12 text-center text-[32px] font-bold text-nextbot-midnight max-md:text-2xl">
          Добавете само това което ви трябва
        </h3>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ADD_ONS.map((addon, i) => (
            <motion.div key={i} variants={cardFade}>
              <AddOnCard {...addon} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 4: INTERACTIVE CALCULATOR
          ══════════════════════════════════════════ */}
      <div className="container mx-auto mb-24 px-4">
        <PricingCalculator />
      </div>

      {/* ══════════════════════════════════════════
          SECTION 5: EXAMPLES
          ══════════════════════════════════════════ */}
      <div className="container mx-auto mb-24 px-4">
        <h3 className="mb-4 text-center text-[32px] font-bold text-nextbot-midnight max-md:text-2xl">
          Примери от реалния живот
        </h3>
        <p className="mb-12 text-center text-lg text-gray-600">
          Колко плащат бизнеси като вашия
        </p>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {EXAMPLES.map((example, i) => (
            <ExampleCard key={i} example={example} />
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 6: ANNUAL PLAN BANNER
          ══════════════════════════════════════════ */}
      <motion.div
        className="container mx-auto mb-24 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-[900px] overflow-hidden rounded-[24px] bg-gradient-to-br from-nextbot-midnight to-nextbot-ocean p-12 max-md:p-8">
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:text-center">
            {/* Left content */}
            <div className="flex-1">
              <div className="mb-3 inline-block rounded-full bg-nextbot-gold px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  ГОДИШЕН ПЛАН
                </span>
              </div>
              <h3 className="mb-3 text-[36px] font-bold leading-tight text-white max-md:text-[28px]">
                Спестете 2 пълни месеца
              </h3>
              <p className="mb-4 text-base text-white/80">
                Клиентите с годишен план спестяват средно 756 лв.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm text-white underline transition-colors hover:text-nextbot-cyan"
              >
                Разберете повече <ArrowRightIcon />
              </a>
            </div>

            {/* Right visual */}
            <div className="text-center">
              <div
                className="bg-gradient-to-r from-white to-nextbot-cyan bg-clip-text text-[72px] font-bold leading-none text-transparent max-md:text-[56px]"
              >
                2 месеца
              </div>
              <div className="mt-2 text-xl text-white/70">безплатно</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          SECTION 7: GUARANTEE
          ══════════════════════════════════════════ */}
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-[600px]">
          {/* Icon */}
          <div className="mb-6 text-[48px]">🛡️</div>

          {/* Headline */}
          <h3 className="mb-4 text-[28px] font-bold text-nextbot-midnight max-md:text-2xl">
            60-дневна гаранция за резултати
          </h3>

          {/* Text */}
          <p className="mb-8 text-base leading-[1.7] text-gray-600">
            Ако в първите 60 дни AI асистентът не спести поне 3 пъти цената в
            реален труд на екипа ви, прекратяваме и не дължите нищо.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="mb-4 rounded-full px-8 transition-transform hover:scale-105"
            iconRight={<ArrowRightIcon />}
          >
            Започни безплатния пилот
          </Button>

          {/* Caption */}
          <p className="text-[13px] text-gray-500">
            Без кредитна карта • Без договор • 30 дни безплатно
          </p>
        </div>
      </motion.div>
    </section>
  );
}
