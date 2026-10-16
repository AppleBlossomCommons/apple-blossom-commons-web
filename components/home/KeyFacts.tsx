import keyFactData from "@/data/key-facts.json";
import { SourceChip } from "@/components/evidence/SourceChip";
import { container } from "@/components/site/layout";
import { districts, type SourceId } from "@/lib/districts";

type Part = "label" | "short" | "date" | "tier";
type Fact = {
  id: string;
  value: string | null;
  valueShort?: string;
  valueFrom?: "districtCount";
  label: string;
  labelShort: string;
  source: SourceId;
  chip: Part[];
  chipShort: Part[];
};

const facts = keyFactData.facts as Fact[];

/** Four headline figures, each with its source chip. Phones get the mockup's shorter wording. */
export function KeyFacts() {
  return (
    <section aria-label="Key facts" className={`${container} pb-8 pt-8 sm:pb-12 sm:pt-12`}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-8">
        {facts.map((f) => {
          const value = f.valueFrom === "districtCount" ? String(districts.length) : (f.value ?? "");
          return (
            <li key={f.id} className="flex flex-col gap-1.5 border-t border-ink pt-2.5 sm:gap-2 sm:pt-3.5">
              <p className="font-serif text-[1.875rem] font-semibold leading-none tabular sm:text-[2.5rem]">
                <span className="sm:hidden">{f.valueShort ?? value}</span>
                <span className="hidden sm:inline">{value}</span>
              </p>
              <p className="text-[0.875rem] text-ink-2 sm:text-[0.9375rem]">
                <span className="sm:hidden">{f.labelShort}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </p>
              <div className="flex">
                <SourceChip id={f.source} uid={`fact-${f.id}-sm`} show={f.chipShort} variant="plain" className="sm:hidden" />
                <SourceChip id={f.source} uid={`fact-${f.id}`} show={f.chip} className="max-sm:hidden" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
