import { preload } from "react-dom";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeMap } from "@/components/home/HomeMap";
import { PhotoSteps } from "@/components/home/PhotoSteps";
import { TourTeaser } from "@/components/home/TourTeaser";
import { StackSection } from "@/components/motion/StackSection";
import { DoorwayCards } from "@/components/site/DoorwayCards";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

/**
 * Home (docs/10-content-v2.md, "Home"; Phase 1 handoff, Home). The hospital-campus section,
 * migration evidence, key facts and partner band moved off Home in the content pack; their
 * components stay in components/home for The Plan and Partner with Us.
 *
 * Stacked sheets (owner request, Nov 20, 2026, after villiers.ai): pinned sections hold still once
 * fully in view, and the next one slides up over them. The map isn't pinned, because the district
 * dive measures it on screen and the 3D model shouldn't keep drawing under other sections.
 * From the map on, sections scroll normally (owner request, Nov 21, 2026, to avoid visual fatigue).
 * The tour and doorways still go through StackSection, unpinned, so they paint over the pinned
 * photo steps. "What makes it different" was removed the same day: it repeated the hero and photos.
 */
export default function Home() {
  // The plan sheet sits inside an SVG <image>, which the browser can't discover early.
  preload(PLAN_SHEET, { as: "image" });

  return (
    <>
      <HomeIntro />
      <StackSection pin>
        <Hero />
      </StackSection>
      <StackSection pin sheet>
        <PhotoSteps />
      </StackSection>
      <StackSection sheet>
        <HomeMap districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER} />
      </StackSection>
      {/* A background, so the pinned photo steps don't show through before the tour photo loads. */}
      <StackSection className="bg-linen">
        <TourTeaser />
      </StackSection>
      <StackSection className="bg-linen">
        <DoorwayCards />
      </StackSection>
    </>
  );
}
