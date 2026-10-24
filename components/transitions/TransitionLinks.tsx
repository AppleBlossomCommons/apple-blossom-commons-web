"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useSiteTransition, type DistrictRef } from "./SiteTransition";

type LinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick">;

/** A plain left click (no new tab or window), which the transitions may take over. */
const isPlainClick = (e: MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * A link back to the Home map from a district page. With the transitions available it plays the
 * return (hero image covers the screen, then closes onto the map); otherwise it's a plain link.
 */
export function BackToMapLink(props: LinkProps) {
  const transition = useSiteTransition();
  return (
    <Link
      {...props}
      href="/#map"
      onClick={(e) => {
        if (!transition || !isPlainClick(e)) return;
        e.preventDefault();
        transition.toMap();
      }}
    />
  );
}

/**
 * A link to another district page that opens it with the circle transition, growing from the
 * click point (or the link's center, for a keyboard press).
 */
export function DistrictLink({ district, ...props }: LinkProps & { district: DistrictRef }) {
  const transition = useSiteTransition();
  return (
    <Link
      {...props}
      href={`/districts/${district.slug}`}
      onClick={(e) => {
        if (!transition || !isPlainClick(e)) return;
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        const fromPointer = e.clientX !== 0 || e.clientY !== 0;
        transition.toDistrict(district, fromPointer ? { x: e.clientX, y: e.clientY } : { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    />
  );
}
