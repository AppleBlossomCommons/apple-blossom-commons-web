import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Districts" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Districts"
      purpose="Compare the ten districts at a glance: family, program and planning-concept figures."
    />
  );
}
