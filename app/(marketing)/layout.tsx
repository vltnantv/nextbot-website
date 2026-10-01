import { Nav } from "@/components/Nav";
import { Footer } from "@/components/layout/footer";
import { SiteChat } from "@/components/demo/SiteChat";
import { Blobs } from "@/components/motion/Blobs";

// Page frame from design/homepage-mockup.html: cream background, 17 px text, blobs drifting behind.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-clip bg-cream text-[17px] leading-[1.6] text-ink">
      <Blobs />
      <Nav />
      <main className="relative z-[1]">{children}</main>
      <Footer />
      <SiteChat />
    </div>
  );
}
