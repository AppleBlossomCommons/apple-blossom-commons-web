import type { DistrictKey } from "./districts";

/**
 * TEMPORARY image areas for named places (docs/11-plan-and-districts-content.md, section 3).
 * Each one is a flat pale color with a label saying what goes there, until the generated or
 * licensed image arrives. Only places with a brief in docs/11 get an image; the rest are text only.
 * Don't use the masterplan's own mood images (docs/11, section 3).
 */
export type PlaceImage = { label: string; fill: string };

const placeImages: Partial<Record<DistrictKey, Record<string, PlaceImage>>> = {
  wine: {
    "Harvest Square": {
      label: "AI image, no people: small plaza at golden hour, low round fountain, fire pits with empty chairs, timber-and-stone pavilions",
      fill: "#FFF2B3",
    },
    "Vintner's Walk": {
      label: "AI image, no people: quiet lane between low timber-and-stone storefronts, string lights, empty café chairs, early morning",
      fill: "#FFE1ED",
    },
    "The Tasting Courtyard": {
      label: "AI image, no people: small courtyard of tasting-room doors, long table with empty wine glasses, vines overhead",
      fill: "#ECE7FC",
    },
    "Market Hall": {
      label: "AI image, no people: open-sided timber market hall, doors rolled up, produce crates and flowers, late-afternoon light",
      fill: "#EAF6CF",
    },
    "The Barrel House": {
      label: "AI image, no people: warm timber hall with stacked oak barrels, glass doors open to a terrace with fire pits",
      fill: "#FFE6CC",
    },
  },
};

export function getPlaceImage(district: DistrictKey, placeName: string): PlaceImage | undefined {
  return placeImages[district]?.[placeName];
}
