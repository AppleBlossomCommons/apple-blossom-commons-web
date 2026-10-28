import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ConceptText } from "@/components/site/Places";

export type RuleItem = { title: string; text: string; extra?: ReactNode };

const layouts = {
  /** As many columns as fit (How it fits together). */
  auto: "grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-7 sm:gap-10",
  /** 3 × 2 on desktop, 2 on tablets, 1 on phones (What guides the plan). */
  three: "grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3",
  /** One column, items stacked (beside a diagram). */
  stack: "grid-cols-1 gap-7 sm:gap-8",
};

/**
 * Short items, each under a 3px Deep Sage rule: a title and a line of text. A text ending in
 * "(concept)" shows that word muted. `extra` adds something after the text, such as a link.
 */
export function RuleList({ items, layout = "auto" }: { items: RuleItem[]; layout?: keyof typeof layouts }) {
  return (
    <ul className={`grid ${layouts[layout]}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} as="li" kind="card" index={i} className="flex flex-col gap-2 border-t-[3px] border-sage-deep pt-4 sm:gap-3 sm:pt-6">
          <h3 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{item.title}</h3>
          <p>
            <ConceptText text={item.text} />
          </p>
          {item.extra}
        </Reveal>
      ))}
    </ul>
  );
}
