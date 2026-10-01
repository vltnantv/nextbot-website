"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

// The dashboard and the login/register pages were built for the dark theme only,
// so they are always dark. The marketing site follows the visitor's system setting.
const ALWAYS_DARK = [
  "/overview",
  "/conversations",
  "/leads",
  "/knowledge",
  "/automations",
  "/booking",
  "/analytics",
  "/channels",
  "/settings",
  "/login",
  "/register",
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const forceDark = ALWAYS_DARK.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={forceDark ? "dark" : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
