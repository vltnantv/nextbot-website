import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { COMPANY, telHref } from '@/lib/company'
import { CTA, LEGAL, MAIN_LINKS, PRODUCTS, SOLUTIONS, type NavItem } from '@/lib/site-nav'

function Column({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <p className="mb-3 text-[13px] font-medium uppercase tracking-wide text-ash">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[15px] text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink/10 bg-sheet">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="nextbot — начало" className="inline-block">
              <Logo size={20} />
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ash">
              Всеки клиент получава отговор. Веднага.
            </p>
            <div className="mt-5 space-y-1.5 text-[15px]">
              <a href={`mailto:${COMPANY.email}`} className="block text-ink/80 hover:text-ink">
                {COMPANY.email}
              </a>
              <a href={telHref(COMPANY.phone)} className="block text-ink/80 hover:text-ink">
                {COMPANY.phone}
              </a>
              {COMPANY.viber && (
                <a href={`viber://chat?number=${COMPANY.viber.replace(/[\s+]/g, '')}`} className="block text-ink/80 hover:text-ink">
                  Viber
                </a>
              )}
            </div>
            <Link
              href={CTA.href}
              className="mt-6 inline-flex rounded-[10px] bg-signal px-4 py-2.5 text-[15px] font-medium text-white hover:opacity-90 dark:text-paper"
            >
              {CTA.label}
            </Link>
          </div>
          <Column title="Продукти" items={PRODUCTS} />
          <Column title="Решения" items={SOLUTIONS} />
          <Column title="Компания" items={MAIN_LINKS} />
        </div>

        <div className="flex flex-col gap-4 border-t border-ink/10 py-6 text-[13px] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              © {year} {COMPANY.name}
            </span>
            <span>ЕИК {COMPANY.eik}</span>
            <span>ДДС {COMPANY.vat}</span>
            <span>{COMPANY.address ? `${COMPANY.address}, ${COMPANY.city}` : COMPANY.city}</span>
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
