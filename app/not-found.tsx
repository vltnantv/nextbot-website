import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-nb-bg">
      <div className="text-center">
        <h1
          className="mb-4 text-[clamp(6rem,15vw,12rem)] font-bold leading-none"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <h2 className="mb-3 text-2xl font-bold text-white max-md:text-xl">
          Страницата не е намерена
        </h2>
        <p className="mb-8 text-lg text-nb-text-secondary">
          Изглежда тази страница не съществува или е преместена.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-7 text-base font-medium rounded-xl bg-nb-accent text-white hover:bg-nb-accent-hover transition-colors"
        >
          Обратно към началото
        </Link>
      </div>
    </div>
  );
}
