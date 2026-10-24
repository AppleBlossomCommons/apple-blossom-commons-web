import Link from "next/link";

/**
 * "Next district": a full-width row between hairlines leading to the next district by number
 * (10 wraps to 1). The circle-opening transition onto the next page comes with step 4.
 */
export function NextDistrict({ slug, name }: { slug: string; name: string }) {
  return (
    <nav aria-label="Next district" className="px-[clamp(16px,4vw,56px)]">
      <Link
        href={`/districts/${slug}`}
        className="group flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-3 border-y border-line py-[clamp(28px,3vw,40px)] text-hearth no-underline transition-colors duration-200 hover:text-sage-deep"
      >
        <span className="flex flex-col gap-1.5">
          <span className="text-base font-bold text-muted">Next district</span>
          <span className="font-display text-[clamp(32px,3.6vw,48px)] font-semibold leading-none tracking-[-0.025em]">{name}</span>
        </span>
        <span
          aria-hidden="true"
          className="flex size-14 items-center justify-center rounded-full bg-gold text-2xl text-hearth transition-[translate] duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </nav>
  );
}
