import Link from "next/link";
import { PLAN_DISCLAIMER } from "@/lib/districts";
import { footerNav, mainNav, partnerLink, utilityNav } from "./nav";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-basalt text-[#f5f3ed]">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 pb-10 pt-16 lg:grid-cols-12 lg:px-10 lg:pt-20">
        <div className="lg:col-span-5">
          <Wordmark tone="paper" />
          <p className="mt-4 max-w-[36ch] text-base text-[#c9d2cb]">
            A generational, mixed-use community in Chelan, Washington. Planned and stewarded by Chelan Village, LP.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[0.9375rem] sm:grid-cols-3 lg:col-span-7">
          {[...mainNav, ...utilityNav, partnerLink, ...footerNav].map((item) => (
            <Link key={item.href} href={item.href} className="py-1 text-[#dfe5df] no-underline hover:text-white hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-[1360px] flex-col gap-2 border-t border-white/15 px-6 py-6 font-mono text-[0.75rem] text-[#b9c4bc] sm:flex-row sm:justify-between lg:px-10">
        <p>{PLAN_DISCLAIMER}</p>
        <p>© 2026 Chelan Village, LP</p>
      </div>
    </footer>
  );
}
