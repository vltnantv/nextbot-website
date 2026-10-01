import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { COMPANY, telHref } from '@/lib/company'
import { LEGAL } from '@/lib/site-nav'

// Layout from design/homepage-mockup.html: company · Продукти · Контакти · Правни.
const FOOTER_PRODUCTS = [
  { label: 'Изработка на сайт', href: '/izrabotka-na-sait' }, // TODO step 5
  { label: 'NEO', href: '/neo' },
  { label: 'CORE', href: '/core' }, // TODO step 5
  { label: 'ECHO', href: '/echo' }, // TODO step 5
]

const link = 'text-stone no-underline transition-colors hover:text-ink'

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line pb-12 pt-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-6 text-[14px] text-stone">
        <div className="flex flex-col gap-2">
          <Link href="/" aria-label="nextbot — начало" className="self-start">
            <Logo size={19} />
          </Link>
          <span>
            {COMPANY.name} · ЕИК {COMPANY.eik}
          </span>
          <span>{COMPANY.address ? `${COMPANY.address}, ${COMPANY.city}` : COMPANY.city}</span>
        </div>

        <nav aria-label="Продукти" className="flex flex-col gap-2">
          <span className="font-medium text-ink">Продукти</span>
          {FOOTER_PRODUCTS.map((p) => (
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
