import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/LogoMark";

type LogoProps = {
  className?: string;
  /** Font size of the word mark in px (header 23, footer 19 - as in the mockup). */
  size?: number;
};

/**
 * Mark (arrow in a circle) + word mark: "nextbot" in lower case (Geologica 600, ink).
 * Proportions from design/homepage-mockup.html: 23 px word, mark 1.15× the word size.
 */
export function Logo({ className, size = 23 }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center font-display font-semibold leading-none tracking-[-0.02em] text-ink", className)}
      style={{ fontSize: size, gap: Math.round(size * 0.3) }}
      aria-label="nextbot"
    >
      <LogoMark size={Math.round(size * 1.15)} className="mr-[0.05em]" />
      <span aria-hidden="true">nextbot</span>
    </span>
  );
}
