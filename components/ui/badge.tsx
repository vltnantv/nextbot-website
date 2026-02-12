import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-nextbot-cyan/30 bg-nextbot-cyan/10 px-3 py-1 text-xs font-medium text-nextbot-cyan",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
