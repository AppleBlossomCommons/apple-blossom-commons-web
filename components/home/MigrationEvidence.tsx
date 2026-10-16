import Link from "next/link";
import { MigrationChart } from "@/components/evidence/MigrationChart";
import { container, eyebrow } from "@/components/site/layout";

/** "Who is moving to Chelan" (approved homepage mockup; docs/03). Keeps the required caveat. */
export function MigrationEvidence() {
  return (
    <section aria-labelledby="evidence-title" className={`${container} flex flex-wrap items-center gap-x-[72px] gap-y-3.5 py-10 sm:gap-y-12 sm:py-[88px]`}>
      <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3.5 sm:gap-[18px]">
        <p className={eyebrow}>Who is moving to Chelan</p>
        <h2
          id="evidence-title"
          className="text-[1.75rem] leading-[1.12] [text-wrap:wrap] sm:max-w-[18ch] sm:text-[2.5rem] sm:leading-[1.1] sm:tracking-[-0.01em]"
        >
          Chelan County gained adults aged 65 to 69 while King County lost them.
        </h2>
        <p className="hidden max-w-[54ch] text-ink-2 sm:block">
          Net migration rates for the same age band over 2010 to 2020 run in opposite directions. No public dataset
          links a mover’s age to the county they left, so this shows a pattern, not a proven flow.
        </p>
        <Link href="/research" className="hidden self-start font-semibold text-green underline hover:text-green-hover sm:inline">
          See the research summary →
        </Link>
      </div>
      {/* 578px basis = the mockup's 520px content box plus its padding and border. */}
      <div className="min-w-0 flex-[1_1_578px]">
        <MigrationChart uid="home-migration" />
      </div>
    </section>
  );
}
