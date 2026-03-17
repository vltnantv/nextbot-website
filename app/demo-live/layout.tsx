import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neo Live Demo — NextBot AI Platform",
  description: "Interactive demo of Neo AI assistant for hotels and businesses.",
  robots: { index: false, follow: false },
};

export default function DemoLiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
