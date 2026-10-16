import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { districts, getDistrict } from "@/lib/districts";

export function generateStaticParams() {
  return districts.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/districts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getDistrict(slug)?.name };
}

export default async function DistrictPage({ params }: PageProps<"/districts/[slug]">) {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (!district) notFound();
  return <PagePlaceholder title={district.name} purpose={district.summary} />;
}
