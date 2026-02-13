"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NEO_NAV_LINKS } from "@/lib/neo-constants";
import { cn, scrollToSection } from "@/lib/utils";

type NavLink = { label: string; href: string };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCROLL_THRESHOLD = 100;

const navTransition = {
  type: "tween" as const,
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

// ---------------------------------------------------------------------------
// Skip-to-content
// ---------------------------------------------------------------------------

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-full rounded-lg bg-nextbot-midnight px-4 py-2 text-sm font-medium text-white opacity-0 ring-2 ring-nextbot-cyan transition-all focus:translate-y-0 focus:opacity-100"
    >
      Skip to content
    </a>
  );
}

// ---------------------------------------------------------------------------
// Desktop nav link
// ---------------------------------------------------------------------------

function NavItem({
  link,
  active,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  onClick: (href: string) => void;
}) {
  return (
    <li>
      <button
        onClick={() => onClick(link.href)}
        className={cn(
          "group relative text-[14px] font-normal leading-none transition-opacity duration-200",
          active ? "text-nextbot-midnight" : "text-nextbot-midnight/80",
          "hover:opacity-60",
        )}
      >
        {link.label}
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-[2px] bg-nextbot-cyan transition-all duration-300 ease-out",
            active ? "w-full" : "w-0 group-hover:w-full",
          )}
        />
      </button>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------

function MobileMenu({
  open,
  links,
  activeSection,
  onNavigate,
  onClose,
}: {
  open: boolean;
  links: NavLink[];
  activeSection: string;
  onNavigate: (href: string) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-40 flex items-start justify-center bg-white/95 pt-24 backdrop-blur-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={navTransition}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      onNavigate(link.href);
                      onClose();
                    }}
                    className={cn(
                      "text-lg font-normal transition-opacity hover:opacity-60",
                      activeSection === link.href
                        ? "text-nextbot-midnight"
                        : "text-nextbot-midnight/70",
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-4">
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => {
                    onNavigate("#contact");
                    onClose();
                  }}
                >
                  Започни пилот
                </Button>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll visibility — simple scroll listener
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const ids = NEO_NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SkipToContent />

      <AnimatePresence>
        {visible && (
          <motion.header
            className="fixed left-0 right-0 top-0 z-50"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={navTransition}
          >
            <nav
              aria-label="Main navigation"
              className="border-b border-black/[0.08] bg-white/80 backdrop-blur-[20px]"
            >
              <Container>
                <div className="flex h-12 items-center justify-between">
                  <button
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 transition-opacity hover:opacity-70"
                    aria-label="NextBot — scroll to top"
                  >
                    <Image
                      src="/logo.png"
                      alt="NextBot Logo"
                      width={36}
                      height={36}
                      className="h-9 w-9"
                      priority
                    />
                    <span className="text-[20px] font-semibold leading-none text-nextbot-midnight">
                      NextBot
                    </span>
                  </button>

                  <ul className="hidden items-center gap-8 md:flex">
                    {NEO_NAV_LINKS.map((link) => (
                      <NavItem
                        key={link.href}
                        link={link}
                        active={activeSection === link.href}
                        onClick={handleNavigate}
                      />
                    ))}
                  </ul>

                  <div className="hidden md:block">
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleNavigate("#contact")}
                    >
                      Започни пилот
                    </Button>
                  </div>

                  <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-black/5 md:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                  >
                    <div className="flex w-[18px] flex-col items-end gap-[5px]">
                      <span
                        className={cn(
                          "h-[1.5px] rounded-full bg-nextbot-midnight transition-all duration-300",
                          mobileOpen ? "w-[18px] translate-y-[6.5px] rotate-45" : "w-[18px]",
                        )}
                      />
                      <span
                        className={cn(
                          "h-[1.5px] w-[14px] rounded-full bg-nextbot-midnight transition-all duration-300",
                          mobileOpen && "opacity-0",
                        )}
                      />
                      <span
                        className={cn(
                          "h-[1.5px] rounded-full bg-nextbot-midnight transition-all duration-300",
                          mobileOpen ? "w-[18px] -translate-y-[6.5px] -rotate-45" : "w-[10px]",
                        )}
                      />
                    </div>
                  </button>
                </div>
              </Container>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <MobileMenu
        open={mobileOpen && visible}
        links={NEO_NAV_LINKS}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
