import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { COMPANY, telHref } from '@/lib/company'
import { DEVELOPMENT, LEGAL, PRODUCTS } from '@/lib/site-nav'

// Layout from design/homepage-mockup.html: logo · Продукти · Разработка · Контакти · Правни.
// No company name, ЕИК or address until there is a company - only email and phone.
const FOOTER_PRODUCTS = PRODUCTS.filter((p) => !p.badge)

const link = 'text-stone no-underline transition-colors hover:text-ink'

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line pb-12 pt-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-6 text-[14px] text-stone">
        <div className="flex flex-col gap-2">
          <Link href="/" aria-label="nextbot — начало" className="self-start">
            <Logo size={19} />
          </Link>
          <span className="max-w-[26ch] text-[14px] text-stone">Софтуерна компания от София. Готови продукти и разработка по поръчка.</span>
          <a href="https://app.nextbot.me/vhod" className={link}>
            Вход за клиенти
          </a>
        </div>

        <nav aria-label="Продукти" className="flex flex-col gap-2">
          <span className="font-medium text-ink">Продукти</span>
          {FOOTER_PRODUCTS.map((p) => (
            <Link key={p.href} href={p.href} className={link}>
              {p.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Разработка" className="flex flex-col gap-2">
          <span className="font-medium text-ink">Разработка</span>
          {DEVELOPMENT.map((p) => (
            <Link key={p.href} href={p.href} className={link}>
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-ink">Контакти</span>
          <a href={telHref(COMPANY.phone)} className={link}>
            {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className={link}>
            {COMPANY.email}
          </a>
        </div>

        <nav aria-label="Правни" className="flex flex-col gap-2">
          <span className="font-medium text-ink">Правни</span>
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href} className={link}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
