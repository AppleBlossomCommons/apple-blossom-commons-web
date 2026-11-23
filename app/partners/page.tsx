import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Partner with Us" };

// The public reports now live only on /research (owner decision, Nov 22, 2026), so this page no
// longer carries "The research" band from docs/15, section 7.
export default function Page() {
  return (
    <PagePlaceholder
      title="Partner with Us"
      purpose="For investors, operators, land buyers and developers: start a conversation with Chelan Village through a partner inquiry."
    />
  );
}
