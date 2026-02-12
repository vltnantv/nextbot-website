import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes without conflicts.
 * Combines clsx conditional logic with tailwind-merge deduplication.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Bulgarian lev currency.
 * @example formatPrice(2850) → "2 850 лв"
 */
export function formatPrice(amount: number, currency = "лв"): string {
  const formatted = new Intl.NumberFormat("bg-BG", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} ${currency}`;
}

/**
 * Format a raw stat value for display.
 * Numbers get locale formatting; strings pass through unchanged.
 * @example formatStat("22h") → "22h"
 * @example formatStat(94, "%") → "94%"
 */
export function formatStat(
  value: number | string,
  suffix = "",
): string {
  if (typeof value === "string") return value;
  return `${new Intl.NumberFormat("bg-BG").format(value)}${suffix}`;
}

/**
 * Smooth-scroll to a DOM element by its ID.
 * Strips leading "#" if present.
 */
export function scrollToSection(sectionId: string): void {
  const id = sectionId.startsWith("#") ? sectionId.slice(1) : sectionId;
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
