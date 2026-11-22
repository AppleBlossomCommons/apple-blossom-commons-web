import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ResearchLink } from "@/components/research/ResearchLink";
import { DistrictPageLink } from "@/components/plan/PlanPlaceSections";
import { FaqItem } from "@/components/site/FaqItem";
import { PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { ConceptText } from "@/components/site/Places";
import { getPlaceImage, PLAN_IMAGE_DIR, visionImages, type PlaceImage } from "@/lib/place-images";
import coupleBiking from "@/public/images/home/couple-biking-orchard.jpg";
import coupleWalking from "@/public/images/home/couple-walking-path.jpg";
import cottageDoor from "@/public/images/home/cottage-door-wreath.jpg";
import lakeView from "@/public/images/home/lake-chelan-view.jpg";
import morningMug from "@/public/images/home/morning-mug-lake.jpg";
import neighborsFence from "@/public/images/home/neighbors-garden-fence.jpg";

/**
 * The Life Plan part of The Plan: Neighborhoods for a lifetime, rebuilt image-first on Nov 20, 2026 (owner: "too
 * much text, not enough imagery; the word cloud looks ugly"). Copy is from docs/14 sections 4 and
 * 5, cut and regrouped, never reworded into new claims:
 * - The intro keeps one explanation instead of three.
 * - The four levels of support each get a photo.
 * - The ten reasons (was the BenefitCluster word cloud) sit in four photo groups, all readable
 *   without clicking.
 * - "What makes this one different" is a photo band.
 * - The three questions moved to the end of the page (LifePlanQuestions).
 */

const sectionPad = "px-5 py-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]";
const headingClass = "text-[34px] leading-none sm:text-[clamp(40px,4.2vw,60px)]";
const introClass = "max-w-[760px] text-xl leading-normal sm:text-[23px]";
const subheadingClass = "text-2xl leading-[1.1] tracking-[-0.02em] sm:text-[30px]";
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:decoration-hearth";

/* ------------------------------------------------------------------------------------------------
 * Photos
 * --------------------------------------------------------------------------------------------- */

/** A picture ready to draw: a file in public/images/plan (a slot) or a static import. */
type Photo = { src: string | StaticImageData; alt: string; ai?: boolean; focus?: string };

/** A slot from lib/place-images.ts, as a Photo, once its file is in place (`ready`). */
function fromSlot(slot: PlaceImage | undefined): Photo | undefined {
  if (!slot?.ready || !slot.file) return undefined;
  return { src: `${PLAN_IMAGE_DIR}/${slot.file}`, alt: slot.alt ?? "", ai: slot.source === "ai" };
}

/**
 * The slot's own picture when it's ready, otherwise a stand-in that already exists. So when a new
 * stock photo arrives (save it, set `ready: true` in lib/place-images.ts), it replaces the stand-in
 * here with no other change. No placeholder tiles on public pages (critique, Nov 20, 2026).
 */
function slotOr(slot: PlaceImage | undefined, standIn: Photo): Photo {
  return fromSlot(slot) ?? standIn;
}

// Stand-ins. These Home photos are AI images; like on Home, they carry no "Illustrative concept"
// label (owner decision, Nov 10, 2026), but the alt text says what they show.
const standIns = {
  morningMug: { src: morningMug, alt: "A coffee mug on a porch rail, looking over blossoming orchard rows to the lake." },
  coupleWalking: { src: coupleWalking, alt: "An older couple walks arm in arm along a quiet paved path between young trees and golden hills." },
  lakeView: { src: lakeView, alt: "A garden terrace with a lawn and flowering shrubs looking out over the lake and hills." },
  cottageDoor: { src: cottageDoor, alt: "The front door of a single-storey cottage, with a wreath, planters and apple blossoms.", focus: "object-[50%_40%]" },
  neighborsFence: { src: neighborsFence, alt: "Two older neighbors talking over a garden fence, with blossoming trees behind them.", focus: "object-[50%_55%]" },
  coupleBiking: { src: coupleBiking, alt: "An older couple rides bicycles down a gravel lane between blossoming trees, with the lake in the distance." },
} satisfies Record<string, Photo>;

const vision = (key: keyof typeof visionImages) => fromSlot(visionImages[key])!;

function PhotoFrame({
  photo,
  sizes,
  className = "",
  priority = false,
}: {
  photo: Photo;
  sizes: string;
  /** Sets the frame's shape (an aspect ratio, or a height). */
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-card bg-sand ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={typeof photo.src === "string" ? "empty" : "blur"}
        className={`object-cover ${photo.focus ?? ""}`}
      />
      {/* AI images of the plan carry this small label (docs/14, section 8). The alt text already says it. */}
      {photo.ai && <PlaceholderLabel inset={14}>Illustrative concept</PlaceholderLabel>}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Move in once, stay as your needs change (#life-plan; was "What is a Life Plan Community?")
 * --------------------------------------------------------------------------------------------- */

const steps: { title: string; text: string; slot: string; standIn: Photo }[] = [
  {
    title: "Independent living.",
    text: "Your own cottage, townhome or apartment, with the upkeep planned as a shared service.",
    slot: "Independent living",
    standIn: vision("home"),
  },
  {
    title: "A little help each day.",
    text: "Assisted living, for when everyday routines take more effort.",
    slot: "Assisted living",
    standIn: standIns.morningMug,
  },
  {
    title: "Memory care.",
    text: "Homes designed for people living with Alzheimer's or dementia, planned with staff trained in their care.",
    slot: "Memory care",
    standIn: standIns.coupleWalking,
  },
  {
    title: "Nursing care.",
    text: "Around-the-clock care for people who need it.",
    slot: "Nursing care",
    standIn: standIns.lakeView,
  },
];

/**
 * "Move in once, stay as your needs change" (#life-plan): the idea in plain words, then the four
 * levels as a photo path. Owner decision (Nov 20, 2026): lead with what it means, not the industry
 * term. "Life Plan Community" appears once, as a small line, for operators, investors and anyone
 * who meets the term elsewhere. The #life-plan id stays so old links keep working.
 */
export function LifePlan() {
  return (
    <section id="life-plan" aria-labelledby="life-plan-title" className={sectionPad}>
      <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:gap-5">
        <Reveal as="h2" kind="head" id="life-plan-title" className={headingClass}>
          Move in once, stay as your needs change
        </Reveal>
        <Reveal as="p" kind="fade" className={introClass}>
          Homes for active years and every level of care are planned together in one community. You move in while you&apos;re active and
          independent. If your needs change, more support is available close to your home, your friends and your routines.
        </Reveal>
        <Reveal as="p" kind="fade" className="max-w-[640px] text-muted">
          Planners call this a Life Plan Community. You may also hear the older name, &ldquo;continuing care retirement community&rdquo;.
        </Reveal>
      </div>

      <h3 className={`${subheadingClass} mb-6 sm:mb-8`}>One community, four levels of support</h3>
      <CarePath />
      <p className="mt-8 max-w-[640px] sm:mt-10">
        <strong>Orchard Grove</strong> is planned for the first step, with cottages and townhomes for active adults.{" "}
        <strong>Heritage Grove</strong>, next door, is planned for the other three, so more support is a short walk away. Most people move
        in at the first step.
      </p>
      <div className="mt-6 flex flex-col gap-x-10 gap-y-2 sm:flex-row sm:flex-wrap">
        <DistrictPageLink districtKey="orchardgrove">Explore Orchard Grove</DistrictPageLink>
      </div>
    </section>
  );
}

/**
 * The four levels as a path: a photo each, joined by a Deep Sage line with numbered stops. Across on
 * wide screens, down on phones. A real ordered list with the full text; the line is decoration.
 */
function CarePath() {
  return (
    <ol className="grid grid-cols-1 gap-10 min-[640px]:grid-cols-2 min-[640px]:gap-x-6 min-[1100px]:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} as="li" kind="card" index={i} className="relative flex flex-col gap-4">
          <PhotoFrame
            photo={slotOr(getPlaceImage("heritage", step.slot), step.standIn)}
            sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[16/9] min-[640px]:aspect-[4/3]"
          />
          <div className="relative flex items-center gap-3">
            <span
              aria-hidden="true"
              className="tabular relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border-[3px] border-sage-deep bg-linen text-base font-bold"
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute left-9 -right-6 top-1/2 hidden h-[3px] -translate-y-1/2 bg-sage-deep min-[1100px]:block" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{step.title}</h4>
            <p className="max-w-[340px]">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Why plan this way (was "Why people choose a Life Plan Community", the BenefitCluster word cloud)
 * --------------------------------------------------------------------------------------------- */

// The ten reasons, same titles and text as before (owner's Nov 20 toning-down kept), in four groups.
// "Shared meals" drops "and orchards" from docs/14 (Nov 13). "Costs you can plan for" is the generic
// form only: no promise on fees (docs/14, DECISION 2).
const groups: { title: string; photo: () => Photo; reasons: { title: string; text: string }[] }[] = [
  {
    title: "Health and an easy home",
    photo: () => slotOr(getPlaceImage("heritage", "Fitness for every age"), standIns.coupleWalking),
    reasons: [
      {
        title: "Designed for aging in place.",
        text: "Level paths, single-level homes, wider doorways and good lighting, so your home keeps working for you as your needs change.",
      },
      { title: "Care, close by.", text: "The hospital campus and nearby clinics are planned within a short walk." },
      { title: "Less upkeep.", text: "Home repairs, yard work and snow clearing are planned as shared services, so more of your time is your own." },
    ],
  },
  {
    title: "Homes and costs",
    photo: () => standIns.cottageDoor,
    reasons: [
      { title: "Homes at more than one price.", text: "A range of home types and sizes is planned, so more people can find one that fits." },
      {
        title: "Costs you can plan for.",
        text: "Many communities like this offer contracts that keep monthly costs steadier as care needs grow. How this will work at Apple Blossom Commons hasn't been decided yet.",
      },
    ],
  },
  {
    title: "Family and pets",
    photo: () => slotOr(getPlaceImage("heritage", "Pet-friendly homes"), standIns.morningMug),
    reasons: [
      { title: "Room for family.", text: "Guest suites in the clubhouses, so children and grandchildren can stay close when they visit. (concept)" },
      { title: "Room for pets.", text: "Pet-friendly homes are planned, with places to walk a dog close by. (concept)" },
    ],
  },
  {
    title: "Everyday life",
    photo: () => standIns.neighborsFence,
    reasons: [
      { title: "Neighbors close by.", text: "People at a similar stage of life, with clubhouses, courtyards and the village to meet in." },
      {
        title: "Shared meals.",
        text: "Dining rooms and cafés are planned, with food from the valley's own farms and choices for different diets. (concept)",
      },
      {
        title: "An engaged life.",
        text: "Hiking groups, classes, outings, gardening and community events, planned by and for the people who live here.",
      },
    ],
  },
];

/** "Why plan this way" (#why-life-plan): four photo groups, every reason in view. */
export function WhyLifePlan() {
  return (
    <section id="why-life-plan" aria-labelledby="why-title" className="px-5 pb-16 sm:px-[clamp(16px,4vw,56px)] sm:pb-[120px]">
      <Reveal as="h2" kind="head" id="why-title" className={`${headingClass} mb-10 max-w-[900px] sm:mb-14`}>
        Why plan this way
      </Reveal>
      <ul className="grid grid-cols-1 gap-x-10 gap-y-14 min-[760px]:grid-cols-2 sm:gap-y-20">
        {groups.map((group, i) => (
          <Reveal key={group.title} as="li" kind="card" index={i % 2} className="flex flex-col gap-6">
            <PhotoFrame photo={group.photo()} sizes="(min-width: 760px) 50vw, 100vw" className="aspect-[16/10]" />
            <h3 className={subheadingClass}>{group.title}</h3>
            <ul className="flex flex-col">
              {group.reasons.map((reason) => (
                <li key={reason.title} className="border-t border-line py-4 first:border-t-[3px] first:border-sage-deep">
                  <h4 className="inline font-bold">{reason.title}</h4> <ConceptText text={reason.text} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------
 * What makes this one different
 * --------------------------------------------------------------------------------------------- */

/** A wide photo with the one idea beside it: the senior neighborhoods are part of a whole community. */
export function DifferentBand() {
  return (
    <section aria-labelledby="different-title" className="px-2 sm:px-4">
      <Reveal
        kind="card"
        className="grid overflow-hidden rounded-hero-sm bg-sand sm:rounded-hero min-[1000px]:grid-cols-[7fr_5fr]"
      >
        <div className="relative aspect-[3/2] min-[1000px]:aspect-auto min-[1000px]:min-h-[560px]">
          <Image
            src={standIns.coupleBiking.src}
            alt={standIns.coupleBiking.alt}
            fill
            sizes="(min-width: 1000px) 58vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 px-6 py-10 sm:gap-5 sm:px-14 sm:py-16">
          <h2 id="different-title" className={subheadingClass}>
            What makes this one different
          </h2>
          <p className="text-xl leading-normal sm:text-[23px]">
            Many communities like this are a single campus set apart from town. Here, the senior neighborhoods are part of a larger community,
            next to family homes, parks, trails, a small village of cafés and tasting rooms, and a hospital campus.
          </p>
          <p>Grandchildren can visit the park, and a coffee in the village is a short stroll from home.</p>
          <ResearchLink slug="learning-from-others">What other communities teach us</ResearchLink>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Three quick questions (moved to the end of the page)
 * --------------------------------------------------------------------------------------------- */

export function LifePlanQuestions() {
  return (
    <section aria-labelledby="questions-title" className={sectionPad}>
      <div className="grid items-start gap-8 min-[1000px]:grid-cols-[minmax(0,380px)_1fr] min-[1000px]:gap-20">
        <h2 id="questions-title" className={subheadingClass}>
          Three quick questions
        </h2>
        <div>
          {/* Same answers as the Participate FAQs, so the site says one thing. No 55+ claim, no fee promise. */}
          <FaqItem question="Is it only for people 55 and older? Will there be entrance fees?">
            It&apos;s too early to say.{" "}
            <Link href="/participate#update-list" className={inlineLink}>
              Join the update list
            </Link>{" "}
            to hear as plans firm up.
          </FaqItem>
          <FaqItem question="Can I stay if my care needs change?">
            That&apos;s the goal. Independent homes, assisted living, memory care and nursing care are planned in one connected community.
          </FaqItem>
          <FaqItem question="When could I move in?">
            It&apos;s too early to say. Each neighborhood comes when there&apos;s real demand for it, and we&apos;ll share timing as plans firm up.
          </FaqItem>
        </div>
      </div>
    </section>
  );
}

export { PhotoFrame, vision as visionPhoto, type Photo };
