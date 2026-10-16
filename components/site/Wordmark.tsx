import Link from "next/link";
import { Logo } from "./Logo";

/**
 * TEMPORARY wordmark: the interim Logo mark plus the name in Source Serif 4.
 * No logo exists yet (docs/01-project-brief.md); swap the mark in Logo.tsx.
 */
export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2 text-ink no-underline sm:gap-2.5"
    >
      <Logo size={24} className="sm:hidden" />
      <Logo size={28} className="hidden sm:block" />
      <span translate="no" className="whitespace-nowrap font-serif text-[1.125rem] font-semibold leading-none tracking-[-0.01em] sm:text-[1.25rem]">
        Apple Blossom Commons
      </span>
    </Link>
  );
}
