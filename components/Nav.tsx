'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from "@/components/brand/Logo";

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
  }, [pathname])

  const openProducts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setProductsOpen(true)
  }
  const closeProducts = () => {
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150)
  }

  return (
    <>
      <nav
        className="nav-bar"
        data-scrolled={scrolled || undefined}
      >
        <div className="nav-inner">
          {/* Left: Logo */}
          <Link href="/" className="nav-logo" aria-label="nextbot — начало" onClick={() => setMenuOpen(false)}>
            {/* light variant until the menu itself is reworked in step 2 */}
            <Logo className="text-white" size={20} />
          </Link>

          {/* Center: Links (desktop) */}
          <div className="nav-links">
            <div
              className="nav-dropdown"
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              <button className="nav-link">
                Products
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div className="nav-dropdown-menu">
                  <Link href="/neo" className="nav-dropdown-item">
                    <div className="nav-dropdown-item-row">
                      <span className="nav-dropdown-item-name">NEO</span>
                      <span className="nav-dropdown-badge">Live</span>
                    </div>
                    <span className="nav-dropdown-item-desc">AI assistant for customer communication</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="nav-link">About</Link>
            <Link href="/#how-it-works" className="nav-link">Process</Link>
          </div>

          {/* Right: CTA + hamburger */}
          <div className="nav-right">
            <Link href="/book-demo" className="btn-primary nav-cta">
              Book a Call
            </Link>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`nav-hamburger-line ${menuOpen ? 'open-1' : ''}`} />
              <span className={`nav-hamburger-line ${menuOpen ? 'open-2' : ''}`} />
              <span className={`nav-hamburger-line ${menuOpen ? 'open-3' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile-overlay">
          <div className="nav-mobile-menu">
            <Link href="/neo" onClick={() => setMenuOpen(false)} className="nav-mobile-link">
              <span>NEO</span>
              <span className="nav-dropdown-badge">Live</span>
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="nav-mobile-link">
              About
            </Link>
            <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="nav-mobile-link">
              Process
            </Link>
            <div style={{ paddingTop: 24 }}>
              <Link
                href="/book-demo"
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 64px;
          padding: 0 40px;
          background: rgba(8, 8, 8, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-border-subtle);
          transition: all 0.3s ease;
        }
        .nav-bar[data-scrolled] {
          background: rgba(8, 8, 8, 0.95);
          border-bottom-color: var(--color-border);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-size: 18px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-size: 14px;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: inherit;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-dropdown {
          position: relative;
        }
        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 6px;
          min-width: 260px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }
        .nav-dropdown-item {
          display: flex;
          flex-direction: column;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .nav-dropdown-item:hover {
          background: var(--color-surface-2);
        }
        .nav-dropdown-item-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-dropdown-item-name {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        .nav-dropdown-badge {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(249, 115, 22, 0.15);
          color: var(--color-accent);
        }
        .nav-dropdown-item-desc {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-cta {
          padding: 10px 20px !important;
          font-size: 14px !important;
        }
        .nav-hamburger {
          display: none;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .nav-hamburger-line {
          display: block;
          width: 18px;
          height: 1.5px;
          background: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .nav-hamburger-line.open-1 {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav-hamburger-line.open-2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger-line.open-3 {
          transform: translateY(-6.5px) rotate(-45deg);
        }
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: var(--color-bg);
          padding-top: 64px;
        }
        .nav-mobile-menu {
          padding: 32px 24px;
        }
        .nav-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid var(--color-border);
          font-size: 18px;
          font-weight: 500;
          color: white;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .nav-bar {
            padding: 0 20px;
          }
          .nav-links {
            display: none;
          }
          .nav-cta {
            display: none !important;
          }
          .nav-hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
