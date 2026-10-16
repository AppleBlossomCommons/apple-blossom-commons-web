import { DistrictExplorer } from "@/components/home/DistrictExplorer";
import { Hero } from "@/components/home/Hero";
import { PLAN_DISCLAIMER, PLAN_VIEWBOX } from "@/lib/districts";
import { planDistricts } from "@/lib/plan-props";

export default function Home() {
  return (
    <>
      <Hero />
      <DistrictExplorer districts={planDistricts()} viewBox={PLAN_VIEWBOX} disclaimer={PLAN_DISCLAIMER} />
    </>
  );
}
