import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/site/buttons";
import { TourExperience } from "@/components/tour/TourExperience";
import { tourMapStart, tours, tourVideoBase } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Site Tour",
  description: "Sixteen short drives and walks around the land, each paired with a map that follows the route as the video plays.",
};

const pad = "px-5 sm:px-[clamp(16px,4vw,56px)]";

/**
 * Site Tour (docs/13-site-tour.md): a linen intro, the full-bleed sand stage with the player,
 * map, landmarks and clip list, then a linen closing band.
 */
export default function TourPage() {
  return (
    <>
      <section aria-labelledby="tour-page-title" className={`${pad} pb-10 pt-10 sm:pb-16 sm:pt-[88px]`}>
        <h1 id="tour-page-title" className="text-[46px] leading-[0.98] sm:text-[clamp(56px,6.1vw,88px)] sm:leading-[0.96] sm:tracking-[-0.03em]">
          Site Tour
        </h1>
        <p className="mt-5 max-w-[760px] text-xl leading-normal sm:mt-7 sm:text-[24px] sm:leading-[1.45]">
          Sixteen short drives and walks around the land, each paired with a map that follows the route as the video plays.
        </p>
        <p className="mt-3 max-w-[760px] text-muted sm:mt-4">
          Choose a clip and press play. Select any point on the route, or any landmark, to jump to that moment.
        </p>
      </section>

      <TourExperience tours={tours} videoBase={tourVideoBase} mapStart={tourMapStart} />

      <section aria-labelledby="tour-questions-title" className={`${pad} py-14 sm:py-[104px]`}>
        <h2 id="tour-questions-title" className="max-w-[18ch] text-4xl leading-none sm:text-[clamp(40px,4.2vw,56px)]">
          Questions about the land or the plan?
        </h2>
        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
          <Link href="/plan" className={buttonClass("secondary", "lg")}>
            See the plan
          </Link>
          <Link href="/contact" className={buttonClass("primary", "lg")}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
