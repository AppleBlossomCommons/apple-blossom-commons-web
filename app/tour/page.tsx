import type { Metadata } from "next";
import Link from "next/link";
import { preconnect } from "react-dom";
import { buttonClass } from "@/components/site/buttons";
import { TourExperience } from "@/components/tour/TourExperience";
import { tourMapStart, tours, tourVideoBase } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Site Tour",
  description: "Sixteen short drives and walks around the land, each paired with a map that follows the route as the video plays.",
};

/** A rounded tinted card inset from the page edges, as on the home and About heroes. */
const card = {
  wrap: "px-2 py-2 sm:px-4 sm:py-4",
  inner: "rounded-hero-sm px-5 py-12 sm:rounded-hero sm:px-[clamp(24px,5vw,64px)] sm:py-[88px]",
};

/**
 * Site Tour (docs/13-site-tour.md): a linen intro, the full-bleed sand stage with the player,
 * map, landmarks and clip list, then a linen closing band.
 */
export default function TourPage() {
  // The map tiles load straight away, and the clips on demand: open those connections early.
  preconnect("https://ibasemaps-api.arcgis.com");
  preconnect("https://static-map-tiles-api.arcgis.com");
  if (tourVideoBase) preconnect(new URL(tourVideoBase).origin);

  return (
    <>
      {/* Intro: a rounded sky card, like the home page hero. */}
      <section aria-labelledby="tour-page-title" className={card.wrap}>
        <div className={`${card.inner} bg-tint-sky`}>
          <h1 id="tour-page-title" className="text-[46px] leading-[0.98] sm:text-[clamp(56px,6.1vw,88px)] sm:leading-[0.96] sm:tracking-[-0.03em]">
            Site Tour
          </h1>
          <p className="mt-5 max-w-[760px] text-xl leading-normal sm:mt-7 sm:text-[24px] sm:leading-[1.45]">
            Sixteen short drives and walks around the land, each paired with a map that follows the route as the video plays.
          </p>
          <p className="mt-3 max-w-[760px] text-muted sm:mt-4">
            Choose a clip and press play. Select any point on the route, or any landmark, to jump to that moment.
          </p>
        </div>
      </section>

      <TourExperience tours={tours} videoBase={tourVideoBase} mapStart={tourMapStart} />

      {/* Closing question: a rounded pink card, like the home page doorway cards. */}
      <section aria-labelledby="tour-questions-title" className={`${card.wrap} pb-10 sm:pb-16`}>
        <div className={`${card.inner} bg-tint-pink`}>
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
        </div>
      </section>
    </>
  );
}
