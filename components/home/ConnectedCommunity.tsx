import Link from "next/link";
import healthData from "@/data/health-facts.json";
import { SourceChip } from "@/components/evidence/SourceChip";
import { container, eyebrow } from "@/components/site/layout";
import type { SourceId } from "@/lib/districts";

type Part = "label" | "short" | "date" | "tier";
type HealthFact = {
  id: string;
  text: string;
  textShort?: string;
  source: SourceId;
  chip: Part[];
  chipShort?: Part[];
  note?: string;
  phone: boolean;
};

const facts = healthData.facts as HealthFact[];

/**
 * Connected Community teaser (approved homepage mockup). Copy guardrails: docs/03 —
 * technology supports residents and care staff, never replaces care; Lake Chelan Health
 * is not called a partner.
 */
export function ConnectedCommunity() {
  return (
    <section aria-labelledby="health-title" className="border-y border-rule bg-surface-2">
      <div className={`${container} flex flex-wrap gap-x-[72px] gap-y-3.5 py-10 sm:gap-y-12 sm:py-[88px]`}>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-3.5 sm:gap-[18px]">
          <p className={eyebrow}>Connected Community</p>
          <h2
            id="health-title"
            className="text-[1.875rem] leading-[1.1] [text-wrap:wrap] sm:max-w-[16ch] sm:text-[2.75rem] sm:leading-[1.08] sm:tracking-[-0.01em]"
          >
            Planned around an established hospital campus.
          </h2>
          <p className="text-ink-2 sm:hidden">
            Senior living in Orchard Grove and Heritage Grove sits a short walk from the Lake Chelan Community Hospital
            campus.
          </p>
          <p className="hidden max-w-[56ch] text-[1.125rem] text-ink-2 sm:block">
            The Wellness District brings together the Lake Chelan Community Hospital campus and Columbia Valley
            Community Health, with senior living in Orchard Grove and Heritage Grove a short walk away. Technology
            concepts under exploration aim to support residents&apos; independence and the people who care for them,
            never to replace care.
          </p>
          <Link href="/connected-community" className="hidden self-start font-semibold text-green underline hover:text-green-hover sm:inline">
            Read the Connected Community vision →
          </Link>
        </div>

        <ul className="flex min-w-0 flex-[1_1_420px] flex-col">
          {facts.map((f, i) => (
            <li
              key={f.id}
              className={`flex-col gap-1.5 border-t pt-3 sm:flex sm:gap-2 sm:py-[18px] ${i === 0 ? "border-ink" : "border-rule"} ${
                f.phone ? "flex" : "hidden"
              }`}
            >
              <p className="text-[0.9375rem] sm:hidden">{f.textShort ?? f.text}</p>
              <p className="hidden sm:block">{f.text}</p>
              <SourceChip id={f.source} uid={`health-${f.id}-sm`} show={f.chipShort ?? f.chip} note={f.note} variant="plain" className="sm:hidden" />
              <SourceChip id={f.source} uid={`health-${f.id}`} show={f.chip} note={f.note} tone="surface-2" className="max-sm:hidden" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
