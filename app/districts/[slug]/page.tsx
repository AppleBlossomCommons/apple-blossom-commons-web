import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AtAGlance } from "@/components/district/AtAGlance";
import { DistrictHero } from "@/components/district/DistrictHero";
import { NextDistrict } from "@/components/district/NextDistrict";
import { WhatsPlannedHere } from "@/components/district/WhatsPlannedHere";
import { ResearchLink } from "@/components/research/ResearchLink";
import { DoorwayCards } from "@/components/site/DoorwayCards";
import { districts, getDistrict, PLAN_VIEWBOX, polyToPath } from "@/lib/districts";
import { districtResearch, getReport } from "@/lib/research";

export function generateStaticParams() {
  return districts.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/districts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrict(slug);
  return { title: district?.name, description: district?.summary };
}

// The locator map draws every district: only shapes and colors, never internal notes.
const locatorDistricts = districts.map((d) => ({
  key: d.key,
  n: d.n,
  color: d.color,
  polys: d.polys.map(polyToPath),
  labels: d.labels,
  zones: d.zones.map((z) => ({ color: z.color, polys: z.polys.map(polyToPath) })),
}));

/**
 * District page (Phase 1 handoff, "District page"): the same template for all ten districts,
 * filled from data/districts.json. Reading the URL's slug happens inside <Suspense>, so the page
 * shell can show at once on navigation (Next 16 instant navigation; see the Next docs guide
 * "instant-navigation"). The fallback holds the hero's space so nothing shifts.
 */
export default function DistrictPage({ params }: PageProps<"/districts/[slug]">) {
  return (
    <Suspense fallback={<div className="h-[calc(100svh-64px)] min-h-[520px] bg-sand" />}>
      <District params={params} />
    </Suspense>
  );
}

async function District({ params }: { params: PageProps<"/districts/[slug]">["params"] }) {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (!district) notFound();
  // Next by number, wrapping 10 → 1.
  const next = districts.find((d) => d.n === (district.n % districts.length) + 1) ?? districts[0];
  // "Related research" (docs/15, section 7): hidden when the report can't be shown on this deployment.
  const research = districtResearch[district.slug] ? getReport(districtResearch[district.slug]) : undefined;

  return (
    <>
      {/* key: a new district remounts the hero, so its text entrance plays again. */}
      <DistrictHero
        key={district.slug}
        slug={district.slug}
        n={district.n}
        name={district.name}
        familyLabel={district.familyLabel}
        color={district.color}
        summary={district.summary}
      />
      <AtAGlance
        name={district.name}
        current={district.key}
        color={district.color}
        facts={district.publicFacts}
        districts={locatorDistricts}
        viewBox={PLAN_VIEWBOX}
      />
      <WhatsPlannedHere districtKey={district.key} places={district.places} aspirational={district.status === "aspirational"} />
      {research && (
        <div className="-mt-[clamp(40px,5vw,72px)] px-[clamp(16px,4vw,56px)] pb-[clamp(72px,8vw,112px)]">
          <ResearchLink slug={research.slug}>Related research: {research.title}</ResearchLink>
        </div>
      )}
      <NextDistrict slug={next.slug} n={next.n} name={next.name} color={next.color} />
      <DoorwayCards />
    </>
  );
}
