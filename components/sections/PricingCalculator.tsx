"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AddOnOption {
  id: string;
  title: string;
  description: string;
  price: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const BASE_PRICE = 299;

const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: "whatsapp",
    title: "WhatsApp Business",
    description: "Ботът отговаря директно в WhatsApp на вашите клиенти",
    price: 79,
  },
  {
    id: "facebook",
    title: "Facebook & Instagram",
    description: "Автоматични отговори на всички съобщения в социалните мрежи",
    price: 49,
  },
  {
    id: "language",
    title: "Немски или Руски език",
    description: "Добавете пълна поддръжка на допълнителен език",
    price: 49,
  },
  {
    id: "integration",
    title: "Системна интеграция",
    description: "Свързване с вашата booking система, CRM или ERP",
    price: 99,
  },
  {
    id: "unlimited",
    title: "Unlimited разговори",
    description: "Без лимит на разговорите, колкото и да се развие бизнесът",
    price: 99,
  },
  {
    id: "priority",
    title: "Приоритетна поддръжка",
    description: "Отговор до 2 часа, 7 дни в седмицата включително уикенди",
    price: 149,
  },
];

// ---------------------------------------------------------------------------
// Toggle Switch Component
// ---------------------------------------------------------------------------

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nextbot-cyan focus-visible:ring-offset-2",
        checked ? "bg-nextbot-cyan" : "bg-gray-300",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Animated Counter
// ---------------------------------------------------------------------------

function AnimatedPrice({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-4xl font-bold text-nextbot-midnight"
    >
      {value}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Main Calculator Component
// ---------------------------------------------------------------------------

export function PricingCalculator() {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [isAnnual, setIsAnnual] = useState(false);

  // Calculate total price
  const monthlyTotal = ADD_ON_OPTIONS.reduce((sum, option) => {
    return selectedAddOns.has(option.id) ? sum + option.price : sum;
  }, BASE_PRICE);

  const displayTotal = isAnnual ? monthlyTotal * 10 : monthlyTotal;
  const annualSavings = monthlyTotal * 2;

  // Toggle add-on selection
  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.div
      className="mx-auto max-w-[720px] rounded-[32px] bg-nextbot-silver p-8 md:p-12"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="mb-2 text-[28px] font-bold text-nextbot-midnight">
          Изчислете вашата цена
        </h3>
        <p className="text-base text-gray-600">
          Изберете нужните опции и вижте точната цена
        </p>
      </div>

      {/* Add-on options */}
      <div className="space-y-0">
        {ADD_ON_OPTIONS.map((option, index) => (
          <div
            key={option.id}
            className={cn(
              "flex items-center justify-between gap-4 border-b border-nextbot-cloud py-4",
              index === 0 && "pt-0",
            )}
          >
            <div className="flex flex-1 items-center gap-4">
              <ToggleSwitch
                checked={selectedAddOns.has(option.id)}
                onChange={() => toggleAddOn(option.id)}
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-nextbot-midnight">
                  {option.title}
                </div>
                <div className="mt-0.5 text-xs text-gray-500 max-md:hidden">
                  {option.description}
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600">
              +{option.price} лв
            </div>
          </div>
        ))}
      </div>

      {/* Annual toggle */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4">
        <div className="flex items-center gap-3">
          <ToggleSwitch checked={isAnnual} onChange={setIsAnnual} />
          <span className="text-sm font-semibold text-nextbot-midnight">
            Плати годишно
          </span>
          <AnimatePresence>
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
              >
                Спести {annualSavings} лв
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Price display */}
      <div className="mt-8 flex items-center justify-between border-t border-nextbot-cloud pt-6">
        <div className="text-sm text-gray-600">
          {isAnnual ? "Вашата годишна цена:" : "Вашата месечна цена:"}
        </div>
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="wait">
            <AnimatedPrice value={displayTotal} />
          </AnimatePresence>
          <span className="text-base text-gray-600">
            {isAnnual ? " лв/година" : " лв/месец"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-6 w-full rounded-2xl bg-nextbot-midnight text-white hover:bg-nextbot-ocean"
        iconRight={
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
        }
      >
        Започни с тази конфигурация
      </Button>
    </motion.div>
  );
}
