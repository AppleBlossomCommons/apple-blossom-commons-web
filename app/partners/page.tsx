import type { Metadata } from "next";
import { ResearchBand } from "@/components/research/ResearchBand";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Partner with Us" };

export default function Page() {
  // The page is still a placeholder; "The research" band (docs/15, section 7) sits after its intro,
  // where the inquiry form will follow.
  return (
    <>
      <PagePlaceholder
        title="Partner with Us"
        purpose="For investors, operators, land buyers and developers: start a conversation with Chelan Village through a partner inquiry."
      />
      <ResearchBand />
    </>
  );
}
