import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { DoorwayCards, type Doorway } from "@/components/site/DoorwayCards";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { eyebrow } from "@/components/site/layout";
import andyPortrait from "@/public/images/about/andy-yeung-portrait.webp";

// Copy from docs/12-about-us-content.md. Everything about Andy still needs his sign-off (section 9),
// and the optional pull quote and photo caption are left out until he approves them.
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the people behind Apple Blossom Commons, a community being planned slowly and carefully near Lake Chelan.",
};

const values = [
  {
    title: "Taking our time.",
    text: "Good places aren't built in a rush. Each neighborhood comes when there's real need for it.",
  },
  {
    title: "A home for every chapter.",
    text: "Families, active adults and people who need more care, all in one community, so a move doesn't mean leaving your neighbors.",
  },
  {
    title: "Care, close by.",
    text: "Senior homes are planned within a short walk of the hospital campus.",
  },
  {
    title: "Protecting what makes Chelan special.",
    text: "The views, the open space, the orchards and a small-town pace. A large orchard preserve is part of the plan.",
  },
  {
    title: "Adding to downtown, not competing with it.",
    text: "The village is sized for the people who live nearby, so it adds to what downtown Chelan already offers.",
  },
];

// Pale fills differ from the Home doorways so the pages don't look copied. No images are planned for these cards.
const helloCards: Doorway[] = [
  {
    href: "/participate#update-list",
    title: "Stay in the loop.",
    text: "Get news as homes and care options take shape.",
    cta: "Join the update list",
    fill: "#FFE6CC",
  },
  {
    href: "/participate#neighbors",
    title: "Share your views.",
    text: "Tell us what you think about the plan, whatever that is.",
    cta: "Give feedback",
    fill: "#DDF1FC",
  },
  {
    href: "/partners",
    title: "Build with us.",
    text: "For investors, operators and land buyers.",
    cta: "Partner with Us",
    fill: "#EAF6CF",
  },
];

const sectionPad = "px-5 py-14 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px]";
const sectionTitle = "text-4xl leading-none sm:text-[clamp(40px,4.2vw,60px)]";
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

export default function AboutPage() {
  return (
    <>
      {/* Intro: soft image header, no dark background */}
      <section aria-labelledby="about-title" className="px-2 sm:px-4">
        <div className="relative isolate flex h-[540px] items-end overflow-hidden rounded-hero-sm px-5 pb-[26px] sm:h-[580px] sm:rounded-hero sm:px-16 sm:pb-[60px]">
          <PlaceholderImage fill="#FFE6CC" className="absolute inset-0 -z-10" />
          <PlaceholderLabel inset={20}>
            AI image, no people: quiet orchard lane in spring bloom, lake glimpsed between the trees, soft morning light
          </PlaceholderLabel>
          <div className="grid w-full items-end gap-3.5 text-hearth min-[900px]:grid-cols-[1.3fr_1fr] min-[900px]:gap-16">
            <div className="flex flex-col gap-4">
              <Reveal as="p" kind="fade" className={`${eyebrow} text-hearth`}>
                About us
              </Reveal>
              <Reveal
                as="h1"
                kind="head"
                id="about-title"
                className="text-[46px] leading-[0.98] sm:text-[clamp(56px,6.1vw,88px)] sm:leading-[0.96] sm:tracking-[-0.03em]"
              >
                A place to call home, planned with patience
              </Reveal>
            </div>
            <Reveal as="p" kind="fade" className="pb-2 sm:text-[21px] sm:leading-normal">
              Apple Blossom Commons is a community being planned near Lake Chelan for people at every stage of life. Behind it are people who
              care about this place and want to get it right, even if that takes time.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section
        id="our-story"
        aria-labelledby="our-story-title"
        className={`grid items-center gap-10 min-[1000px]:grid-cols-2 min-[1000px]:gap-20 ${sectionPad}`}
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          <Reveal as="h2" kind="head" id="our-story-title" className={sectionTitle}>
            It started with an orchard
          </Reveal>
          <Reveal kind="fade" className="flex max-w-[600px] flex-col gap-4 sm:text-xl">
            <p>The land where Apple Blossom Commons will grow was once orchard, rows of fruit trees on the edge of town.</p>
            <p>
              When Andy Yeung looked at it, he saw the start of a village. A place where retirees and young families could live side by side.
              Where a cup of coffee, a visit to the doctor and a walk among the trees could all be close to home. Where people could stay in the
              community they love as their needs change.
            </p>
            <p>
              That idea became Apple Blossom Commons. It is still taking shape, and it will grow slowly, one neighborhood at a time, over many
              years.
            </p>
          </Reveal>
        </div>
        <Reveal kind="card" className="relative aspect-[4/3] overflow-hidden rounded-card">
          <PlaceholderImage fill="#FFE1ED" className="absolute inset-0" />
          <PlaceholderLabel>
            AI image, no people · Illustrative concept: close-up of apple blossoms on a branch, orchard rows softly out of focus behind
          </PlaceholderLabel>
        </Reveal>
      </section>

      {/* Meet Andy: photo beside the text on desktop, stacked on phones */}
      <section
        id="andy"
        aria-labelledby="andy-title"
        className={`grid items-center gap-8 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-20 ${sectionPad} pt-0 sm:pt-0`}
      >
        <Reveal kind="card" className="w-full max-w-[520px]">
          <Image
            src={andyPortrait}
            alt="Andy Yeung, founder of Apple Blossom Commons, standing on a hillside above Lake Chelan with mountains in the background."
            sizes="(min-width: 900px) 40vw, (min-width: 560px) 520px, 100vw"
            className="aspect-[4/5] h-auto w-full rounded-card object-cover object-[70%_30%]"
          />
        </Reveal>
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-2">
            <Reveal as="h2" kind="head" id="andy-title" className={sectionTitle}>
              Andy Yeung
            </Reveal>
            <Reveal as="p" kind="fade" className="text-lg font-bold sm:text-xl">
              Founder
            </Reveal>
          </div>
          <Reveal kind="fade" className="flex max-w-[600px] flex-col gap-4 sm:text-xl">
            <p>
              Apple Blossom Commons began with Andy Yeung&apos;s vision of a community with a true village feel, a place that welcomes seniors and
              families alike.
            </p>
            <p>
              Andy leads Chelan Village, LP, which looks after the land and the long-term plan. He has guided Apple Blossom Commons from the
              beginning, and his idea is still at its heart: a place where people feel at home, with neighbors close by and care within reach.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we care about */}
      <section id="values" aria-labelledby="values-title" className={`bg-sand ${sectionPad}`}>
        <Reveal as="h2" kind="head" id="values-title" className={`mb-10 sm:mb-14 ${sectionTitle}`}>
          What we care about
        </Reveal>
        <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, i) => (
            <Reveal key={item.title} as="li" kind="card" index={i} className="flex flex-col gap-3 border-t-[3px] border-sage-deep pt-6">
              <h3 className="text-[26px] leading-[1.1] tracking-[-0.015em] sm:text-[28px]">{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" kind="fade" className="mt-12 max-w-[640px] text-lg sm:mt-16 sm:text-xl">
          And we listen. Supportive, critical or undecided,{" "}
          <Link href="/participate#neighbors" className={inlineLink}>
            every view helps make a better plan
          </Link>
          .
        </Reveal>
      </section>

      {/* Who we are */}
      <section
        id="who-we-are"
        aria-labelledby="who-title"
        className={`grid items-start gap-10 min-[1000px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[1000px]:gap-20 ${sectionPad}`}
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          <Reveal as="h2" kind="head" id="who-title" className={sectionTitle}>
            Who we are
          </Reveal>
          <Reveal kind="fade" className="flex max-w-[640px] flex-col gap-4 sm:text-xl">
            <p>
              Chelan Village, LP owns the land and looks after the long-term plan. Think of us as caretakers. We aren&apos;t planning to build
              every home ourselves. Our job is to shape the plan, take care of the land, and welcome builders, care providers and local
              businesses who share our long view.
            </p>
            <p>Like any proposal, each neighborhood goes through Chelan&apos;s public review process before it is built.</p>
          </Reveal>
        </div>
        <Reveal kind="card" className="flex flex-col gap-3 rounded-[20px] bg-sand px-6 py-7 sm:rounded-[24px] sm:p-10 min-[1000px]:mt-2">
          <h3 className="text-[26px] leading-[1.1] tracking-[-0.015em] sm:text-[30px]">Center or Commons?</h3>
          <p>
            You may see two names. Apple Blossom Center is the name of the land and its planning framework. Apple Blossom Commons is the
            community we hope to grow there: the homes, the paths, the village and the people. Same place, same plan.
          </p>
        </Reveal>
      </section>

      {/* Say hello */}
      <DoorwayCards
        id="say-hello"
        doorways={helloCards}
        heading={{
          id: "say-hello-title",
          title: "Come say hello",
          text: "Whether you live in Chelan, are thinking about living here or want to build something with us, we'd love to hear from you.",
        }}
      />
    </>
  );
}
