"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "./icons";
import { mainNav, partnerLink, utilityNav } from "./nav";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="relative z-40 border-b border-rule bg-paper">
      <div className="mx-auto hidden max-w-[1360px] justify-end gap-6 px-6 pt-2.5 text-[0.8125rem] text-ink-2 lg:flex lg:px-10">
        {utilityNav.map((item) => (
          <Link key={item.href} href={item.href} className="no-underline hover:text-ink hover:underline" aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-8 px-6 lg:h-14 lg:px-10">
        <div className="mr-auto">
          <Wordmark />
        </div>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.9375rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="py-2 text-ink-2 no-underline transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-signal aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.5em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={partnerLink.href}
          className="hidden rounded-[3px] bg-green px-4 py-2.5 text-[0.9375rem] font-medium text-on-green no-underline transition-[filter] duration-150 hover:brightness-110 lg:inline-block"
        >
          {partnerLink.label}
        </Link>
        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper px-6 pb-8 pt-2 lg:hidden"
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {[...mainNav, ...utilityNav].map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className="block py-3.5 font-serif text-[1.375rem] text-ink no-underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={partnerLink.href} className="mt-6 inline-block rounded-[3px] bg-green px-5 py-3 font-medium text-on-green no-underline">
          {partnerLink.label}
        </Link>
      </nav>
    </header>
  );
}
