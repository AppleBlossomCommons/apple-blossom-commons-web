"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "./buttons";
import { container } from "./layout";
import { ChevronDown, MenuIcon } from "./icons";
import { aboutNav, mainNav, partnerLink } from "./nav";
import { Wordmark } from "./Wordmark";

const navLink =
  "whitespace-nowrap text-ink no-underline transition-colors duration-150 hover:text-green aria-[current=page]:underline aria-[current=page]:decoration-signal aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.5em]";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/94 backdrop-blur-[6px]">
      <div className={`${container} flex h-[60px] items-center justify-between gap-6 sm:h-16`}>
        <Wordmark />
        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] font-medium">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <AboutMenu isActive={isActive} />
            </li>
          </ul>
        </nav>
        <Link href={partnerLink.href} className={`max-nav:hidden ${buttonClass("primary", "sm")}`}>
          {partnerLink.label}
        </Link>
        <MobileMenu isActive={isActive} />
      </div>
    </header>
  );
}

/** Desktop "About" disclosure: a button that shows a short list of links. */
function AboutMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector("button")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const sectionActive = aboutNav.some((item) => isActive(item.href));

  return (
    <div
      ref={wrap}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="about-menu"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 ${navLink} ${sectionActive ? "underline decoration-signal decoration-2 underline-offset-[0.5em]" : ""}`}
      >
        About
        <ChevronDown className={`size-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        id="about-menu"
        hidden={!open}
        className="absolute right-0 top-[calc(100%+14px)] min-w-[220px] origin-top-right rounded-[8px] border border-rule bg-surface p-1.5 shadow-[0_12px_32px_rgb(29_38_33/0.12)] transition-[opacity,scale] duration-150 ease-out starting:scale-[0.97] starting:opacity-0"
      >
        {aboutNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="flex min-h-10 items-center whitespace-nowrap rounded-[6px] px-3 text-ink no-underline hover:bg-surface-2 aria-[current=page]:text-green"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Below 1,100px: a menu button that opens a full-screen panel (a modal <dialog>). */
function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the panel whenever the route changes (back/forward included).
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  // If the window widens past the breakpoint while the panel is open, close it,
  // or the page would stay inert behind a hidden dialog.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1100px)");
    const onChange = () => wide.matches && dialog.current?.close();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  const close = () => dialog.current?.close();
  const linkClass =
    "flex min-h-[52px] items-center whitespace-nowrap font-serif text-[1.375rem] text-ink no-underline aria-[current=page]:underline aria-[current=page]:decoration-signal aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.35em]";

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex size-11 items-center justify-center rounded-[6px] border border-rule text-ink nav:hidden"
      >
        <MenuIcon open={false} />
        <span className="sr-only">Open menu</span>
      </button>
      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-paper p-0 text-ink transition-opacity duration-200 ease-out backdrop:bg-transparent starting:open:opacity-0 nav:hidden"
      >
        <div className="flex h-[60px] items-center justify-between border-b border-rule px-4 sm:h-16 sm:px-6">
          <Wordmark onClick={close} />
          <button
            type="button"
            onClick={close}
            autoFocus
            className="inline-flex size-11 items-center justify-center rounded-[6px] border border-rule text-ink"
          >
            <MenuIcon open />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Main" className="px-4 pb-10 pt-4 sm:px-6">
          <ul className="divide-y divide-rule border-b border-rule">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[0.75rem] font-medium tracking-[0.06em] text-ink-3">ABOUT</p>
          <ul className="mt-2 divide-y divide-rule border-b border-rule">
            {aboutNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center whitespace-nowrap text-[1.0625rem] text-ink no-underline aria-[current=page]:text-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={partnerLink.href} onClick={close} className={`mt-8 w-full ${buttonClass("primary", "lg")}`}>
            {partnerLink.label}
          </Link>
        </nav>
      </dialog>
    </>
  );
}
