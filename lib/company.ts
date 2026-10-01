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
  /** Viber on the same number (confirmed by Valentin). null would hide the Viber links. */
  viber: "+359 894 288 119" as string | null,
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Opens a Viber chat. The number must keep its "+", encoded as %2B. */
export const viberHref = (phone: string) => `viber://chat?number=${encodeURIComponent(phone.replace(/\s/g, ""))}`;
