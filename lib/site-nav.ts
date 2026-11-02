// Site structure from BRAND.md. Menu and footer read from here so they never drift apart.
// /aria and /studio are hidden for now: not in the menu, footer or sitemap, and noindex (the pages still work).

export type NavItem = { label: string; href: string; description?: string; badge?: string };

export const PRODUCTS: NavItem[] = [
  { label: "WEB", href: "/izrabotka-na-sait", description: "Изработка на уебсайт" },
  { label: "NEO", href: "/neo", description: "Чат асистент в сайта и съобщенията" },
  { label: "CORE", href: "/core", description: "Всички клиенти на едно място" },
  { label: "ECHO", href: "/echo", description: "Повторни клиенти и отзиви" },
];

export const SOLUTIONS: NavItem[] = [
  { label: "Автокъщи и сервизи", href: "/za/avtokashti" },
  { label: "Клиники и салони", href: "/za/kliniki" },
  { label: "Имоти", href: "/za/imoti" },
  { label: "Хотели и ресторанти", href: "/za/hoteli" },
];

export const MAIN_LINKS: NavItem[] = [
  { label: "Цени", href: "/ceni" },
  { label: "Демо", href: "/demo" },
  { label: "За нас", href: "/za-nas" },
];

/** Main call to action. */
export const CTA: NavItem = { label: "Запазете разговор", href: "/razgovor" };

export const LEGAL: NavItem[] = [
  { label: "Поверителност", href: "/poveritelnost" },
  { label: "Общи условия", href: "/usloviya" },
  { label: "Бисквитки", href: "/biskvitki" },
];
