"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Sections that moved off /plan when it was split (Nov 19, 2026). The part after "#" never reaches
 * the server, so next.config.ts can't redirect old links like /plan#village; this does it in the
 * browser. It also catches visitors whose browsers cached the old permanent redirects
 * (/connected-community → /plan#care-close-by, /chelan → /plan#why-chelan).
 */
const moved: Record<string, string> = {
  "life-plan": "/plan/living-and-care",
  "heritage-grove": "/plan/living-and-care",
  "care-close-by": "/plan/living-and-care",
  village: "/plan/village-and-outdoors",
  walking: "/plan/village-and-outdoors",
  outdoors: "/plan/village-and-outdoors",
  "why-chelan": "/plan/village-and-outdoors",
};

export function MovedSections() {
  const router = useRouter();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const page = moved[id];
    if (page) router.replace(`${page}#${id}`);
  }, [router]);
  return null;
}
