import Link from "next/link";
import { buttonClass } from "@/components/site/buttons";
import { container, eyebrow } from "@/components/site/layout";

/**
 * Virtual site tour teaser (approved homepage mockup). The video still is a deliberate,
 * clearly marked placeholder until real tour stills are chosen (mockup README, rule 5).
 */
export function TourTeaser() {
  return (
    <section aria-labelledby="tour-title" className="bg-basalt text-on-basalt [&_:focus-visible]:outline-signal-on-dark">
      <div className={`${container} flex flex-wrap items-center gap-x-[72px] gap-y-3.5 py-10 sm:gap-y-12 sm:py-[88px]`}>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5 sm:gap-[18px]">
          <p className={`${eyebrow} text-on-basalt-2`}>Virtual site tour</p>
          <h2 id="tour-title" className="text-[1.875rem] leading-[1.1] [text-wrap:wrap] sm:text-[2.75rem] sm:leading-[1.08] sm:tracking-[-0.01em]">
            See the site from the road.
          </h2>
          <p className="hidden max-w-[48ch] text-[1.125rem] text-on-basalt-2 sm:block">
            Sixteen drive-through clips around the planning area, each paired with a map that follows the route as the
            video plays.
          </p>
          <Link href="/tour" className={`self-start max-sm:hidden ${buttonClass("light", "md")}`}>
            Start the tour
          </Link>
        </div>

        <div className="flex min-w-0 flex-[2_1_560px] flex-wrap gap-3.5">
          <div className="flex aspect-[358/236] flex-[3_1_362px] sm:aspect-[16/10] items-center justify-center rounded-[8px] border border-dashed border-basalt-rule-2 bg-basalt-2 p-4 text-center font-mono text-[0.75rem] text-on-basalt-2 sm:p-5 sm:text-[0.8125rem]">
            <span className="sm:hidden">[TOUR VIDEO STILL]</span>
            <span className="hidden sm:inline">[TOUR VIDEO STILL · e.g. Tour 1, SR 150 to Apple Blossom Drive]</span>
          </div>
          <div className="hidden aspect-square flex-[2_1_220px] overflow-hidden rounded-[8px] bg-basalt-2 sm:block">
            <svg viewBox="0 0 240 240" role="img" aria-label="Route map sample" className="block size-full">
              <path
                d="M24 200 C 70 190, 90 130, 130 124 S 196 70, 220 40"
                fill="none"
                stroke="var(--on-basalt)"
                strokeOpacity="0.45"
                strokeWidth="4"
                strokeDasharray="7 7"
              />
              <path d="M24 200 C 70 190, 90 130, 130 124" fill="none" stroke="var(--harvest-gold)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="130" cy="124" r="8" fill="var(--on-basalt)" stroke="var(--signal-on-dark)" strokeWidth="4" />
              <text x="142" y="112" fill="var(--on-basalt)" fontFamily="var(--font-plex-mono), monospace" fontSize="11">
                0:42 · Isenhart Rd
              </text>
            </svg>
          </div>
        </div>

        <Link href="/tour" className={`w-full sm:hidden ${buttonClass("light", "lg")}`}>
          Start the tour
        </Link>
      </div>
    </section>
  );
}
