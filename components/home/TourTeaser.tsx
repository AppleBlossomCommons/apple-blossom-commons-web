import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClass } from "@/components/site/buttons";

/**
 * Site tour teaser (content pack, Home section 5). Nov 20, 2026 layout, after villiers.ai's
 * sign-up card: the tour photo fills the band and a linen card sits on it, bottom left.
 * On Home it's pinned, so the doorway cards slide up over it.
 */
export function TourTeaser() {
  return (
    <section
      aria-labelledby="tour-title"
      className="relative isolate flex min-h-[min(calc(100svh-64px),820px)] items-end px-[clamp(16px,4vw,56px)] lg:px-(--frame-gutter) py-[clamp(24px,4vw,56px)] lg:min-h-[calc(100svh-64px)] max-sm:min-h-[640px]"
    >
      {/* The poster frame from tour 13 (Southern slopes and valley view), retouched with a clear sky
          and warmer light. The tour itself keeps the original poster so it matches its video. */}
      <Image
        src="/images/home/tour-teaser-valley-sunny.jpg"
        alt="Dirt lane between rows of trees and a dry, grassy field, with hills under a blue sky."
        fill
        sizes="100vw"
        // Keep the lane and hills in view on tall screens, where a centered crop is mostly sky.
        className="-z-10 object-cover object-[50%_75%]"
      />
      <div className="flex max-w-[500px] flex-col gap-5 rounded-card bg-linen p-[clamp(24px,3vw,40px)]">
        <Reveal as="h2" kind="head" id="tour-title" className="text-section leading-none">
          See the land for yourself
        </Reveal>
        <Reveal as="p" kind="fade" className="text-xl">
          Drive the roads around the site in sixteen short clips, each matched to a map.
        </Reveal>
        <Link href="/tour" className={`mt-2 self-start ${buttonClass("primary", "lg")}`}>
          Start the tour
        </Link>
      </div>
    </section>
  );
}
