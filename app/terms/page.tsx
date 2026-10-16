import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Terms"
      purpose="Terms of use for this site."
    />
  );
}
