"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/** Spinner shown while the button is in its loading state. */
function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Variant / size maps
// ---------------------------------------------------------------------------

const variantStyles = {
  /** White background, dark text — hero & primary CTAs */
  primary: [
    "bg-white text-nextbot-midnight font-semibold",
    "shadow-apple hover:shadow-lg",
    "hover:bg-nextbot-silver active:bg-nextbot-cloud",
    "transition-all duration-200",
  ].join(" "),

  /** Transparent with border — secondary CTAs */
  secondary: [
    "border border-nextbot-cloud/20 bg-white/5 text-nextbot-silver",
    "backdrop-blur-sm",
    "hover:border-nextbot-cyan/40 hover:bg-white/10",
    "active:bg-white/[0.15]",
    "transition-all duration-200",
  ].join(" "),

  /** No background — nav links & tertiary actions */
  ghost: [
    "text-nextbot-cloud",
    "hover:text-white hover:bg-white/5",
    "active:bg-white/10",
    "transition-colors duration-200",
  ].join(" "),
} as const;

const sizeStyles = {
  sm: "h-8 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-7 text-base gap-2.5 rounded-xl",
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: keyof typeof variantStyles;
  /** Size preset */
  size?: keyof typeof sizeStyles;
  /** Render as child element (Radix Slot) for composition */
  asChild?: boolean;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element rendered before children */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after children */
  iconRight?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nextbot-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-nextbot-midnight",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && <Spinner />}
        {!loading && iconLeft}
        {children}
        {!loading && iconRight}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button };
