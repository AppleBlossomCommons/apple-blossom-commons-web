import { Reveal } from "@/components/motion/Reveal";
import { BackToMapLink } from "@/components/transitions/TransitionLinks";

type LocatorDistrict = { key: string; color: string; polys: string[] };

/** Every district except the current one is drawn in this quiet tone on the locator map. */
const OTHER_FILL = "#E2D7C3";

/**
 * "At a glance": the district's public facts (keeping their "(planning concept)" notes, per the
 * content pack) beside a small flat locator map. The map and "See it on the map →" both go back to
 * the Home map with the return transition.
 */
export function AtAGlance({
  name,
  current,
  facts,
  districts,
  viewBox,
}: {
  name: string;
  current: string;
  facts: string[];
  districts: LocatorDistrict[];
  viewBox: string;
}) {
  return (
    <section
      aria-labelledby="glance-title"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-16 gap-y-12 px-[clamp(16px,4vw,56px)] py-[clamp(72px,8vw,112px)]"
    >
      <div className="flex flex-col gap-6">
        <Reveal as="h2" kind="head" id="glance-title" className="text-[clamp(36px,4vw,52px)] leading-none">
          At a glance
        </Reveal>
        <Reveal kind="fade">
          <ul className="flex flex-col">
            {facts.map((fact) => (
              <li key={fact} className="py-3 text-[19px]">
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="text-base text-muted">Figures are planning concepts, not commitments.</p>
      </div>

      <Reveal kind="card" className="flex flex-col gap-3">
        {/* A mouse shortcut to the Home map; keyboard and screen-reader users have the link below. */}
        <BackToMapLink
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[1023/694] w-full overflow-hidden rounded-card bg-sand"
        >
          <svg viewBox={viewBox} className="absolute inset-[4%] size-[92%] overflow-visible">
            {districts.map((d) =>
              d.polys.map((p, i) => (
                <path
                  key={`${d.key}-${i}`}
                  d={p}
                  fill={d.key === current ? d.color : OTHER_FILL}
                  stroke="var(--sand)"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              )),
            )}
          </svg>
        </BackToMapLink>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-base text-muted">Where it sits in the plan</p>
          <BackToMapLink
            className="inline-flex min-h-11 items-center text-[17px] font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-[3px] hover:text-hearth"
          >
            See it on the map&nbsp;<span aria-hidden="true">→</span>
            <span className="sr-only"> ({name})</span>
          </BackToMapLink>
        </div>
      </Reveal>
    </section>
  );
}
