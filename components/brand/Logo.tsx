import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/brand/LiveDot";

type LogoProps = {
  className?: string;
  /** Font size of the word mark in px (header 23, footer 19 - as in the mockup). */
  size?: number;
};

/**
 * Word mark: "nextbot" in lower case (Geologica 600, ink) and the green "online" dot that breathes.
 * Proportions from design/homepage-mockup.html: 23 px word, 9 px dot, 7 px gap, dot slightly low.
 */
export function Logo({ className, size = 23 }: LogoProps) {
  const dot = Math.round(size * 0.39);
  return (
    <span
      className={cn("inline-flex items-center font-display font-semibold leading-none tracking-[-0.02em] text-ink", className)}
      style={{ fontSize: size, gap: Math.round(size * 0.3) }}
      aria-label="nextbot"
    >
      <span aria-hidden="true">nextbot</span>
      <LiveDot style={{ width: dot, height: dot, marginTop: Math.round(size * 0.26) }} />
    </span>
  );
}
