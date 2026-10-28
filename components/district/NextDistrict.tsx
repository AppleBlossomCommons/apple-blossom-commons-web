import { DistrictLink } from "@/components/transitions/TransitionLinks";

/**
 * "Next district": a full-width band in the next district's color, leading to it by number
 * (10 wraps to 1). The next district's image opens in a circle from the click point.
 * Text is hearth, which passes 7.6:1 or better on every district color.
 */
export function NextDistrict({ slug, n, name, color }: { slug: string; n: number; name: string; color: string }) {
  return (
    <nav aria-label="Next district" className="px-2 pb-2 sm:px-4 sm:pb-4">
      <DistrictLink
        district={{ slug, color }}
        style={{ background: color }}
        className="group flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-card px-[clamp(20px,4vw,56px)] py-[clamp(32px,4.5vw,64px)] text-hearth no-underline hover:text-hearth"
      >
        <span className="flex flex-col gap-2">
          <span className="text-base font-bold">Next district · {n}</span>
          <span className="font-display text-[clamp(36px,4.6vw,64px)] font-semibold leading-none tracking-[-0.025em]">{name}</span>
        </span>
        <span
          aria-hidden="true"
          className="flex size-14 items-center justify-center rounded-full bg-linen text-2xl text-hearth transition-[translate,background-color] duration-300 ease-out group-hover:translate-x-1 group-hover:bg-white sm:size-16"
        >
          →
        </span>
      </DistrictLink>
    </nav>
  );
}
