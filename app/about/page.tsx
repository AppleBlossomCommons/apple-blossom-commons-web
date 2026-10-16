import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Stewardship" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Stewardship"
      purpose="Who Chelan Village, LP is, how it plans, and how Apple Blossom Center and Apple Blossom Commons fit together."
    />
  );
}
