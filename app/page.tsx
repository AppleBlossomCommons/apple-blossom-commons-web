import { ConnectedCommunity } from "@/components/home/ConnectedCommunity";
import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { Doorways } from "@/components/home/Doorways";
import { Hero } from "@/components/home/Hero";
import { KeyFacts } from "@/components/home/KeyFacts";
import { MigrationEvidence } from "@/components/home/MigrationEvidence";
import { PartnerCta } from "@/components/home/PartnerCta";
import { TourTeaser } from "@/components/home/TourTeaser";
import { PLAN_DISCLAIMER, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export default function Home() {
  return (
    <>
      <Hero />
      <DistrictExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} disclaimer={PLAN_DISCLAIMER} />
      <KeyFacts />
      <Doorways />
      <ConnectedCommunity />
      <MigrationEvidence />
      <TourTeaser />
      <PartnerCta />
    </>
  );
}
