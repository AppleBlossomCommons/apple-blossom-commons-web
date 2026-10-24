import { preload } from "react-dom";
import { Collage } from "@/components/home/Collage";
import { Differences } from "@/components/home/Differences";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeMap } from "@/components/home/HomeMap";
import { TourTeaser } from "@/components/home/TourTeaser";
import { DoorwayCards } from "@/components/site/DoorwayCards";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

/**
 * Home (docs/10-content-v2.md, "Home"; Phase 1 handoff, Home). The hospital-campus section,
 * migration evidence, key facts and partner band moved off Home in the content pack; their
 * components stay in components/home for The Plan and Partner with Us.
 */
export default function Home() {
  // The plan sheet sits inside an SVG <image>, which the browser can't discover early.
  preload(PLAN_SHEET, { as: "image" });

  return (
    <>
      <HomeIntro />
      <Hero />
      <Collage />
      <HomeMap districts={planDistricts()} viewBox={PLAN_VIEWBOX} imageHref={PLAN_SHEET} disclaimer={PLAN_DISCLAIMER} />
      <Differences />
      <TourTeaser />
      <DoorwayCards />
    </>
  );
}
