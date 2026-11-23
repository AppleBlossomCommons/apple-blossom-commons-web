"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import lakeView from "@/public/images/home/lake-chelan-view.jpg";
import morningMug from "@/public/images/home/morning-mug-lake.jpg";
import porch from "@/public/images/home/porch-every-chapter.jpg";
import coupleBiking from "@/public/images/home/couple-biking-orchard.jpg";
import coupleWalking from "@/public/images/home/couple-walking-path.jpg";

type Step = {
  title: string;
  line: string;
  photo: StaticImageData;
  /** Which part of the photo stays in view when the card crops it (Tailwind object-position class). */
  focus?: string;
};

// Copy from docs/10-content-v2.md, Home section 2 (the five collage tiles, in the same order).
const steps: Step[] = [
  {
    title: "Once in a Generation",
    line: "Land like this, planned with this much care, comes along rarely.",
    photo: lakeView,
  },
  {
    title: "A New Way to Retire",
    line: "Paths designed for walking and biking, care close by, and room for the grandkids.",
    // EXPERIMENT: AI image with people, not yet allowed by docs/10-content-v2.md (needs sign-off).
    photo: coupleBiking,
  },
  {
    title: "Home for Every Chapter",
    line: "Stay in the community you love as your needs change.",
    // EXPERIMENT: this AI image shows people, which docs/10-content-v2.md doesn't allow yet.
    // Needs owner and Andy sign-off (and a docs update) before it goes public.
    // No "Illustrative concept" label (owner decision, Nov 10, 2026), although
    // docs/10-content-v2.md asks for one on images that show Apple Blossom Commons buildings.
    photo: porch,
    // Keeps the grandmother and child both in view on the wide card.
    focus: "object-[42%_50%]",
  },
  {
    title: "Unhurried",
    line: "Mornings with nowhere you have to be.",
    photo: morningMug,
  },
  {
    title: "Care, Close By",
    line: "The hospital campus is a short walk from home.",
    // EXPERIMENT: AI image with people, not yet allowed by docs/10-content-v2.md (needs sign-off).
    photo: coupleWalking,
  },
];

/**
 * The Home photo steps (owner request, Nov 20–21, 2026, after villiers.ai's "How does it work?"),
 * replacing the five-tile collage. Each step is a text row (title, and on wide screens its line)
 * followed by its photo. As you scroll, each row sticks a little below the one before, so the
 * earlier titles stay in view as a running list, and the next row and photo slide up over the
 * current photo. On phones the rows hold the title only and the line sits on the photo, so the
 * stacked rows leave room for the picture.
 *
 * Rows and photos are siblings (each step's wrapper is display: contents) because sticky elements
 * only stick within their parent box, and all ten must share one. Sticking is plain CSS (native
 * scrolling); with reduced motion nothing sticks and the steps simply follow one another.
 *
 * Row heights are fixed (52px phones, 72px wide screens) so each sticks exactly one row lower.
 * The section has no bottom padding: the last photo and its margin end exactly at the bottom of
 * the screen (plus 2px of overlap, so rounding never leaves a gap above it), so the stack is complete when the section pins and the map slides over it. Padding
 * there would push the last photo up over the titles first.
 */
export function PhotoSteps() {
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Photos before this index are fully covered by the next row and photo.
  const [covered, setCovered] = useState(0);

  // The current step is the last photo whose top has passed the middle of the screen. A photo
  // counts as covered once the next photo has stuck one row below it; covered photos are faded
  // out, or their antialiased edges show as hairlines around the rows and rounded corners on top.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const tops = photos.current.map((el) => el?.getBoundingClientRect().top ?? Infinity);
      let i = 0;
      tops.forEach((top, k) => {
        if (top < mid) i = k;
      });
      setActive(i);
      let c = 0;
      for (let k = 0; k + 1 < tops.length; k++) {
        const row = photos.current[k + 1]?.previousElementSibling as HTMLElement | null;
        if (row && tops[k + 1] - tops[k] <= row.offsetHeight + 2) c = k + 1;
      }
      setCovered(c);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="steps-title"
      className="grid grid-cols-1 gap-x-[clamp(24px,4vw,64px)] bg-linen px-[clamp(16px,2.4vw,32px)] lg:px-(--frame-gutter) pt-[clamp(40px,5vw,72px)] lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
    >
      <div>
        {/* New short heading written in the build; it needs a read by the owner and Andy. */}
        <h2
          id="steps-title"
          className="mb-8 max-w-[420px] text-section leading-none lg:sticky lg:top-[100px] lg:mb-0"
        >
          Life at Apple Blossom Commons
        </h2>
      </div>

      <div>
        {steps.map((s, i) => {
          const current = i === active;
          return (
            <div key={s.title} className="contents" style={{ "--i": i } as CSSProperties}>
              {/* The text row. Opaque, so it covers the photo before it as it slides up. */}
              <div
                className="relative flex h-[52px] items-center bg-linen motion-safe:sticky motion-safe:top-[calc(76px+var(--i)*52px)] lg:grid lg:h-[72px] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start lg:gap-x-8 lg:pt-3 lg:motion-safe:top-[calc(88px+var(--i)*72px)]"
              >
                <h3
                  className={`flex items-center gap-3 text-[22px] leading-[1.15] transition-colors duration-200 lg:text-[24px] ${current ? "text-hearth" : "text-muted"}`}
                >
                  {/* Marks the step in view. */}
                  <span
                    aria-hidden="true"
                    className={`h-[3px] w-5 shrink-0 rounded-full transition-colors duration-200 ${current ? "bg-sage-deep" : "bg-line"}`}
                  />
                  {s.title}
                </h3>
                <p
                  className={`hidden text-[20px] leading-[1.3] transition-colors duration-200 lg:block ${current ? "text-hearth" : "text-muted"}`}
                >
                  {s.line}
                </p>
              </div>

              {/* The photo sticks one row below its own row, so the next row covers its top and
                  the next photo the rest. The height leaves room for all five rows above it. */}
              <div
                ref={(el) => {
                  photos.current[i] = el;
                }}
                // Covered photos fade out with opacity, not visibility, so the line on them
                // (phones) stays readable to screen readers.
                className={`relative isolate mb-4 flex h-[clamp(240px,calc(100svh-76px-5*52px-14px),520px)] flex-col justify-end overflow-hidden rounded-[clamp(16px,1.6vw,24px)] p-6 text-white motion-safe:sticky motion-safe:top-[calc(76px+(var(--i)+1)*52px)] lg:mb-6 lg:h-[clamp(280px,calc(100svh-88px-5*72px-22px),560px)] lg:motion-safe:top-[calc(88px+(var(--i)+1)*72px)] ${i < covered ? "opacity-0" : ""}`}
              >
                {/* Decorative: the row's heading carries the message, so the photo has empty alt text. */}
                <Image
                  src={s.photo}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className={`-z-10 object-cover ${s.focus ?? "object-[50%_45%]"}`}
                />
                {/* Phones: the line sits on the photo, white on a soft dark-brown fade
                    (docs/04-design-direction.md, rule 3). Wide screens show it in the row instead. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(59_47_42/0.78)_0%,rgb(59_47_42/0.6)_35%,rgb(59_47_42/0)_70%)] lg:hidden"
                />
                <p className="max-w-[440px] text-[20px] leading-snug lg:hidden">{s.line}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
