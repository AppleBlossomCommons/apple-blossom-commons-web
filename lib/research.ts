// Research Library content, from data/research.json (docs/15-research-library-content.md).
// All report copy and chart data live in that file; components never type report text.
import researchData from "@/data/research.json";

export type ReportStatus = "draft" | "published";

export type Finding = {
  stat: string | null;
  statLabel: string | null;
  title: string;
  text: string;
  /** The closing finding, shown full width in a soft panel. */
  highlight?: boolean;
};

type ChartBase = {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  source: string;
  /** Read out by screen readers in place of the drawing. */
  a11ySummary: string;
  note?: string;
};

export type ColumnsChart = ChartBase & {
  type: "columns";
  valueLabel: string;
  highlight: number[];
  projectedFrom: number;
  data: { x: number; value: number; basis: string }[];
};
export type BarsWithReferenceChart = ChartBase & {
  type: "barsWithReference";
  valueFormat: "usd";
  data: { label: string; value: number }[];
  reference: { label: string; value: number; display: string };
};
export type RangeBarsChart = ChartBase & {
  type: "rangeBars";
  unit: string;
  data: { label: string; min: number; max: number; display: string }[];
};
export type StatTilesChart = ChartBase & {
  type: "statTiles";
  data: { value: string; label: string }[];
};
export type TimelineChart = ChartBase & {
  type: "timeline";
  axis: { from: number; to: number };
  data: { label: string; kind: string; start: number; startLabel: string; end: number; endLabel: string }[];
};
export type StackedShareChart = ChartBase & {
  type: "stackedShare";
  data: { label: string; parts: { name: string; value: number; share: number }[] }[];
};
export type GroupedBarsChart = ChartBase & {
  type: "groupedBars";
  valueFormat: "usdMillions";
  series: string[];
  data: { label: string; values: number[] }[];
};
export type BarsChart = ChartBase & {
  type: "bars";
  valueFormat: "usdMillions";
  data: { label: string; value: number; share: number }[];
  highlight: string[];
};

export type Chart =
  | ColumnsChart
  | BarsWithReferenceChart
  | RangeBarsChart
  | StatTilesChart
  | TimelineChart
  | StackedShareChart
  | GroupedBarsChart
  | BarsChart;

export type ExtraSection = {
  id: string;
  heading: string;
  intro: string;
  items: { title: string; text: string }[];
  concept?: boolean;
};

export type RespondsRow = { found: string; planned: string; district?: string; concept?: boolean };

export type Report = {
  number: number;
  slug: string;
  status: ReportStatus;
  title: string;
  subtitle: string;
  updated: string;
  updatedLabel: string;
  pages: number;
  pdf: { href: string; sourceFile: string };
  cover: { thumb: string; photo: string; alt: string };
  card: string;
  metaDescription: string;
  lead: string;
  findings: Finding[];
  charts: Chart[];
  extraSections: ExtraSection[];
  responds: { intro: string; rows: RespondsRow[]; note: string };
  forYou: { audience: string; text: string }[];
  next: string[];
  aboutTheData: string;
  sources: { name: string; use: string; date: string; url?: string }[];
  related: string[];
};

export type PlannedReport = { number: number; title: string; subtitle: string; showOnSite: boolean };

const data = researchData as unknown as { reports: Report[]; planned: PlannedReport[] };

/**
 * The draft rule (docs/15, section 0.4). Production lists and builds only published reports;
 * preview deployments and local dev show drafts too, labeled and kept out of search.
 * VERCEL_ENV is set by Vercel at build time ("production", "preview" or "development").
 */
export const showDrafts = process.env.VERCEL_ENV !== "production";

export function isVisible(report: Pick<Report, "status">) {
  return report.status === "published" || showDrafts;
}

/** Every report the current deployment may show, in report order. */
export function visibleReports(): Report[] {
  return data.reports.filter(isVisible).sort((a, b) => a.number - b.number);
}

/** One report by slug, or undefined if it doesn't exist or is a draft on production. */
export function getReport(slug: string): Report | undefined {
  const report = data.reports.find((r) => r.slug === slug);
  return report && isVisible(report) ? report : undefined;
}

/** Every report's slug, drafts included: only for prebuilding routes, never for listing. */
export function allReportSlugs(): string[] {
  return data.reports.map((r) => r.slug);
}

/** Reports in the pipeline that may be named on the library page. */
export function plannedReports(): PlannedReport[] {
  return data.planned.filter((p) => p.showOnSite).sort((a, b) => a.number - b.number);
}

/** Accessible name for a download link, e.g. "Download Growing Older by the Lake (PDF, 11 pages)". */
export function downloadLabel(report: Report) {
  return `Download ${report.title} (PDF, ${report.pages} pages)`;
}

/** "Related research" on district pages (docs/15, section 7): district slug → report slug. */
export const districtResearch: Record<string, string> = {
  "orchard-grove": "growing-older-by-the-lake",
  "heritage-grove": "growing-older-by-the-lake",
  "wellness-district": "care-close-by",
  "wine-village": "village-economy",
};
