import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "Site Tour" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Site Tour"
      purpose="A remote site visit: verified drive and walk footage synced to a map of the site."
    />
  );
}
