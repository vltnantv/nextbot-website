"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  SITE_CONFIG,
  SOCIAL_LINKS,
  FOOTER_PRODUCTS,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  CONTACT_INFO,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

// ---------------------------------------------------------------------------
// SVG Icons (inline, no external deps)
// ---------------------------------------------------------------------------

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

/** Section heading — uppercase, tracked, 14px semibold */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[14px] font-semibold uppercase tracking-[0.05em] text-white">
      {children}
    </h3>
  );
}

/** Footer link with hover translateX animation */
function FooterLinkItem({ link }: { link: FooterLink }) {
  const isExternal = link.external || link.href.startsWith("http");

  return (
    <li>
      <Link
        href={link.href}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="inline-block text-[14px] leading-8 text-white/70 transition-all duration-200 ease-out hover:translate-x-1 hover:text-white"
      >
        {link.label}
      </Link>
    </li>
  );
}

/** Social icon button with hover cyan + scale */
function SocialIcon({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="text-white/70 transition-all duration-300 hover:scale-110 hover:text-nextbot-cyan"
    >
      {children}
    </a>
  );
}

/** Newsletter signup form */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setSubmitted(true);
      setEmail("");
    },
    [email],
  );

  return (
    <div className="mt-6">
      <SectionHeading>Бюлетин</SectionHeading>
      <p className="mb-3 text-[13px] text-white/50">
        Получавайте новини за AI автоматизация.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-nextbot-cyan"
          >
            Благодарим! Ще се свържем скоро.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex gap-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email за бюлетин"
              className="h-9 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-[13px] text-white placeholder-white/30 outline-none transition-colors focus:border-nextbot-cyan/50"
            />
            <Button
              type="submit"
              size="sm"
              className="shrink-0 rounded-lg"
            >
              Запиши се
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Scroll to top button — appears after 400px scroll */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Нагоре"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-nextbot-midnight/90 text-white/70 shadow-glass backdrop-blur-sm transition-colors hover:border-nextbot-cyan/30 hover:text-nextbot-cyan"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function Footer() {
  return (
    <>
      <footer
        className="border-t border-white/10 bg-nextbot-midnight pt-20 pb-10 max-[480px]:pt-10"
        role="contentinfo"
      >
        <Container>
          {/* ================================================================
              Main grid — 3 cols desktop, 2 cols tablet, 1 col mobile
              ================================================================ */}
          <div className="grid gap-12 md:grid-cols-3 max-[768px]:grid-cols-1 max-[480px]:text-center">
            {/* ── Left: Brand ── */}
            <div className="max-[480px]:flex max-[480px]:flex-col max-[480px]:items-center">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-nextbot-cyan to-nextbot-ocean">
                  <span className="text-[11px] font-bold leading-none text-white">N</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  {SITE_CONFIG.name}
                </span>
              </Link>

              {/* Tagline */}
              <p className="mt-2 text-[14px] font-medium tracking-wide text-nextbot-cyan">
                {SITE_CONFIG.tagline}
              </p>

              {/* Description */}
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/60">
                Изграждаме интелигентни AI решения, които автоматизират
                ежедневните операции на бизнеса ви — от хотелски резервации
                до клиентска поддръжка и контрол на качеството.
              </p>

              {/* Newsletter */}
              <NewsletterForm />
            </div>

            {/* ── Center: Link columns ── */}
            <div className="grid grid-cols-2 gap-8 max-[480px]:gap-10">
              {/* Products */}
              <nav aria-label="Продукти">
                <SectionHeading>Продукти</SectionHeading>
                <ul className="space-y-0">
                  {FOOTER_PRODUCTS.map((link) => (
                    <FooterLinkItem key={link.label} link={link} />
                  ))}
                </ul>
              </nav>

              {/* Company */}
              <nav aria-label="Компания">
                <SectionHeading>Компания</SectionHeading>
                <ul className="space-y-0">
                  {FOOTER_COMPANY.map((link) => (
                    <FooterLinkItem key={link.label} link={link} />
                  ))}
                </ul>
              </nav>
            </div>

            {/* ── Right: Contact + Social ── */}
            <div className="max-[480px]:flex max-[480px]:flex-col max-[480px]:items-center">
              {/* Contact */}
              <nav aria-label="Контакти">
                <SectionHeading>Свържете се</SectionHeading>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                    >
                      <EnvelopeIcon className="h-4 w-4 shrink-0" />
                      {CONTACT_INFO.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0" />
                      {CONTACT_INFO.phone}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2 text-[14px] text-white/70">
                    <MapPinIcon className="h-4 w-4 shrink-0" />
                    {CONTACT_INFO.address}
                  </li>
                </ul>
              </nav>

              {/* Social */}
              <div className="mt-8">
                <SectionHeading>Следвайте ни</SectionHeading>
                <div className="flex gap-4 max-[480px]:justify-center">
                  <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                    <LinkedInIcon className="h-6 w-6" />
                  </SocialIcon>
                  <SocialIcon
                    href={SOCIAL_LINKS.email}
                    label="Изпрати имейл"
                    external={false}
                  >
                    <EnvelopeIcon className="h-6 w-6" />
                  </SocialIcon>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              Bottom bar
              ================================================================ */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 max-[768px]:flex-col max-[768px]:text-center">
            {/* Left — copyright */}
            <p className="text-[12px] text-white/50">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name} EOOD.
              Всички права запазени.
            </p>

            {/* Center — legal links */}
            <div className="flex gap-6">
              {FOOTER_LEGAL.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[12px] text-white/50 transition-colors duration-200 hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right — made in Bulgaria */}
            <p className="text-[12px] text-white/50">
              Направено с{" "}
              <span className="text-red-500" aria-label="любов">
                &#10084;
              </span>{" "}
              в България
            </p>
          </div>
        </Container>
      </footer>

      <ScrollToTop />
    </>
  );
}
