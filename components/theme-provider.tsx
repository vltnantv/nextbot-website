"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// The site follows the visitor's system setting (light or dark).
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
