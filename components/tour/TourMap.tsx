"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { buttonClass } from "@/components/site/buttons";
import type { TourMapProps } from "./TourMapLeaflet";

// Leaflet needs `window`, so the map only ever renders in the browser.
const TourMapLeaflet = dynamic(() => import("./TourMapLeaflet").then((m) => m.TourMapLeaflet), {
  ssr: false,
  loading: () => <div className="min-h-[320px] flex-1 rounded-card bg-map-frame" />,
});

/** A browser key, locked by Esri to the site's addresses. It is set in .env.local and in Vercel, never in git. */
const ESRI_KEY = process.env.NEXT_PUBLIC_ESRI_API_KEY ?? "";

type Props = Omit<TourMapProps, "apiKey" | "follow" | "fitRequest" | "onFail">;

/**
 * The map beside the video (docs/13 §4) with its Follow / Whole route buttons. Without a working
 * key it shows a calm linen panel instead; the video, list and landmarks keep working.
 */
export function TourMap(props: Props) {
  const [failed, setFailed] = useState(false);
  const [follow, setFollow] = useState(true);
  const [fitRequest, setFitRequest] = useState(0);

  if (!ESRI_KEY || failed) {
    return (
      <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-card bg-linen px-6 py-10 text-center text-muted">
        <p className="max-w-[32ch]">Map unavailable right now. The video and landmarks still work.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-[380px] flex-1 overflow-hidden rounded-card bg-map-frame lg:min-h-[320px]">
        <TourMapLeaflet
          {...props}
          apiKey={ESRI_KEY}
          follow={follow}
          fitRequest={fitRequest}
          onFail={() => setFailed(true)}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={follow}
          onClick={() => setFollow((f) => !f)}
          className={`${buttonClass("secondary", "sm")} aria-pressed:bg-gold aria-pressed:hover:bg-gold/80`}
        >
          Follow
        </button>
        <button type="button" onClick={() => setFitRequest((n) => n + 1)} className={buttonClass("secondary", "sm")}>
          Whole route
        </button>
      </div>
    </>
  );
}
