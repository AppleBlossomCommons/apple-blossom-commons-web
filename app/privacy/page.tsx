import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Privacy"
      purpose="How this site handles personal information."
    />
  );
}
