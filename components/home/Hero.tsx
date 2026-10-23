import Link from "next/link";
import { buttonClass } from "@/components/site/buttons";
import { ArrowRight } from "@/components/site/icons";
import { container, eyebrow } from "@/components/site/layout";

/** Homepage hero (approved mockup, Oct 16, 2026). Phones get the mockup's shorter paragraph. */
export function Hero() {
  return (
    <section
      aria-labelledby="home-title"
      className={`${container} flex flex-wrap items-end gap-x-16 gap-y-4 pb-7 pt-9 sm:gap-y-10 sm:pb-12 sm:pt-[72px]`}
    >
      <div className="flex min-w-0 flex-[999_1_620px] flex-col gap-4 sm:gap-[22px]">
        <p className={`${eyebrow} sm:font-normal`}>Chelan, Washington · Masterplan, July 2026</p>
        <h1
          id="home-title"
          className="text-[clamp(2.5rem,1.2rem+4.6vw,4.75rem)] [text-wrap:wrap] sm:max-w-[13ch] leading-[1.05] tracking-[-0.015em] sm:leading-[1.02] sm:tracking-[-0.02em]"
        >
          A community planned to grow with Chelan, over decades.
        </h1>
        <p className="max-w-[60ch] text-[1.0625rem] text-muted sm:hidden">
          A long-range plan around the Lake Chelan Community Hospital campus: ten districts for every stage of life,
          designed to be walkable and built in phases.
        </p>
        <p className="hidden max-w-[60ch] text-[1.25rem] leading-[1.5] text-muted sm:block">
          Apple Blossom Commons is a long-range plan around the Lake Chelan Community Hospital campus: ten districts for every stage of life, a wine and culinary village, parks and open space, designed
          to be walkable and built in phases.
        </p>
      </div>
      <div className="flex w-full flex-[1_1_300px] flex-col gap-3 sm:pb-1.5">
        <Link href="/districts" className={buttonClass("primary", "lg")}>
          Explore the ten districts
          <ArrowRight className="hidden size-4 sm:block" />
        </Link>
        <Link href="/tour" className={buttonClass("secondary", "lg")}>
          Take the site tour
        </Link>
      </div>
    </section>
  );
}
