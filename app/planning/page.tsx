import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Planning Framework" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Planning Framework"
      purpose="Entitlements and infrastructure, stated plainly, and how the plan aligns with the City of Chelan Comprehensive Plan."
    />
  );
}
