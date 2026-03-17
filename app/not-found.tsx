import Link from "next/link";
import { Button } from "@/components/ui/button-legacy";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 bg-nb-cream"
    >
      <div className="text-center">
        {/* 404 */}
        <h1
          className="mb-4 text-[clamp(6rem,15vw,12rem)] font-bold leading-none"
          style={{
            background: "linear-gradient(135deg, #0A1628 0%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-bold text-nb-navy max-md:text-xl">
          Страницата не е намерена
        </h2>
        <p className="mb-8 text-lg text-nb-text-secondary">
          Изглежда тази страница не съществува или е преместена.
        </p>

        {/* CTA */}
        <Link href="/">
          <Button
            size="lg"
            className="rounded-full bg-nb-navy text-nb-cream hover:bg-nb-navy-mid"
          >
            Обратно към началото
          </Button>
        </Link>
      </div>
    </div>
  );
}
