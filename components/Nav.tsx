'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/utils'
import { CTA, MAIN_LINKS, PRODUCTS, SOLUTIONS, type NavItem } from '@/lib/site-nav'

type MenuKey = 'products' | 'solutions'

function Dropdown({
  id,
  label,
  items,
  open,
  onOpen,
  onClose,
}: {
  id: MenuKey
  label: string
  items: NavItem[]
  open: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const panelId = `nav-${id}`
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-[15px] text-ink/80 transition-colors hover:text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        className={cn(
          'absolute left-0 top-full pt-2 transition-opacity',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul className="w-72 rounded-card border border-line bg-white p-2 shadow-soft">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-start justify-between gap-3 rounded-md px-3 py-2.5 hover:bg-cream-deep focus-visible:bg-cream-deep"
              >
                <span>
                  <span className="block text-[15px] font-medium text-ink">{item.label}</span>
                  {item.description && <span className="mt-0.5 block text-[13px] text-stone">{item.description}</span>}
                </span>
                {item.badge && (
                  <span className="mt-0.5 shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] text-stone">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState<MenuKey | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setOpen(null)
  }, [pathname])

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(key)
  }
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors',
        scrolled || mobileOpen ? 'border-line bg-cream/90 backdrop-blur' : 'border-transparent bg-cream/70 backdrop-blur',
      )}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Основно меню">
        <Link href="/" aria-label="nextbot — начало" className="rounded-md">
          <Logo size={20} />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <Dropdown
            id="products"
            label="Продукти"
            items={PRODUCTS}
            open={open === 'products'}
            onOpen={() => openMenu('products')}
            onClose={closeMenu}
          />
          <Dropdown
            id="solutions"
            label="Решения"
            items={SOLUTIONS}
            open={open === 'solutions'}
            onOpen={() => openMenu('solutions')}
            onClose={closeMenu}
          />
          {MAIN_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-[15px] transition-colors hover:text-ink',
                pathname === item.href ? 'text-ink' : 'text-ink/80',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={CTA.href}
            className="hidden rounded-full bg-ink px-4 py-2.5 text-[15px] font-medium text-cream transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {CTA.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            aria-label={mobileOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <div id="nav-mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-cream px-4 pb-10 pt-4 lg:hidden">
          {[
            { title: 'Продукти', items: PRODUCTS },
            { title: 'Решения', items: SOLUTIONS },
          ].map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 text-[13px] font-medium uppercase tracking-wide text-stone">{group.title}</p>
              <ul className="divide-y divide-line rounded-card border border-line bg-white">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex items-center justify-between px-4 py-3 text-[16px] text-ink">
                      {item.label}
                      {item.badge && <span className="text-[12px] text-stone">{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="mb-6 divide-y divide-line rounded-card border border-line bg-white">
            {MAIN_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block px-4 py-3 text-[16px] text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={CTA.href}
            className="flex w-full justify-center rounded-full bg-ink px-4 py-3 text-[16px] font-medium text-cream"
          >
            {CTA.label}
          </Link>
        </div>
      )}
    </header>
  )
}
