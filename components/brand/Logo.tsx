import { cn } from "@/lib/utils";

type LogoProps = {
  /** Text colour. Defaults to the ink token, which flips automatically in dark theme. */
  className?: string;
  /** Font size of the word mark in px. */
  size?: number;
};

/**
 * Word mark: "nextbot" in lower case (Geologica 600) followed by the green "online" dot.
 * The dot uses the `online` token, which is reserved for exactly this meaning.
 */
export function Logo({ className, size = 20 }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-baseline font-display font-semibold leading-none tracking-tight text-ink", className)}
      style={{ fontSize: size }}
      aria-label="nextbot"
    >
      <span aria-hidden="true">nextbot</span>
      <span
        aria-hidden="true"
        className="ml-[0.12em] inline-block rounded-full bg-online"
        style={{ width: "0.3em", height: "0.3em" }}
      />
    </span>
  );
}
