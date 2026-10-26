// Contact details, shown in the footer and on /za-nas.
// No company yet: name, ЕИК and address are NOT shown anywhere until there is one (Valentin, 01.10.2026).
// [ПОТВЪРДИ] copy/ceni-zanas-razgovor.md „Фирмени данни“: наименование, ЕИК, адрес - add here once they exist.
export const COMPANY = {
  email: "info@nextbot.me",
  /** TO CONFIRM (BRAND.md open question) */
  phone: "+359 894 288 119",
  /** Viber on the same number (confirmed by Valentin). null would hide the Viber links. */
  viber: "+359 894 288 119" as string | null,
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Opens a Viber chat. The number must keep its "+", encoded as %2B. */
export const viberHref = (phone: string) => `viber://chat?number=${encodeURIComponent(phone.replace(/\s/g, ""))}`;

/** Shown when a form cannot reach us (no RESEND_API_KEY or the send failed), so the visitor still has a way. */
export const FORM_DOWN = `Формата временно не работи. Обадете се на ${COMPANY.phone} или пишете на ${COMPANY.email}.`;
