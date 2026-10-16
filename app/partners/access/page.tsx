import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Partner Access" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Partner Access"
      purpose="An invite-only data room for approved partners. Coming in a later phase."
    />
  );
}
