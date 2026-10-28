import { Reveal } from "@/components/motion/Reveal";

// FAQs from docs/10-content-v2.md ("FAQs"), with two changes, both flagged to the owner:
// - "Is the City a partner?" is left out: CLAUDE.md says never to name or address the City on
//   the site. Restore it here once the owner and Andy decide on wording.
// - "Is the plan approved?" shows the pack's answer without its "[Andy to confirm wording.]" note;
//   the wording still needs Andy's confirmation.
const groups: { title: string; items: { q: string; a: string }[] }[] = [
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
        q: "What happens to the orchards and the views?",
        a: "Protecting open space and scenic views is a core part of the plan, including a large orchard preserve.",
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
 * FAQs (#faqs): native <details> disclosures, so they work with the keyboard and without
 * JavaScript. The + turns into × when open (200ms; instant with reduced motion). The first is open.
 */
export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="grid items-start gap-10 bg-sand px-5 py-14 sm:px-[clamp(16px,4vw,56px)] sm:py-[120px] min-[1000px]:grid-cols-[minmax(0,380px)_1fr] min-[1000px]:gap-20"
    >
      <Reveal as="h2" kind="head" id="faqs-title" className="text-[44px] leading-none sm:text-[80px] sm:tracking-[-0.03em]">
        FAQs
      </Reveal>
      <div className="flex flex-col gap-10 sm:gap-14">
        {groups.map((group, g) => (
          <div key={group.title}>
            <h3 className="mb-1 text-[23px] tracking-[-0.015em] sm:mb-2 sm:text-[28px]">{group.title}</h3>
            {group.items.map((item, i) => (
              <details key={item.q} open={g === 0 && i === 0} className="group border-b border-line">
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-3.5 py-3 text-lg font-bold leading-[1.35] sm:min-h-[68px] sm:gap-5 sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-linen text-2xl font-normal transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[820px] pb-5 sm:pb-6 sm:pr-16">{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
