// Site structure from BRAND.md. Menu and footer read from here so they never drift apart.

export type NavItem = { label: string; href: string; description?: string; badge?: string };

/** Ready products: name + what it is, in one line. */
export const PRODUCTS: NavItem[] = [
  { label: "CORE", href: "/core", description: "Клиенти и продажби на едно място" },
  { label: "NEO", href: "/neo", description: "Асистент за запитвания в сайта и съобщенията" },
  { label: "ECHO", href: "/echo", description: "Напомняния за час и отзиви в Google" },
  { label: "ARIA", href: "/aria", description: "Гласов асистент, който вдига телефона", badge: "Скоро" },
];

/** Development to order. */
export const DEVELOPMENT: NavItem[] = [
  { label: "Разработка по поръчка", href: "/razrabotka", description: "Какво правим и как работим" },
  { label: "Сайтове и онлайн магазини", href: "/izrabotka-na-sait", description: "Бърз сайт на български, с асистент от първия ден" },
  { label: "Системи и автоматизации", href: "/studio", description: "Софтуер за вашия процес, връзки между програми" },
];

export const SOLUTIONS: NavItem[] = [
  { label: "Автокъщи и сервизи", href: "/za/avtokashti" },
  { label: "Клиники и салони", href: "/za/kliniki" },
  { label: "Имоти", href: "/za/imoti" },
  { label: "Хотели и ресторанти", href: "/za/hoteli" },
];

export const MAIN_LINKS: NavItem[] = [
  { label: "Цени", href: "/ceni" },
  { label: "Пробвайте", href: "/demo" },
  { label: "За нас", href: "/za-nas" },
];

/** Main call to action. */
export const CTA: NavItem = { label: "Запазете разговор", href: "/razgovor" };

export const LEGAL: NavItem[] = [
  { label: "Поверителност", href: "/poveritelnost" },
  { label: "Общи условия", href: "/usloviya" },
  { label: "Бисквитки", href: "/biskvitki" },
];
