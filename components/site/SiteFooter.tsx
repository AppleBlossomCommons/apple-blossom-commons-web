import Link from "next/link";
import { container } from "./layout";
import { aboutNav, connectNav, mainNav } from "./nav";

const footerLink = "text-ink no-underline hover:text-green hover:underline";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-surface-2">
      <div className={`${container} flex flex-col gap-4 pb-6 pt-8 sm:gap-10 sm:pb-7 sm:pt-14`}>
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-10">
          <div className="flex max-w-[360px] flex-[1_1_300px] flex-col gap-3">
            <p translate="no" className="font-serif text-[1.25rem] font-semibold sm:text-[1.375rem]">Apple Blossom Commons</p>
            <p className="hidden text-[0.9375rem] text-ink-2 sm:block">
              A long-range community plan in Chelan, Washington, coordinated by Chelan Village, LP.
            </p>
          </div>

          {/* Desktop: three titled columns. */}
          <nav aria-label="Footer" className="hidden flex-wrap gap-x-[72px] gap-y-8 text-[0.9375rem] sm:flex">
            <FooterColumn title="EXPLORE" items={mainNav} />
            <FooterColumn title="ABOUT" items={aboutNav} />
            <FooterColumn title="CONNECT" items={connectNav} />
          </nav>
        </div>

        {/* Phone: two untitled columns, Explore beside About (mockup). */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9375rem] sm:hidden">
          <ul className="flex flex-col gap-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2.5">
            {aboutNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden flex-wrap justify-between gap-3 border-t border-rule pt-[18px] font-mono text-[0.75rem] text-ink-3 sm:flex">
          <p>Plans shown are illustrative concepts from the July 2026 masterplan and will evolve.</p>
          <p>© 2026 Chelan Village, LP</p>
        </div>
        <p className="font-mono text-[0.6875rem] leading-[1.5] text-ink-3 sm:hidden">
          Plans shown are illustrative concepts from the July 2026 masterplan. © 2026 Chelan Village, LP
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-mono text-[0.75rem] font-medium tracking-[0.06em] text-ink-3">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`whitespace-nowrap ${footerLink}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
