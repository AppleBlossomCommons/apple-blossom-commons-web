import { preload } from "react-dom";
import { ConnectedCommunity } from "@/components/home/ConnectedCommunity";
import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { Doorways } from "@/components/home/Doorways";
import { Hero } from "@/components/home/Hero";
import { KeyFacts } from "@/components/home/KeyFacts";
import { MigrationEvidence } from "@/components/home/MigrationEvidence";
import { PartnerCta } from "@/components/home/PartnerCta";
import { TourTeaser } from "@/components/home/TourTeaser";
import { PLAN_DISCLAIMER, PLAN_DISCLAIMER_3D, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

const PLAN_SHEET = "/plan/districts-sheet-greyscale.webp";

export default function Home() {
  // The plan sheet sits inside an SVG <image>, which the browser can't discover early.
  preload(PLAN_SHEET, { as: "image" });

  return (
    <>
      <Hero />
      <DistrictExplorer
        districts={planDistricts()}
        viewBox={PLAN_VIEWBOX}
        disclaimer={PLAN_DISCLAIMER}
        disclaimer3D={PLAN_DISCLAIMER_3D}
        imageHref={PLAN_SHEET}
      />
      <KeyFacts />
      <Doorways />
      <ConnectedCommunity />
      <MigrationEvidence />
      <TourTeaser />
      <PartnerCta />
    </>
  );
}
