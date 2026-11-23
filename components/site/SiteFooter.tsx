import Link from "next/link";
import { footerColumns } from "./nav";

// Footer line from the content pack (docs/10-content-v2.md, "Navigation and footer").
const FOOTER_LINE =
  "Apple Blossom Commons is a long-range community plan for land near the Lake Chelan hospital campus, carried out by Chelan Village, LP over many years. Plans shown are illustrative and will change as they are refined.";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="mt-[clamp(64px,7vw,96px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-16 gap-y-12 bg-sand lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] px-[clamp(20px,4vw,56px)] lg:px-(--frame-gutter) pb-12 pt-[clamp(48px,5vw,72px)]"
    >
      <div className="flex max-w-[440px] flex-col gap-4">
        <p translate="no" className="font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.015em]">
          Apple Blossom Commons
        </p>
        <p className="text-[0.9375rem] leading-normal text-muted">{FOOTER_LINE}</p>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-6 gap-y-8 text-[0.9375rem] leading-snug lg:grid-cols-4">
        {footerColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-2">
            <h2 className="font-sans text-[0.9375rem] font-bold leading-snug tracking-normal">{column.title}</h2>
            <ul className="flex flex-col gap-2">
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-hearth underline decoration-sage-deep decoration-1 underline-offset-[0.2em] transition-colors duration-150 hover:text-hearth hover:decoration-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  );
}
