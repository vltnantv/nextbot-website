import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #0A0E27 0%, #1E40AF 60%, #06B6D4 100%)",
      }}
    >
      <div className="text-center">
        {/* 404 */}
        <h1
          className="mb-4 text-[clamp(6rem,15vw,12rem)] font-bold leading-none"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-bold text-white max-md:text-xl">
          Страницата не е намерена
        </h2>
        <p className="mb-8 text-lg text-white/70">
          Изглежда тази страница не съществува или е преместена.
        </p>

        {/* CTA */}
        <Link href="/">
          <Button
            size="lg"
            className="rounded-full bg-white text-nextbot-midnight hover:bg-nextbot-silver"
          >
            Обратно към началото
          </Button>
        </Link>
      </div>
    </div>
  );
}
