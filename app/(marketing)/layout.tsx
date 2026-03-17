import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/demo/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget
        industry="hotel"
        tone="professional"
        language="en"
        botName="Neo"
        welcomeMessage="Hi! I'm Neo, the NextBot AI assistant. Ask me anything about our platform, or try me out as a hotel concierge, restaurant assistant, or any business type!"
        quickActions={["How does NextBot work?", "Try hotel demo", "See pricing", "Book a demo"]}
        accentColor="#C9A84C"
      />
    </>
  );
}
