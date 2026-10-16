import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Chelan & the Region" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Chelan & the Region"
      purpose="Why Chelan and why this corridor: location, access, tourism and strengthening Downtown Chelan."
    />
  );
}
