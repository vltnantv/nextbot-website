// Company and contact details, shown in the footer and on contact pages.
// Values come from the previous site; BRAND.md lists them as "to confirm" - check before going live.
export const COMPANY = {
  name: "Nextbot EOOD",
  eik: "207218192",
  vat: "BG207218192",
  city: "София",
  /** Street address: not known yet. Shown only when filled in. */
  address: null as string | null,
  email: "info@nextbot.me",
  /** TO CONFIRM (BRAND.md open question) */
  phone: "+359 894 288 119",
  /** Viber uses the same number only once confirmed; null hides the Viber link. */
  viber: null as string | null,
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
