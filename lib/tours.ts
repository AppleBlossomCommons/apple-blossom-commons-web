import tourData from "@/data/tours.json";
import type { Anchor, LatLng } from "@/lib/tour-core";

/*
 * Site Tour data (docs/13-site-tour.md). data/tours.json is the one source for titles, routes,
 * pins and landmarks. Import this file from server components only: it reads the whole JSON,
 * and pages pass the public fields below to the client.
 */

export type TourKind = "drive" | "walk";

/** A named moment in a clip, t seconds in. */
export type Landmark = { t: number; label: string };

/** Public fields only. `sourceFile`, `status` and `posterTime` are provenance and never reach a page. */
export type Tour = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  kind: TourKind;
  /** Seconds, after any trim. The player uses the file's own duration once it loads. */
  duration: number;
  orientation: "portrait" | "landscape";
  /** File name under NEXT_PUBLIC_TOUR_VIDEO_BASE. */
  video: string;
  /** Path under public/. */
  poster: string;
  route?: LatLng[];
  point?: LatLng;
  anchors: Anchor[];
  landmarks: Landmark[];
};

const ll = (p: number[]): LatLng => [p[0], p[1]];

export const tours: Tour[] = tourData.tours
  .map((t) => ({
    id: t.id,
    order: t.order,
    title: t.title,
    subtitle: t.subtitle,
    kind: t.kind === "walk" ? ("walk" as const) : ("drive" as const),
    duration: t.duration,
    orientation: t.orientation === "portrait" ? ("portrait" as const) : ("landscape" as const),
    video: t.video,
    poster: t.poster,
    ...(t.route ? { route: t.route.map(ll) } : {}),
    ...(t.point ? { point: ll(t.point) } : {}),
    anchors: (t.anchors ?? []).map((a) => ({ t: a.t, ll: ll(a.ll) })),
    landmarks: (t.landmarks ?? []).map((l) => ({ t: l.t, label: l.label })),
  }))
  .sort((a, b) => a.order - b.order);

/** Starting map view before a route is fitted. */
export const tourMapStart = { center: ll(tourData.config.siteCenter), zoom: tourData.config.siteZoom };

/** Where the clips live (Vercel Blob, ends with "/"). Empty when the variable isn't set. */
export const tourVideoBase = process.env.NEXT_PUBLIC_TOUR_VIDEO_BASE ?? "";
