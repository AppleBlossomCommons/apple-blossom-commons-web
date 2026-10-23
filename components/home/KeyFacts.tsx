import keyFactData from "@/data/key-facts.json";
import { container } from "@/components/site/layout";
import { districts, type SourceId } from "@/lib/districts";

type Fact = {
  id: string;
  value: string | null;
  valueShort?: string;
  valueFrom?: "districtCount";
  label: string;
  labelShort: string;
  /** Kept in the data so every figure has a source; not shown on the homepage. */
  source: SourceId;
};

const facts = keyFactData.facts as Fact[];

/** Headline figures. Phones get the mockup's shorter wording. Sources live in data/sources.json, not on the homepage. */
export function KeyFacts() {
  return (
    <section aria-label="Key facts" className={`${container} pb-8 pt-8 sm:pb-12 sm:pt-12`}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-8">
        {facts.map((f) => {
          const value = f.valueFrom === "districtCount" ? String(districts.length) : (f.value ?? "");
          return (
            <li key={f.id} className="flex flex-col gap-1.5 border-t border-hearth pt-2.5 sm:gap-2 sm:pt-3.5">
              <p className="font-serif text-[1.875rem] font-semibold leading-none tabular sm:text-[2.5rem]">
                <span className="sm:hidden">{f.valueShort ?? value}</span>
                <span className="hidden sm:inline">{value}</span>
              </p>
              <p className="text-[0.875rem] text-muted sm:text-[0.9375rem]">
                <span className="sm:hidden">{f.labelShort}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
