import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { FaqItem } from "@/components/site/FaqItem";

// FAQs from docs/10-content-v2.md ("FAQs"), with two changes, both flagged to the owner:
// - "Is the City a partner?" is left out: CLAUDE.md says never to name or address the City on
//   the site. Restore it here once the owner and Andy decide on wording.
// - "Is the plan approved?" shows the pack's answer without its "[Andy to confirm wording.]" note;
//   the wording still needs Andy's confirmation.
const inlineLink = "font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

const groups: { title: string; items: { q: string; a: ReactNode }[] }[] = [
  {
    title: "About the plan",
    items: [
      {
        q: "Who is behind Apple Blossom Commons?",
        a: "Chelan Village, LP, which owns the land and is responsible for the long-term plan. We work with builders, operators and other partners to bring each neighborhood to life over many years.",
      },
      {
        q: "Is the plan approved?",
        a: "Parts of the land already have zoning in place, and each neighborhood still goes through review before it is built.",
      },
      { q: "How fast will it be built?", a: "Slowly. The plan is designed to grow in phases over many years, one neighborhood at a time, as demand is real." },
      { q: "When might the first homes or businesses open?", a: "It's too early to say. We'll share timing as plans firm up." },
      // Added from docs/15-research-library-content.md, section 7.
      {
        q: "Where can I read your research?",
        a: (
          <>
            Our{" "}
            <Link href="/research" className={inlineLink}>
              Research Library
            </Link>{" "}
            has short, plain-language reports on growing older in the valley, care close by, lessons from other communities and the village
            economy, each with its sources. More reports are on the way.
          </>
        ),
      },
    ],
  },
  {
    title: "For neighbors",
    items: [
      {
        q: "Will this bring traffic and crowds?",
        a: "The plan is built around neighborhoods designed for walking and phased growth, so change comes gradually. Traffic and road access are studied as part of the review process.",
      },
      {
        q: "Who pays for roads, water and sewer upgrades?",
        a: "It's too early to say. These questions are worked out during the review process, and we'll share answers as they're settled.",
      },
      {
        q: "Will homes be used as short-term rentals?",
        a: "It's too early to say. We know this matters to Chelan, and we'll share our approach as plans firm up.",
      },
      {
        q: "Will there be housing for local workers and families?",
        a: "The plan includes family homes and apartments as well as senior living. Details are still being worked out.",
      },
      { q: "Will the parks and trails be open to the public?", a: "It's too early to say. We'll share plans as the parks are designed." },
      {
        q: "What happens to the open space and the views?",
        a: "Protecting open space and scenic views is a core part of the plan. A large share of the land is planned to stay open, with trails and a scenic overlook.",
      },
      {
        q: "How will wildfire and evacuation be handled?",
        a: "The plan follows Firewise design principles. Emergency access is reviewed as part of the approval process.",
      },
      {
        q: "Will it compete with downtown Chelan?",
        a: "The village is sized to serve people who live nearby and to add to what downtown offers, not to replace it.",
      },
    ],
  },
  {
    title: "For future residents and families",
    items: [
      { q: "Is it only for retirees?", a: "No. The plan includes homes for active adults and seniors, and family homes and apartments." },
      { q: "Is senior living 55+? Will there be entrance fees?", a: "It's too early to say. Join the update list to hear as plans firm up." },
      {
        q: "Can I stay if my care needs change?",
        a: "That's the goal. Independent homes, assisted living and memory care are planned in one connected community.",
      },
      { q: "How close is the hospital?", a: "The senior neighborhoods are planned within a short walk of the hospital campus." },
      { q: "What will homes cost?", a: "It's too early to say. We'll share pricing when homes are ready to offer." },
      { q: "How do I join the update list?", a: "Use the form on this page." },
    ],
  },
  {
    title: "For partners",
    items: [
      { q: "How do I invest or buy land?", a: "Visit Partner with Us and send an inquiry." },
      {
        q: "Can I see the detailed research?",
        a: "Approved partners can access detailed reports. Start with an inquiry on Partner with Us.",
      },
    ],
  },
];

/**
 * FAQs (#faqs): FaqItem disclosures in four groups. The first is open.
 */
export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="grid items-start gap-10 bg-sand px-5 py-14 sm:px-[clamp(16px,4vw,56px)] lg:px-(--frame-gutter) sm:py-[96px] min-[1000px]:grid-cols-[minmax(0,380px)_1fr] min-[1000px]:gap-20"
    >
      <Reveal as="h2" kind="head" id="faqs-title" className="text-[44px] leading-none sm:text-section sm:tracking-[-0.03em]">
        FAQs
      </Reveal>
      <div className="flex flex-col gap-10 sm:gap-14">
        {groups.map((group, g) => (
          <div key={group.title}>
            <h3 className="mb-1 text-[23px] tracking-[-0.015em] sm:mb-2 sm:text-[28px]">{group.title}</h3>
            {group.items.map((item, i) => (
              <FaqItem key={item.q} question={item.q} open={g === 0 && i === 0}>
                {item.a}
              </FaqItem>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
