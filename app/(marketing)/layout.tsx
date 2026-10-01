import { Nav } from "@/components/Nav";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/demo/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatWidget
        industry="hotel"
        tone="professional"
        language="bg"
        botName="NEO"
        welcomeMessage="Здравейте! Аз съм NEO, асистентът на NextBot. Питайте ме как работим или ме пробвайте така, както би ви писал клиент."
        quickActions={["Как работи NextBot?", "Пробвай като хотел", "Запазете разговор"]}
        accentColor="#2E5BFF"
      />
    </>
  );
}
