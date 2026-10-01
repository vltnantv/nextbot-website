import { Nav } from "@/components/Nav";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/demo/ChatWidget";
import { Blobs } from "@/components/motion/Blobs";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Blobs />
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
        accentColor="#1F1D1A"
      />
    </>
  );
}
