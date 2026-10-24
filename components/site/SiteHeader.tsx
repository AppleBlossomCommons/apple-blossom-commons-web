"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  type Variants,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { buttonClass } from "./buttons";
import { Logo } from "./Logo";
import { mainNav, partnerLink } from "./nav";

/** Header height. The phone menu sheet and the district overlay sit just below it. */
export const HEADER_HEIGHT = 64;
/** Scroll distance after which the header becomes a floating bar. */
const SCROLL_THRESHOLD = 24;
/** Below this width the nav and "Partner with Us" hide and the Menu button shows (Tailwind `nav`). */
const NAV_BREAKPOINT = 1080;

/**
 * Sticky header (Phase 1 handoff, "Header" and "Phone menu").
 *
 * Scrolled state: one motion value, --k, goes from 0 (flat) to 1 (floating bar) over 450ms.
 * CSS turns --k into the outer padding (0 → 8px 12px), corner radius (0 → 16px), shadow,
 * inner padding (responsive → 16px) and logo size (21px → 19px). Animating one number
 * keeps the responsive clamp() padding, which can't be tweened directly.
 */
// Phones under 420px: the wordmark scales with the screen (15–19px), the mark drops to 24px and
// the gaps tighten, so logo, name and Menu fit on a 360px screen.
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const k = useMotionValue(0);

  // Motion's scroll tracking (batched to animation frames) tells React when to re-check.
  // Reading window.scrollY directly also covers a reload partway down the page.
  const { scrollY } = useScroll();
  const subscribe = useCallback((onChange: () => void) => scrollY.on("change", onChange), [scrollY]);
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  // The bar stays flat while the phone menu is open, so the sheet joins it cleanly.
  const floating = scrolled && !menuOpen;
  useEffect(() => {
    const controls = animate(k, floating ? 1 : 0, reduce ? { duration: 0 } : { duration: 0.45, ease: ease.out });
    return () => controls.stop();
  }, [floating, reduce, k]);

  // Close the menu on navigation (links, back and forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const closeMenu = useCallback((returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  const goHome = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <motion.header
        id="site-header"
        style={{ "--k": k } as React.CSSProperties}
        className="sticky top-0 z-30 h-16 p-[calc(var(--k)*8px)_calc(var(--k)*12px)]"
      >
        <div className="flex h-full items-center gap-6 max-[419px]:gap-3 rounded-[calc(var(--k)*16px)] bg-linen px-[calc(16px_+_(1_-_var(--k))_*_(clamp(16px,3vw,40px)_-_16px))] shadow-[0_10px_30px_-14px_rgb(59_47_42/calc(var(--k)*0.35)),0_0_0_1px_rgb(230_218_202/var(--k))]">
          <Link
            href="/"
            onClick={goHome}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-[10px] text-hearth no-underline max-[419px]:gap-2"
          >
            <Logo size={28} className="max-[419px]:size-6" />
            <span
              translate="no"
              className="font-display text-[length:calc(21px_-_var(--k)*2px)] font-semibold leading-none tracking-[-0.01em] max-[759px]:text-[clamp(15px,4.2vw,19px)]"
            >
              Apple Blossom Commons
            </span>
          </Link>

          <nav aria-label="Main" className="hidden nav:block">
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-[10px] px-3.5 py-2.5 text-[1.0625rem] text-hearth no-underline transition-colors duration-150 hover:bg-sand hover:text-hearth aria-[current=page]:bg-sand aria-[current=page]:font-bold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href={partnerLink.href} className={`ml-auto max-nav:hidden ${buttonClass("primary", "sm")}`}>
            {partnerLink.label}
          </Link>

          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-sand px-4 text-base font-bold text-hearth max-[419px]:px-3.5 nav:hidden"
          >
            <MenuBars open={menuOpen} reduce={reduce} />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <PhoneMenu
        open={menuOpen}
        reduce={reduce}
        isActive={isActive}
        onClose={closeMenu}
      />
    </>
  );
}

/** Two lines that turn into an X (350ms in-out). */
function MenuBars({ open, reduce }: { open: boolean; reduce: boolean }) {
  const transition = reduce ? { duration: 0 } : { duration: 0.35, ease: ease.inOut };
  const bar = "absolute inset-x-0 h-0.5 rounded-[2px] bg-hearth";
  return (
    <span aria-hidden="true" className="relative inline-block h-2.5 w-4">
      <motion.span className={`${bar} top-0`} initial={false} animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }} transition={transition} />
      <motion.span className={`${bar} bottom-0`} initial={false} animate={open ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }} transition={transition} />
    </span>
  );
}

/**
 * The phone menu: a sheet under the header that unclips downward (520ms), then its links
 * arrive one by one. Closing fades the links, then clips the sheet back up.
 * While it's open the page behind is inert and doesn't scroll, and Esc closes it.
 */
function PhoneMenu({
  open,
  reduce,
  isActive,
  onClose,
}: {
  open: boolean;
  reduce: boolean;
  isActive: (href: string) => boolean;
  onClose: (returnFocus: boolean) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const page = [document.getElementById("main"), document.getElementById("site-footer")];
    page.forEach((el) => el?.setAttribute("inert", ""));
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(true);
    };
    // Widening past the breakpoint hides the Menu button, so close the sheet with it.
    const wide = window.matchMedia(`(min-width: ${NAV_BREAKPOINT}px)`);
    const onWide = () => wide.matches && onClose(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      page.forEach((el) => el?.removeAttribute("inert"));
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, onClose]);

  const sheet: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        open: { opacity: 1, transition: { duration: 0.2 } },
        closed: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        open: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.52, ease: ease.inOut } },
        closed: { clipPath: "inset(0 0 100% 0)", transition: { delay: 0.08, duration: 0.38, ease: ease.sheetClose } },
      };

  const link: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, filter: "blur(6px)", y: -14 },
        open: (i: number) => ({
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { delay: 0.14 + i * 0.06, duration: 0.56, ease: ease.out },
        }),
        closed: { opacity: 0, transition: { duration: 0.16 } },
      };

  const row =
    "flex min-h-[72px] items-center rounded-card bg-sand px-5 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-hearth no-underline hover:text-hearth aria-[current=page]:shadow-[inset_0_0_0_2px_var(--gold)]";

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="site-menu"
          id="site-menu"
          aria-label="Main"
          variants={sheet}
          initial="hidden"
          animate="open"
          exit="closed"
          className="fixed inset-x-0 bottom-0 top-16 z-[29] flex flex-col gap-1.5 overflow-y-auto overscroll-contain bg-linen px-3 pb-6 pt-3 nav:hidden"
        >
          {mainNav.map((item, i) => (
            <motion.div key={item.href} custom={i} variants={link}>
              <Link
                href={item.href}
                onClick={() => onClose(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={row}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div custom={mainNav.length} variants={link} className="mt-auto pt-4">
            <Link href={partnerLink.href} onClick={() => onClose(false)} className={`w-full ${buttonClass("primary", "lg")}`}>
              {partnerLink.label}
            </Link>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
