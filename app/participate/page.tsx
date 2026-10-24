import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "How Can I Participate?" };

// Placeholder until step 6 of the Phase 1 handoff builds this page.
export default function Page() {
  return (
    <PagePlaceholder
      title="How Can I Participate?"
      purpose="Ways for neighbors, future residents, families, community groups and partners to follow the plan and share their views."
    />
  );
}
