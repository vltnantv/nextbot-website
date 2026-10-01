import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CTA } from "@/lib/site-nav";

export const metadata = { title: "Страницата не е намерена" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-cream px-6 text-center text-ink">
      <Link href="/" aria-label="nextbot — начало">
        <Logo size={23} />
      </Link>
      <div className="flex max-w-[520px] flex-col items-center gap-4">
        <p className="font-display text-[clamp(64px,12vw,120px)] font-semibold leading-none tracking-[-0.02em] text-stone">404</p>
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-semibold leading-[1.12] tracking-[-0.02em]">
          Тази страница я няма.
        </h1>
        <p className="m-0 text-[17px] text-stone">Може адресът да е сгрешен или страницата да е преместена.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-transform hover:-translate-y-px">
          Към началото
        </Link>
        <Link href={CTA.href} className="rounded-full border border-[#D9D0C2] px-6 py-3.5 font-medium text-ink transition-transform hover:-translate-y-px">
          {CTA.label}
        </Link>
      </div>
    </main>
  );
}
