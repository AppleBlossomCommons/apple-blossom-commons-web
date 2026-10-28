import { Reveal } from "@/components/motion/Reveal";
import { ConceptNote, PlaceCard } from "@/components/site/Places";
import type { DistrictKey, Place } from "@/lib/districts";
import { getPlaceImage } from "@/lib/place-images";

/**
 * "What's planned here" (docs/11-plan-and-districts-content.md, 2.1): the district's named places
 * from data/districts.json, two columns on desktop and one on phones, then the concept note.
 * An aspirational district (Discovery Commons) says so above the list.
 */
export function WhatsPlannedHere({
  districtKey,
  places,
  aspirational,
}: {
  districtKey: DistrictKey;
  places: Place[];
  aspirational: boolean;
}) {
  if (places.length === 0) return null;

  return (
    <section aria-labelledby="planned-title" className="px-[clamp(16px,4vw,56px)] pb-[clamp(72px,8vw,112px)]">
      <div className="mb-8 flex flex-col gap-4 sm:mb-12">
        <Reveal as="h2" kind="head" id="planned-title" className="text-[clamp(36px,4vw,52px)] leading-none">
          What&apos;s planned here
        </Reveal>
        {aspirational && (
          <Reveal as="p" kind="fade" className="max-w-[640px] text-xl sm:text-[23px]">
            This is an aspiration, not a commitment.
          </Reveal>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-x-16 gap-y-10 min-[760px]:grid-cols-2">
        {places.map((place, i) => (
          <PlaceCard key={place.name} place={place} image={getPlaceImage(districtKey, place.name)} index={i % 2} />
        ))}
      </ul>
      <ConceptNote className="mt-10 sm:mt-14" />
    </section>
  );
}
