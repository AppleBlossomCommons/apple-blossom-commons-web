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
  // Heritage Grove (docs/14-plan-vision-content.md, 8.3, slots H1–H10). Licensed stock (people OK,
  // with model releases) for the four levels of care; AI, no people, for the spaces.
  heritage: {
    "Independent living": { label: "Licensed stock with people: active senior couple on a cottage porch", fill: "#FFF2B3" },
    "Assisted living": { label: "Licensed stock with people: caregiver and senior woman smiling in a living room", fill: "#FFE1ED" },
    "Memory care": { label: "Licensed stock with people: senior woman and caregiver reading together", fill: "#ECE7FC" },
    "Nursing care": { label: "Licensed stock with people: nurse with a senior woman in a garden; nothing like a hospital ward", fill: "#EAF6CF" },
    "Garden courtyards": {
      label: "AI image, no people: sheltered garden courtyard, looping level path, benches in the sun, small fountain, herb beds",
      fill: "#EAF6CF",
    },
    "Shared clubhouses": {
      label: "AI image, no people: clubhouse library and lounge, bookshelves, stone fireplace, armchairs, card table",
      fill: "#FFE6CC",
    },
    "Fitness for every age": {
      label: "AI image, no people: bright senior fitness studio, light weights, balance bars, mats, big windows",
      fill: "#EAF6FD",
    },
    Dining: { label: "AI image, no people: warm bistro dining room set for lunch, linen napkins, bowl of local apples", fill: "#FFF2B3" },
    "Activities and classes": {
      label: "AI image, no people: art studio with easels and half-finished watercolor landscapes, tall windows",
      fill: "#FFE1ED",
    },
    "Pet-friendly homes": {
      label: "AI image, no people or animals: small fenced dog run in a courtyard, bench with a leash and a ball",
      fill: "#ECE7FC",
    },
  },
};

export function getPlaceImage(district: DistrictKey, placeName: string): PlaceImage | undefined {
  return placeImages[district]?.[placeName];
}

/**
 * TEMPORARY image areas for The Plan's "A different kind of retirement" pillars
 * (docs/14-plan-vision-content.md, section 8.2, slots V1–V3).
 */
export const visionImages = {
  home: {
    label: "AI image, no people: single-storey cottage with a deep porch, two rocking chairs, a level path to the door, morning light",
    fill: "#FFE6CC",
  },
  care: {
    label: "Licensed stock with people: senior couple walking a sunny garden path; no hospital or clinical scenes",
    fill: "#EAF6CF",
  },
  technology: {
    label: "AI image, no people: bright cottage living room, small tablet on a side table, soft hallway night lighting, view to golden hills",
    fill: "#EAF6FD",
  },
} satisfies Record<string, PlaceImage>;
