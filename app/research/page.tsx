import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Research Library" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Research Library"
      purpose="Public summaries of the research behind the plan, each with its sources."
    />
  );
}
