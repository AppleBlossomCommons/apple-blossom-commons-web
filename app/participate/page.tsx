import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Faqs } from "@/components/participate/Faqs";
import { FeedbackForm } from "@/components/participate/FeedbackForm";
import { GetInTouch } from "@/components/participate/GetInTouch";
import { UpdateListForm } from "@/components/participate/UpdateListForm";
import { buttonClass } from "@/components/site/buttons";
import { JumpLink } from "@/components/site/JumpLink";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";

export const metadata: Metadata = {
  title: "How Can I Participate?",
  description: "Learn how the plan is reviewed, share your views, join the update list or get in touch.",
};

// Copy from docs/10-content-v2.md, "How Can I Participate? (/participate)".
const doorways: { href: `#${string}`; label: string }[] = [
  { href: "#neighbors", label: "I'm a Chelan neighbor" },
  { href: "#update-list", label: "I'm thinking about living here" },
  { href: "#families", label: "I'm helping a parent plan ahead" },
  { href: "#community", label: "I'm with a community group" },
  { href: "#partners", label: "I'm an investor or land buyer" },
];

const neighborItems = [
  {
    title: "How the plan is reviewed.",
    text: "Like any proposal, the plan goes through Chelan's public review process. That includes public hearings where anyone can speak, and comment periods where anyone can send written comments. Hearing dates are posted publicly in advance.",
  },
  {
    title: "Share your views, whatever they are.",
    text: "Supportive, critical or undecided, every view helps shape a better plan. You can speak at a public hearing, send a written comment during a comment period, or tell us directly using the form below.",
  },
];

const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";
const ruleItem = "flex flex-col border-t-[3px] border-sage-deep";

/** How Can I Participate? (Phase 1 handoff, How Can I Participate.dc.html). */
export default function ParticipatePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="participate-title" className="px-2 sm:px-4">
        <div className="relative isolate flex h-[540px] items-end overflow-hidden rounded-hero-sm px-5 pb-[26px] sm:h-[580px] sm:rounded-hero sm:px-16 sm:pb-[60px]">
          <PlaceholderImage
            gradient="linear-gradient(170deg, #FFE9F1 0%, #FFC4DB 30%, #B5D66E 60%, #6E9A2E 100%)"
            className="absolute inset-0 -z-10"
          />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(45_32_24/0)_30%,rgb(45_32_24/0.64)_100%)]" />
          <PlaceholderLabel inset={20}>
            AI image, no people: open orchard lane with a simple wooden bench, apple trees in spring bloom, soft morning light
          </PlaceholderLabel>
          <div className="grid w-full items-end gap-3.5 text-white min-[900px]:grid-cols-[1.3fr_1fr] min-[900px]:gap-16">
            <Reveal as="h1" kind="head" id="participate-title" className="text-[46px] leading-[0.98] sm:text-[clamp(56px,6.1vw,88px)] sm:leading-[0.96] sm:tracking-[-0.03em]">
              How can I participate?
            </Reveal>
            <Reveal as="p" kind="fade" className="pb-2 sm:text-[21px] sm:leading-normal">
              Apple Blossom Commons will take shape over many years, and the people of Chelan should have a voice in it. Here&apos;s how to learn
              more, share your views or get involved.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Doorways: jump links that glide to the sections below (components/site/JumpLink.tsx) */}
      <nav aria-label="Choose what fits you" className="px-2 pt-2 sm:px-4">
        <ul className="grid gap-1.5 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-2">
          {doorways.map((d) => (
            <li key={d.href} className="flex">
              <JumpLink
                href={d.href}
                className="flex min-h-[60px] w-full items-center justify-between gap-3 rounded-[14px] bg-sand px-[18px] font-display text-[21px] font-semibold leading-[1.1] tracking-[-0.015em] text-hearth no-underline transition-shadow duration-200 hover:text-hearth hover:shadow-[inset_0_0_0_2px_var(--gold)] sm:min-h-[132px] sm:flex-col sm:items-start sm:rounded-card sm:px-6 sm:py-[22px] sm:text-2xl"
              >
                {d.label}
                <span aria-hidden="true" className="text-[22px]">
                  ↓
                </span>
              </JumpLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* I'm a Chelan neighbor, with the feedback form */}
      <section
        id="neighbors"
        aria-labelledby="neighbors-title"
        className="grid items-start gap-7 px-5 pb-14 pt-16 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px] min-[1000px]:grid-cols-2 min-[1000px]:gap-20"
      >
        <div className="flex flex-col gap-7 sm:gap-9">
          <Reveal as="h2" kind="head" id="neighbors-title" className="text-4xl leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            I&apos;m a Chelan neighbor
          </Reveal>
          {neighborItems.map((item, i) => (
            <Reveal key={item.title} kind="card" index={i} className={`${ruleItem} gap-2 pt-4 sm:gap-2.5 sm:pt-[22px]`}>
              <h3 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
          <Reveal kind="card" index={2} className={`${ruleItem} gap-2 pt-4 sm:gap-2.5 sm:pt-[22px]`}>
            <h3 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">Stay informed.</h3>
            <p>
              <JumpLink href="#update-list" className={inlineLink}>
                Join the update list
              </JumpLink>{" "}
              for plan news and notice of public hearings.
            </p>
          </Reveal>
        </div>

        <div id="feedback" className="-mx-2 flex flex-col gap-3 sm:mx-0 sm:gap-4">
          <div className="rounded-[20px] bg-sand px-5 py-6 sm:rounded-[24px] sm:p-10">
            <FeedbackForm />
          </div>
          <p className="px-2 text-[15px] text-muted sm:text-base">
            Comments sent here go to Chelan Village, LP. To comment as part of the public review process, speak at a public hearing or send a
            written comment during the official comment period.
          </p>
        </div>
      </section>

      {/* I'm thinking about living here, with the update list form */}
      <section
        id="update-list"
        aria-labelledby="update-title"
        className="grid items-start gap-5 bg-sand px-3 py-14 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px] min-[1000px]:grid-cols-2 min-[1000px]:gap-20"
      >
        <div className="flex flex-col gap-3 px-2 sm:gap-6 sm:px-0">
          <Reveal as="h2" kind="head" id="update-title" className="text-4xl leading-none sm:text-[clamp(40px,4.2vw,60px)]">
            I&apos;m thinking about living here
          </Reveal>
          <Reveal as="p" kind="fade" className="max-w-[540px] sm:text-xl">
            It will be some time before homes are available. Join the update list and we&apos;ll let you know as homes and care options take
            shape.
          </Reveal>
        </div>
        <div className="rounded-[20px] bg-linen px-5 py-6 sm:rounded-[24px] sm:p-10">
          <UpdateListForm />
        </div>
      </section>

      {/* Three short sections */}
      <section className="grid gap-10 px-5 py-14 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px] min-[900px]:grid-cols-3 min-[900px]:gap-12">
        <Reveal kind="card" index={0} id="families" className={`${ruleItem} gap-3 pt-4 sm:gap-4 sm:pt-6`}>
          <h2 className="text-[28px] leading-[1.05] tracking-[-0.02em] sm:text-[34px]">I&apos;m helping a parent plan ahead</h2>
          <p>
            Many people start looking at senior living for a parent. The plan brings independent homes, assisted living and memory care together
            within a short walk of the hospital campus.{" "}
            <JumpLink href="#update-list" className={inlineLink}>
              Join the update list
            </JumpLink>{" "}
            to hear more as care options are planned.
          </p>
        </Reveal>
        <Reveal kind="card" index={1} id="community" className={`${ruleItem} gap-3 pt-4 sm:gap-4 sm:pt-6`}>
          <h2 className="text-[28px] leading-[1.05] tracking-[-0.02em] sm:text-[34px]">I&apos;m with a community group</h2>
          <p>
            Parks, trails and gathering places are a big part of the plan. If your group has ideas for how they could serve Chelan, we&apos;d like
            to hear from you.
          </p>
          <GetInTouch />
        </Reveal>
        <Reveal kind="card" index={2} id="partners" className={`${ruleItem} gap-3 pt-4 sm:gap-4 sm:pt-6`}>
          <h2 className="text-[28px] leading-[1.05] tracking-[-0.02em] sm:text-[34px]">I&apos;m an investor or land buyer</h2>
          <p>For investment, development and operating partnerships, visit Partner with Us.</p>
          <Link href="/partners" className={`mt-1 w-full sm:mt-2 sm:w-auto sm:self-start ${buttonClass("primary", "tall")}`}>
            Partner with Us
          </Link>
        </Reveal>
      </section>

      <Faqs />
    </>
  );
}
