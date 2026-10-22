import Link from "next/link";
import { container } from "@/components/site/layout";

// Approved homepage mockup copy (Oct 16, 2026). "short" is the phone wording.
const doorways = [
  {
    href: "/research",
    audience: "For investors",
    title: "Investment perspective",
    text: "The demand thesis, the evidence behind it, and a path to the full reports for approved partners.",
    short: "The demand thesis and the evidence behind it.",
    cta: "Research Library",
  },
  {
    href: "/districts",
    audience: "For land buyers and developers",
    title: "Development opportunities",
    text: "District by district: program, frontage, neighboring uses and the planning concepts behind each one.",
    short: "Program, frontage and neighbors, district by district.",
    cta: "All ten districts",
  },
];

/** Audience doorways into the site (docs/01, Audiences). A "For neighbors" card comes with the participate page. */
export function Doorways() {
  return (
    <section aria-labelledby="doorways-title" className={`${container} flex flex-col gap-3.5 pb-10 pt-2 sm:gap-7 sm:pb-[88px] sm:pt-10`}>
      <h2 id="doorways-title" className="mb-1 text-[1.75rem] leading-[1.15] [text-wrap:wrap] sm:mb-0 sm:text-[2.5rem] sm:leading-[1.1] sm:tracking-[-0.01em]">
        Find your way into the plan
      </h2>
      <ul className="grid gap-3.5 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-6">
        {doorways.map((d) => (
          <li key={d.href} className="flex">
            <Link
              href={d.href}
              className="group flex w-full flex-col gap-1.5 rounded-[8px] border border-rule bg-surface p-[18px] text-ink no-underline transition-colors duration-150 hover:border-ink-3 sm:gap-3 sm:p-6"
            >
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-ink-3 sm:text-[0.75rem]">
                {d.audience}
              </span>
              <span className="font-serif text-[1.3125rem] font-semibold leading-[1.2] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[0.15em] sm:text-[1.625rem]">
                {d.title}
              </span>
              <span className="text-[0.9375rem] text-ink-2 sm:hidden">{d.short}</span>
              <span className="hidden text-base text-ink-2 sm:block">{d.text}</span>
              <span className="mt-auto hidden text-[0.9375rem] font-semibold text-green sm:block">{d.cta} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
