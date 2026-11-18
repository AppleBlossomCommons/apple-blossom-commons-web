import { Reveal } from "@/components/motion/Reveal";
import { BackToMapLink } from "@/components/transitions/TransitionLinks";
import { PLAN_SHEET } from "@/lib/district-image";
import { PLAN_DISCLAIMER } from "@/lib/districts";

/** `zones`: painted areas in other colors, drawn over `color` (lib/districts.ts, Zone). */
type LocatorDistrict = {
  key: string;
  n: number;
  color: string;
  polys: string[];
  labels: [number, number][];
  zones: { color: string; polys: string[] }[];
};

/** The cream sheet's paper color (matches the 3D model's board edges), shown while the sheet loads. */
const BOARD = "#EBE5D8";

/**
 * "At a glance": one card in two halves that touch (seamless style, Oct 25, 2026). Left: the
 * district's public facts, large, on a panel tinted with the district color (facts keep their
 * "(planning concept)" notes, per the content pack). Right: a locator map drawn on the masterplan
 * sheet, with this district in full color and the others faint. The map and "See it on the map →"
 * both go back to the Home map with the return transition.
 */
export function AtAGlance({
  name,
  current,
  color,
  facts,
  districts,
  viewBox,
}: {
  name: string;
  current: string;
  color: string;
  facts: string[];
  districts: LocatorDistrict[];
  viewBox: string;
}) {
  const [minX, minY, w, h] = viewBox.split(" ").map(Number);
  const here = districts.find((d) => d.key === current);

  return (
    <section aria-labelledby="glance-title" className="px-2 py-[clamp(56px,7vw,96px)] sm:px-4">
      <Reveal kind="card" className="grid overflow-hidden rounded-card min-[900px]:grid-cols-[5fr_7fr]">
        <div
          className="flex flex-col gap-8 p-[clamp(24px,4vw,56px)] text-hearth"
          // oklab, not oklch: oklch loses the hue of a nearly gray color (the Residence's taupe) in Chrome.
          style={{ background: `color-mix(in oklab, ${color} 45%, var(--linen))` }}
        >
          <h2 id="glance-title" className="text-[clamp(36px,4vw,52px)] leading-none">
            At a glance
          </h2>
          <ul className="flex flex-col">
            {facts.map((fact) => (
              <li
                key={fact}
                className="border-t border-hearth/15 py-4 text-[clamp(20px,1.8vw,24px)] leading-[1.3] tracking-[-0.005em] last:border-b"
              >
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <p className="text-base">Figures are planning concepts, not commitments.</p>
            <BackToMapLink className="inline-flex min-h-11 items-center self-start text-[17px] font-bold text-hearth underline decoration-hearth/40 decoration-2 underline-offset-[3px] hover:text-hearth hover:decoration-hearth">
              See it on the map&nbsp;<span aria-hidden="true">→</span>
              <span className="sr-only"> ({name})</span>
            </BackToMapLink>
          </div>
        </div>

        <div className="relative min-h-[260px]" style={{ background: BOARD, aspectRatio: `${w} / ${h}` }}>
        {/* A mouse shortcut to the Home map; keyboard and screen-reader users have the link beside it. */}
        <BackToMapLink tabIndex={-1} aria-hidden="true" className="absolute inset-0 block overflow-hidden">
          <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full">
            <image href={PLAN_SHEET} x={minX} y={minY} width={w} height={h} preserveAspectRatio="none" />            {districts
              .filter((d) => d.key !== current)
              .map((d) => (
                <g key={d.key}>
                  {d.polys.map((p, i) => (
                    <path
                      key={i}
                      d={p}
                      fill={d.color}
                      fillOpacity={0.35}
                      stroke="var(--hearth)"
                      strokeOpacity={0.2}
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {d.zones.map((z, zi) => z.polys.map((p, i) => <path key={`z${zi}-${i}`} d={p} fill={z.color} fillOpacity={0.35} />))}
                </g>
              ))}
            {here?.polys.map((p, i) => <path key={`here-${i}`} d={p} fill={here.color} fillOpacity={0.95} />)}
            {here?.zones.map((z, zi) => z.polys.map((p, i) => <path key={`here-z${zi}-${i}`} d={p} fill={z.color} fillOpacity={0.95} />))}
            {here?.polys.map((p, i) => (
              <g key={`here-line-${i}`}>
                {/* Hearth keyline under the gold outline, as on the Plan map, so it reads on yellow too. */}
                <path d={p} fill="none" stroke="var(--hearth)" strokeWidth={4.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <path d={p} fill="none" stroke="var(--gold)" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </g>
            ))}
            {here?.labels.map(([x, y], i) => (
              <g key={`n-${i}`} transform={`translate(${x} ${y})`}>
                <circle r={17} fill="var(--gold)" stroke="var(--hearth)" strokeWidth={2.5} />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-hearth font-sans text-[17px] font-semibold"
                >
                  {here.n}
                </text>
              </g>
            ))}
          </svg>
        </BackToMapLink>
        <p className="pointer-events-none absolute bottom-3.5 left-3.5 max-w-[calc(100%-28px)] rounded-[14px] bg-label px-2.5 py-1 text-xs font-medium leading-[1.35] text-hearth sm:px-3 sm:py-1.5 sm:text-[13px]">
          {PLAN_DISCLAIMER}
        </p>
        </div>
      </Reveal>
    </section>
  );
}
