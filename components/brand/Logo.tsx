import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Size in px of the old word mark's text (header 23, footer 19); the mark is drawn a bit larger. */
  size?: number;
};

/**
 * The logo: the arrow in the circle (public/logo-mark.png, from public/logo-icon.png). It is used as a mask,
 * so it takes the text colour (ink) on any background.
 */
export function Logo({ className, size = 23 }: LogoProps) {
  const side = Math.round(size * 1.4);
  return (
    <span
      role="img"
      aria-label="nextbot"
      className={cn("inline-block shrink-0 bg-ink align-middle", className)}
      style={{
        width: side,
        height: side,
        WebkitMaskImage: "url(/logo-mark.png)",
        maskImage: "url(/logo-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
