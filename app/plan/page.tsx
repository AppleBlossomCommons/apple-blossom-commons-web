import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const metadata: Metadata = { title: "The Plan" };

export default function Page() {
  return (
    <PagePlaceholder
      title="The Plan"
      purpose="Explore the whole site: the Plan Table with a 2D map and a 3D model view, the ten districts in legend order, evolving over decades."
    />
  );
}
