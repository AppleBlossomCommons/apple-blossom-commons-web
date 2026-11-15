import Link from "next/link";
import type { ReactNode } from "react";
import { getReport } from "@/lib/research";

const linkClass =
  "inline-flex min-h-11 items-center self-start font-bold text-hearth underline decoration-sage-deep decoration-2 underline-offset-4 hover:text-hearth";

/**
 * A small "Read the research" link into one report (docs/15, section 7). It renders nothing when
 * the report can't be shown on this deployment (a draft on production), so no link ever 404s.
 */
export function ResearchLink({ slug, children, className = "" }: { slug: string; children: ReactNode; className?: string }) {
  if (!getReport(slug)) return null;
  return (
    <Link href={`/research/${slug}`} className={`${linkClass} ${className}`}>
      {children}&nbsp;<span aria-hidden="true">→</span>
    </Link>
  );
}
