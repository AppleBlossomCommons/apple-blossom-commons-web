import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Connected Community" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Connected Community"
      purpose="How a strong medical system, technology and retirement living come together, starting from what can be verified."
    />
  );
}
