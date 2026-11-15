import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  AboutTheData,
  CloserLook,
  ExtraSections,
  ForYou,
  KeyFindings,
  MoreFromLibrary,
  ReportHeader,
  ReportLead,
  Responds,
  WhatsNext,
} from "@/components/research/ReportSections";
import { allReportSlugs, getReport } from "@/lib/research";

// One summary page per report (docs/15, section 4), built from data/research.json.
// Every slug is prebuilt (Cache Components needs at least one, even when nothing is published), but
// getReport() applies the draft rule: on production a draft renders as a 404, with none of its content.
export function generateStaticParams() {
  return allReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return {};
  return {
    title: report.title,
    description: report.metaDescription,
    openGraph: { title: report.title, description: report.metaDescription, images: [{ url: report.cover.photo, alt: report.cover.alt }] },
    // Drafts never reach search, even after the site launches (docs/15, section 0.4).
    ...(report.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Reading the slug happens inside <Suspense>, as on district pages (Next 16 instant navigation). */
export default function ReportPage({ params }: PageProps<"/research/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-2 h-[640px] rounded-hero-sm bg-sand sm:mx-4 sm:rounded-hero" />}>
      <ReportBody params={params} />
    </Suspense>
  );
}

async function ReportBody({ params }: { params: PageProps<"/research/[slug]">["params"] }) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  return (
    <>
      <ReportHeader report={report} />
      <ReportLead report={report} />
      <KeyFindings report={report} />
      <CloserLook report={report} />
      <ExtraSections report={report} />
      <Responds report={report} />
      <ForYou report={report} />
      <WhatsNext report={report} />
      <AboutTheData report={report} />
      <MoreFromLibrary report={report} />
    </>
  );
}
