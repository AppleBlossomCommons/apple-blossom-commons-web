import type { DistrictKey } from "./districts";

/**
 * Image slots for named places and The Plan's pillars (docs/11-plan-and-districts-content.md,
 * section 3, and docs/14-plan-vision-content.md, section 8).
 *
 * Until a picture arrives, each slot shows a flat pale color (`fill`) with a label saying what goes
 * there (`label`). Each slot also knows the picture it is waiting for: its file name, its alt text
 * and whether it is an AI image or licensed stock.
 *
 * TO SWAP IN A PICTURE:
 * 1. Save the file to public/images/plan/ with the name in `file` (3:2 landscape, WebP).
 * 2. Check the alt text still describes the picture (stock alt texts are drafts until the photo is chosen).
 * 3. Set `ready: true` on that slot. The card then shows the photo, and an AI image gets the
 *    small "Illustrative concept" label (docs/14, section 8).
 * For licensed stock, note its source and license in data/sources.json or an image-credits list.
 *
 * Never use the masterplan's own pictures (reference/masterplan-images/) on the site (docs/14, section 9).
 */
export type PlaceImage = {
  /** Placeholder note for reviewers; screen readers skip it. */
  label: string;
  /** Placeholder color. */
  fill: string;
  /** File name in public/images/plan/. */
  file?: string;
  alt?: string;
  /** "ai" images show no people and carry the "Illustrative concept" label; "stock" is licensed, people OK. */
  source?: "ai" | "stock";
  /** Set to true once the file is in public/images/plan/. */
  ready?: boolean;
};

/** Folder the slot files live in. */
export const PLAN_IMAGE_DIR = "/images/plan";

const placeImages: Partial<Record<DistrictKey, Record<string, PlaceImage>>> = {
  // The village at the center (docs/14, 8.1). Alt texts from the pack.
  wine: {
    "Harvest Square": {
      label: "AI image, no people: small plaza at golden hour, low round fountain, fire pits with empty chairs, timber-and-stone pavilions",
      fill: "#FFF2B3",
      file: "village-harvest-square.webp",
      source: "ai",
      alt: "Illustrative concept of Harvest Square: a quiet stone plaza with a round fountain and fire pits, framed by low timber pavilions and golden hills.",
    },
    "Vintner's Walk": {
      label: "AI image, no people: quiet lane between low timber-and-stone storefronts, string lights, empty café chairs, early morning",
      fill: "#FFE1ED",
      file: "village-vintners-walk.webp",
      source: "ai",
      alt: "Illustrative concept of Vintner's Walk: a quiet lane of timber and stone shopfronts with café tables, planters and string lights.",
    },
    "The Tasting Courtyard": {
      label: "AI image, no people: small courtyard of tasting-room doors, long table with empty wine glasses, vines overhead",
      fill: "#ECE7FC",
      file: "village-tasting-courtyard.webp",
      source: "ai",
      alt: "Illustrative concept of the Tasting Courtyard: a ring of small tasting rooms around a long table under a vine-covered pergola.",
    },
    "Market Hall": {
      label: "AI image, no people: open-sided timber market hall, doors rolled up, produce crates and flowers, late-afternoon light",
      fill: "#EAF6CF",
      file: "village-market-hall.webp",
      source: "ai",
      alt: "Illustrative concept of Market Hall: an open timber hall with tables of fruit, vegetables and flowers, doors rolled up to a terrace.",
    },
    "The Barrel House": {
      label: "AI image, no people: warm timber hall with stacked oak barrels, glass doors open to a terrace with fire pits",
      fill: "#FFE6CC",
      file: "village-barrel-house.webp",
      source: "ai",
      alt: "Illustrative concept of the Barrel House: a tall timber winery hall with oak barrels inside and a terrace with fire pits.",
    },
  },
  // Heritage Grove (docs/14, 8.3, slots H1–H10). The pack gives no alt text here, so these are drafts:
  // stock for the four levels of care (people OK, with model releases), AI with no people for the spaces.
  heritage: {
    "Independent living": {
      label: "Licensed stock with people: active senior couple on a cottage porch",
      fill: "#FFF2B3",
      file: "heritage-independent.webp",
      source: "stock",
      alt: "An older couple relaxing together on the porch of a cottage.",
    },
    "Assisted living": {
      label: "Licensed stock with people: caregiver and senior woman smiling in a living room",
      fill: "#FFE1ED",
      file: "heritage-assisted.webp",
      source: "stock",
      alt: "A caregiver and an older woman smiling together in a sunny living room.",
    },
    "Memory care": {
      label: "Licensed stock with people: senior woman and caregiver reading together",
      fill: "#ECE7FC",
      file: "heritage-memory-care.webp",
      source: "stock",
      alt: "An older woman and a caregiver reading a book together.",
    },
    "Nursing care": {
      label: "Licensed stock with people: nurse with a senior woman in a garden; nothing like a hospital ward",
      fill: "#EAF6CF",
      file: "heritage-nursing.webp",
      source: "stock",
      alt: "A nurse walking with an older woman in a garden.",
    },
    "Garden courtyards": {
      label: "AI image, no people: sheltered garden courtyard, looping level path, benches in the sun, small fountain, herb beds",
      fill: "#EAF6CF",
      file: "heritage-courtyard.webp",
      source: "ai",
      alt: "Illustrative concept of a garden courtyard: a level path loops past benches, herb beds and a small fountain between low timber-and-stone homes.",
    },
    "Shared clubhouses": {
      label: "AI image, no people: clubhouse library and lounge, bookshelves, stone fireplace, armchairs, card table",
      fill: "#FFE6CC",
      file: "heritage-clubhouse.webp",
      source: "ai",
      alt: "Illustrative concept of a clubhouse lounge: bookshelves, a stone fireplace, armchairs and a card table by a window to the hills.",
    },
    "Fitness for every age": {
      label: "AI image, no people: bright senior fitness studio, light weights, balance bars, mats, big windows",
      fill: "#EAF6FD",
      file: "heritage-fitness.webp",
      source: "ai",
      alt: "Illustrative concept of a fitness studio with light weights, balance bars, mats and large windows to green trees.",
    },
    Dining: {
      label: "AI image, no people: warm bistro dining room set for lunch, linen napkins, bowl of local apples",
      fill: "#FFF2B3",
      file: "heritage-dining.webp",
      source: "ai",
      alt: "Illustrative concept of a bistro dining room set for lunch, with wooden tables, a bowl of apples and doors open to a garden patio.",
    },
    "Activities and classes": {
      label: "AI image, no people: art studio with easels and half-finished watercolor landscapes, tall windows",
      fill: "#FFE1ED",
      file: "heritage-activities.webp",
      source: "ai",
      alt: "Illustrative concept of an art studio with easels holding watercolor landscapes, lit by tall windows.",
    },
    "Pet-friendly homes": {
      label: "AI image, no people or animals: small fenced dog run in a courtyard, bench with a leash and a ball",
      fill: "#ECE7FC",
      file: "heritage-pets.webp",
      source: "ai",
      alt: "Illustrative concept of a small fenced dog run in a garden courtyard, with a leash and a ball resting on a bench.",
    },
  },
};

export function getPlaceImage(district: DistrictKey, placeName: string): PlaceImage | undefined {
  return placeImages[district]?.[placeName];
}

/** The Plan's "A different kind of retirement" pillars (docs/14, 8.2, slots V1–V3). Alt texts are drafts. */
export const visionImages = {
  home: {
    label: "AI image, no people: single-storey cottage with a deep porch, two rocking chairs, a level path to the door, morning light",
    fill: "#FFE6CC",
    file: "vision-home.webp",
    source: "ai",
    alt: "Illustrative concept of a single-storey cottage with a deep porch, two rocking chairs and a level path to the door.",
  },
  care: {
    label: "Licensed stock with people: senior couple walking a sunny garden path; no hospital or clinical scenes",
    fill: "#EAF6CF",
    file: "vision-care.webp",
    source: "stock",
    alt: "An older couple walking together on a sunny garden path.",
  },
  technology: {
    label: "AI image, no people: bright cottage living room, small tablet on a side table, soft hallway night lighting, view to golden hills",
    fill: "#EAF6FD",
    file: "vision-technology.webp",
    source: "ai",
    alt: "Illustrative concept of a bright cottage living room with a small tablet on a side table and an armchair by a window to golden hills.",
  },
} satisfies Record<string, PlaceImage>;
