import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Contact"
      purpose="Reach Chelan Village, LP."
    />
  );
}
