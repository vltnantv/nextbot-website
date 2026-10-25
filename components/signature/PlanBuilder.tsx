"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import {
  CORE_EXTRA_SEAT,
  ECHO_ADDON,
  PLANS,
  PRO_FROM,
  eur,
  type Plan,
} from "@/lib/prices";
import { CTA } from "@/lib/site-nav";
import { BTN_PRIMARY } from "@/components/home/ui";
import { saveNote } from "@/components/forms/note";

// /ceni signature (REBUILD-PLAN.md §6): what you need, people in the system, ECHO. Shows which plan fits and the
// monthly total - every number from lib/prices.ts. Both products -> CORE + NEO (ECHO included); the system alone
// -> CORE (+ a seat price above 3 people, Про above 10); the assistant alone -> NEO. ECHO „Да“ adds the add-on
// to CORE or NEO. „Запазете разговор“ carries the choice to /razgovor as a note.

type Need = "neo" | "core" | "both";
type People = 3 | 10 | 11;

const plan = (id: Plan["id"]) => PLANS.find((p) => p.id === id)!;

function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[15px] font-medium">{label}</span>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-11 rounded-full border px-[18px] py-2.5 text-[15px] font-medium transition-colors ${
                on
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Fit = {
  key: string;
  name: string;
  monthly: number;
  from?: boolean;
  setup: string;
  note?: string;
};

function fitFor(need: Need, people: People, echo: boolean): Fit {
  if (need !== "neo" && people > 10) {
    return {
      key: "pro",
      name: "Про",
      monthly: PRO_FROM,
      from: true,
      setup: "по договаряне",
      note: "Няколко обекта, повече хора, връзки с програмите ви.",
    };
  }
  if (need === "both") {
    const p = plan("bundle");
    return {
      key: p.id,
      name: p.name,
      monthly: p.monthly,
      setup: eur(p.setup),
      note: `До ${p.seats} души, ECHO включен.`,
    };
  }
  const p = plan(need);
  // people above the plan's seats (only CORE has seats)
  const extra =
    need === "core" && p.seats !== null && people > p.seats
      ? (people - p.seats) * CORE_EXTRA_SEAT
      : 0;
  const notes = [
    extra ? `+${eur(extra)} за ${people - p.seats!} души над ${p.seats}` : null,
    echo ? `+${eur(ECHO_ADDON)} за ECHO` : null,
  ].filter(Boolean);
  const bundle = plan("bundle");
  // honest hint: with many people the bundle costs less than CORE alone
  if (
    need === "core" &&
    p.monthly + extra + (echo ? ECHO_ADDON : 0) > bundle.monthly
  )
    notes.push(
      `${bundle.name} е ${eur(bundle.monthly)} с до ${bundle.seats} души`,
    );
  return {
    key: `${p.id}-${people}-${echo}`,
    name: echo ? `${p.name} + ECHO` : p.name,
    monthly: p.monthly + extra + (echo ? ECHO_ADDON : 0),
    setup: eur(p.setup),
    note: notes.length ? notes.join(" · ") : undefined,
  };
}

export function PlanBuilder() {
  const reduce = useReducedMotion();
  const [need, setNeed] = useState<Need>("both");
  const [people, setPeople] = useState<People>(3);
  const [echo, setEcho] = useState<"no" | "yes">("no");

  const fit = fitFor(need, people, echo === "yes");

  const choice = [
    `План: ${fit.name}`,
    need === "neo"
      ? "Асистент за запитвания"
      : need === "core"
        ? "Система за клиенти"
        : "Асистент и система",
    need !== "neo"
      ? `Души: ${people === 3 ? "до 3" : people === 10 ? "до 10" : "повече"}`
      : null,
    echo === "yes" && need !== "both" ? "ECHO" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="grid gap-8 rounded-[28px] border border-line bg-white p-7 shadow-soft sm:p-10 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-6">
        <Choice
          label="Какво ви трябва"
          value={need}
          onChange={setNeed}
          options={[
            { value: "neo", label: "Асистент за запитвания" },
            { value: "core", label: "Система за клиенти" },
            { value: "both", label: "И двете" },
          ]}
        />
        {need !== "neo" && (
          <Choice
            label="Души в системата"
            value={people}
            onChange={setPeople}
            options={[
              { value: 3, label: "до 3" },
              { value: 10, label: "до 10" },
              { value: 11, label: "повече" },
            ]}
          />
        )}
        <Choice
          label="ECHO напомняния"
          value={echo}
          onChange={setEcho}
          options={[
            { value: "no", label: "Не" },
            { value: "yes", label: "Да" },
          ]}
        />
      </div>

      <div
        className="flex flex-col justify-between gap-6 rounded-[20px] bg-cream-deep p-7"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={fit.key}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <span className="font-display text-[28px] font-semibold tracking-[-0.02em]">
              {fit.name}
            </span>
            <span className="flex items-baseline gap-1.5">
              {fit.from && <span className="text-[15px] text-stone">от</span>}
              <span className="font-display text-[44px] font-semibold tracking-[-0.02em]">
                {eur(fit.monthly)}
              </span>
              <span className="text-[15px] text-stone">/месец</span>
            </span>
            <span className="text-[15px] text-stone">
              настройка {fit.setup}
            </span>
            {fit.note && (
              <span className="text-[15px] text-stone">{fit.note}</span>
            )}
          </motion.div>
        </AnimatePresence>
        <Link
          href={CTA.href}
          onClick={() => saveNote(choice)}
          className={`${BTN_PRIMARY} btn-shine self-start px-[26px] py-[15px] text-[16px]`}
        >
          {CTA.label}
        </Link>
      </div>
    </div>
  );
}
