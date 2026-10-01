// Site structure from BRAND.md. Menu and footer read from here so they never drift apart.
// Pages marked TODO are built in step 5; until then those links lead to a 404.

export type NavItem = { label: string; href: string; description?: string; badge?: string };

export const PRODUCTS: NavItem[] = [
  { label: "WEB", href: "/izrabotka-na-sait", description: "Изработка на уебсайт" }, // TODO step 5
  { label: "NEO", href: "/neo", description: "Чат асистент в сайта и съобщенията" },
  { label: "ARIA", href: "/aria", description: "Гласов асистент, който вдига телефона", badge: "Скоро" },
  { label: "CORE", href: "/core", description: "Всички клиенти на едно място" }, // TODO step 5
  { label: "ECHO", href: "/echo", description: "Повторни клиенти и отзиви" }, // TODO step 5
  { label: "STUDIO", href: "/studio", description: "Изработка по поръчка" }, // TODO step 5
];

export const SOLUTIONS: NavItem[] = [
  { label: "Автокъщи и сервизи", href: "/za/avtokashti" }, // TODO step 5
  { label: "Клиники", href: "/za/kliniki" }, // TODO step 5
  { label: "Имоти", href: "/za/imoti" }, // TODO step 5
  { label: "Хотели и ресторанти", href: "/za/hoteli" }, // TODO step 5
];

export const MAIN_LINKS: NavItem[] = [
  { label: "Цени", href: "/ceni" }, // TODO step 3/5
  { label: "Демо", href: "/demo" },
  { label: "За нас", href: "/za-nas" }, // TODO step 5
];

/** Main call to action. /razgovor comes in step 5; until then the existing booking page. */
export const CTA: NavItem = { label: "Запазете разговор", href: "/book-demo" };

export const LEGAL: NavItem[] = [
  { label: "Поверителност", href: "/poveritelnost" }, // TODO step 5
  { label: "Общи условия", href: "/usloviya" }, // TODO step 5
  { label: "Бисквитки", href: "/biskvitki" }, // TODO step 5
];
