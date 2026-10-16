import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Partner with Us" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Partner with Us"
      purpose="For investors, operators, land buyers and developers: start a conversation with Chelan Village through a partner inquiry."
    />
  );
}
