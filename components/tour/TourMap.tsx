"use client";

/**
 * The map beside the video (docs/13 §4). Pass 1 of the build: always the calm fallback panel that
 * shows when the map can't load. Pass 2 adds the Leaflet map with Esri tiles.
 */
export function TourMap() {
  return (
    <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-card bg-linen px-6 py-10 text-center text-muted">
      <p className="max-w-[32ch]">Map unavailable right now. The video and landmarks still work.</p>
    </div>
  );
}
