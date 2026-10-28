import { districts, PLAN_VIEWBOX, polyToPath } from "@/lib/districts";
import { WALK_RINGS, WALK_RINGS_CAPTION } from "@/lib/walk-rings";

/** Where each ring's label sits on its ring, in degrees (up and to the left of the center). */
const LABEL_ANGLE = -135;

/**
 * The walk-ring diagram (docs/11, 1.2): the ten districts as flat shapes, with three soft rings
 * around the village center. It is drawn on the flat district shapes, not the masterplan sheet,
 * because the sheet has its own rings printed around a different center (lib/walk-rings.ts).
 *
 * Decorative for assistive tech: the four items beside it are its text equivalent. The caption
 * stays readable.
 */
export function WalkRings() {
  const [minX, minY, w, h] = PLAN_VIEWBOX.split(" ").map(Number);
  const [cx, cy] = WALK_RINGS.center;
  const pos = (x: number, y: number) => ({ left: `${((x - minX) / w) * 100}%`, top: `${((y - minY) / h) * 100}%` });
  const angle = (LABEL_ANGLE * Math.PI) / 180;

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-card bg-linen" style={{ aspectRatio: `${w} / ${h}` }}>
        <svg viewBox={PLAN_VIEWBOX} aria-hidden="true" className="absolute inset-0 size-full">
          {districts.map((d) =>
            d.polys.map((p, i) => (
              <path
                key={`${d.key}-${i}`}
                d={polyToPath(p)}
                fill={d.color}
                stroke="var(--linen)"
                strokeWidth={3}
                strokeLinejoin="round"
              />
            )),
          )}
          {/* Largest first, so the soft fills build up toward the center. */}
          {[...WALK_RINGS.rings].reverse().map((ring) => (
            <circle
              key={ring.minutes}
              cx={cx}
              cy={cy}
              r={ring.r}
              fill="var(--gold)"
              fillOpacity={0.12}
              stroke="var(--hearth)"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <circle cx={cx} cy={cy} r={9} fill="var(--gold)" stroke="var(--hearth)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {WALK_RINGS.rings.map((ring) => (
            <span
              key={ring.minutes}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-label px-2 py-0.5 text-[11px] font-bold text-hearth sm:px-3 sm:py-1 sm:text-sm"
              style={pos(cx + ring.r * Math.cos(angle), cy + ring.r * Math.sin(angle))}
            >
              {ring.label}
            </span>
          ))}
          <span
            className="absolute hidden translate-x-4 -translate-y-1/2 whitespace-nowrap rounded-full bg-label px-3 py-1 text-sm font-bold text-hearth sm:block"
            style={pos(cx, cy)}
          >
            Village center
          </span>
        </div>
      </div>
      <figcaption className="text-base text-muted">{WALK_RINGS_CAPTION}</figcaption>
    </figure>
  );
}
