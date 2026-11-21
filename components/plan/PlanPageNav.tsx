import Link from "next/link";
import { JumpLink } from "@/components/site/JumpLink";
import { planPages, type PlanPageHref } from "@/components/site/nav";

/**
 * The bar under the hero on all three Plan pages (Nov 19, 2026): the three pages as tabs, with the
 * current one marked, then a slim "On this page" list of jump links (docs/14, section 1 suggested
 * the jump list when The Plan was one long page).
 */
export function PlanPageNav({ current, sections }: { current: PlanPageHref; sections: { id: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4 border-b border-line px-5 pb-6 pt-6 sm:px-[clamp(16px,4vw,56px)] sm:pt-8">
      <nav aria-label="The Plan">
        <ul className="flex flex-wrap gap-1.5">
          {planPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                aria-current={page.href === current ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[1.0625rem] text-hearth no-underline transition-colors duration-150 hover:bg-sand hover:text-hearth aria-[current=page]:border-sage-deep aria-[current=page]:bg-sand aria-[current=page]:font-bold"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="On this page" className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <span className="text-[0.9375rem] text-muted">On this page</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <JumpLink
                href={`#${s.id}`}
                className="inline-flex min-h-11 items-center text-[0.9375rem] font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:decoration-hearth"
              >
                {s.label}
              </JumpLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
