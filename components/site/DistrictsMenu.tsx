"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { DistrictNavItem } from "@/lib/districts";
import { ease } from "@/lib/motion";
import { ArrowRight, ChevronDown } from "./icons";
import { planPages } from "./nav";

/** Where "See all districts on the map" goes: the district model on The Plan. */
export const DISTRICTS_OVERVIEW = "/plan#explore";

/** The colored number roundel, matching the ones on the map. */
export function DistrictRoundel({ item, className = "size-7 text-[13px]" }: { item: DistrictNavItem; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: item.color }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold leading-none text-hearth shadow-[inset_0_0_0_1px_rgb(59_47_42/0.12)] ${className}`}
    >
      {item.n}
    </span>
  );
}

/**
 * A header menu: a button that opens a panel under it. It's a disclosure (not a hover menu):
 * click or Enter opens it, Esc closes it and returns focus, and clicking or tabbing away closes it.
 * Used for "The Plan" and "Districts". `children` gets a `close` function for the panel's links.
 */
export function NavMenu({
  label,
  current,
  pathname,
  reduce,
  panelClassName,
  children,
}: {
  label: string;
  /** The visitor is on one of this menu's pages. */
  current: boolean;
  pathname: string;
  reduce: boolean;
  panelClassName: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Tabbing out of the button or the panel closes it.
  const onBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (next && !wrap.current?.contains(next)) setOpen(false);
  };

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, y: -6, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: ease.out } },
        exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12, ease: ease.out } },
      };

  return (
    <div ref={wrap} onBlur={onBlur} className="relative">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-current={current || undefined}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-[10px] py-2.5 pl-3.5 pr-2.5 text-[1.0625rem] text-hearth transition-colors duration-150 hover:bg-sand aria-expanded:bg-sand data-current:bg-sand data-current:font-bold"
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            {...panel}
            className={`absolute left-0 top-[calc(100%+10px)] z-10 origin-top-left rounded-card bg-linen p-2 shadow-[0_18px_40px_-16px_rgb(59_47_42/0.35),0_0_0_1px_var(--line)] ${panelClassName}`}
          >
            {children(() => setOpen(false))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** "Districts" in the desktop header: the ten district pages in legend order, plus a link to the map on The Plan. */
export function DistrictsMenu({
  items,
  pathname,
  reduce,
}: {
  items: DistrictNavItem[];
  pathname: string;
  reduce: boolean;
}) {
  return (
    <NavMenu label="Districts" current={pathname.startsWith("/districts/")} pathname={pathname} reduce={reduce} panelClassName="w-[540px]">
      {(close) => (
        <>
          <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-0.5">
            {items.map((item) => {
              const href = `/districts/${item.slug}`;
              const current = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className="flex min-h-11 items-center gap-3 rounded-chip px-2.5 py-2 text-base text-hearth no-underline transition-colors duration-150 hover:bg-sand hover:text-hearth aria-[current=page]:bg-sand aria-[current=page]:font-bold"
                  >
                    <DistrictRoundel item={item} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-2 border-t border-line px-1 pt-2">
            <Link
              href={DISTRICTS_OVERVIEW}
              onClick={close}
              className="flex min-h-11 items-center gap-2 rounded-chip px-2.5 text-base font-bold text-hearth no-underline transition-colors duration-150 hover:bg-sand hover:text-hearth"
            >
              See all districts on the map
              <ArrowRight />
            </Link>
          </div>
        </>
      )}
    </NavMenu>
  );
}

/** "The Plan" in the desktop header: its three pages, each with a one-line description. */
export function PlanMenu({ pathname, reduce }: { pathname: string; reduce: boolean }) {
  return (
    <NavMenu label="The Plan" current={isPlanPath(pathname)} pathname={pathname} reduce={reduce} panelClassName="w-[400px]">
      {(close) => (
        <ul className="flex flex-col gap-0.5">
          {planPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                onClick={close}
                aria-current={pathname === page.href ? "page" : undefined}
                className="flex min-h-11 flex-col rounded-chip px-3 py-2.5 text-hearth no-underline transition-colors duration-150 hover:bg-sand hover:text-hearth aria-[current=page]:bg-sand"
              >
                <span className="text-base font-bold">{page.label}</span>
                <span className="text-[0.9375rem] text-muted">{page.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </NavMenu>
  );
}

/** True on any of the three Plan pages. */
export function isPlanPath(pathname: string) {
  return pathname === "/plan" || pathname.startsWith("/plan/");
}
