import Link from "next/link";
import { buttonClass } from "@/components/site/buttons";
import { container } from "@/components/site/layout";

/** Closing call to action (approved homepage mockup). */
export function PartnerCta() {
  return (
    <section
      aria-labelledby="partner-title"
      className={`${container} flex flex-wrap items-end justify-between gap-x-[72px] gap-y-3.5 py-11 sm:gap-y-8 sm:py-24`}
    >
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
        <h2 id="partner-title" className="text-[1.875rem] leading-[1.1] [text-wrap:wrap] sm:text-[2.75rem] sm:leading-[1.08] sm:tracking-[-0.01em]">
          A plan carried out with partners, over many years.
        </h2>
        <p className="hidden max-w-[58ch] text-[1.125rem] text-muted sm:block">
          Chelan Village, LP carries out the plan with investors, operators, and healthcare and hospitality partners,
          over many years.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
        <Link href="/partners" className={buttonClass("primary", "lg")}>
          Become a Partner
        </Link>
        <Link href="/contact" className={buttonClass("secondary", "lg")}>
          Contact
        </Link>
      </div>
    </section>
  );
}
