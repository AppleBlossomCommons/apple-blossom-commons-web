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
 * 3. Set `ready: true` on that slot. The card then shows the photo. AI images no longer get an
 *    "Illustrative concept" label on the picture (owner decision, Nov 22, 2026); start their alt
 *    text with "Illustrative concept of …" instead.
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
  /** "ai" = AI image (alt text starts "Illustrative concept of …"); "stock" = licensed, people OK. */
  source?: "ai" | "stock";
  /** Set to true once the file is in public/images/plan/. */
  ready?: boolean;
};

/** Folder the slot files live in. */
export const PLAN_IMAGE_DIR = "/images/plan";

const placeImages: Partial<Record<DistrictKey, Record<string, PlaceImage>>> = {
  // The village at the center (docs/14, 8.1). Alt texts from the pack, rewritten to match the pictures.
  // These five AI images show a few people, against the docs/14 no-people rule. The owner chose to
  // publish them for now (Nov 13, 2026); see docs/09-open-items.md. Upscaled from 1264 × 848.
  wine: {
    "Harvest Square": {
      label: "AI image: small plaza at golden hour, low round fountain, fire pits, timber-and-stone pavilions",
      fill: "#FFF2B3",
      file: "village-harvest-square.webp",
      source: "ai",
      alt: "Illustrative concept of Harvest Square: a stone plaza with a round fountain and fire pits, where a couple sits by the fire and a woman walks past, framed by low timber pavilions and golden hills.",
      ready: true,
    },
    "Vintner's Walk": {
      label: "AI image: quiet lane between low timber-and-stone storefronts, string lights, café tables, early morning",
      fill: "#FFE1ED",
      file: "village-vintners-walk.webp",
      source: "ai",
      alt: "Illustrative concept of Vintner's Walk: an older couple with coffee cups strolls a quiet lane of timber and stone shopfronts with café tables, planters and string lights.",
      ready: true,
    },
    "The Tasting Courtyard": {
      label: "AI image: small courtyard of tasting rooms, long table, vines overhead",
      fill: "#ECE7FC",
      file: "village-tasting-courtyard.webp",
      source: "ai",
      alt: "Illustrative concept of the Tasting Courtyard: small tasting rooms around a long table under a vine-covered pergola, where a host pours wine for two guests, with the lake in the distance.",
      ready: true,
    },
    "Market Hall": {
      label: "AI image: open-sided timber market hall, doors rolled up, produce crates and flowers, late-afternoon light",
      fill: "#EAF6CF",
      file: "village-market-hall.webp",
      source: "ai",
      alt: "Illustrative concept of Market Hall: an open timber hall with tables of fruit, vegetables, bread and flowers, where a vendor helps a shopper, doors rolled up to a terrace.",
      ready: true,
    },
    "The Barrel House": {
      label: "AI image: warm timber hall with stacked oak barrels, glass doors open to a terrace with fire pits",
      fill: "#FFE6CC",
      file: "village-barrel-house.webp",
      source: "ai",
      alt: "Illustrative concept of the Barrel House: a tall timber winery hall at dusk with oak barrels and steel tanks inside, and a couple seated by a fire pit on the terrace.",
      ready: true,
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
    // Assisted living, memory care and nursing care: AI images with people, generated in Gemini
    // (owner decision, Nov 22, 2026), in place of the licensed stock docs/14 planned. Same rule as
    // the village images; see docs/09-open-items.md. Upscaled from 1264 × 848; originals in
    // reference/plan-image-originals/.
    "Assisted living": {
      label: "AI image: caregiver and older woman sharing tea in a modern timber-beamed living room",
      fill: "#FFE1ED",
      file: "heritage-assisted.webp",
      source: "ai",
      alt: "Illustrative concept of assisted living: a caregiver hands an older woman a cup of tea and they laugh together in a bright timber-beamed living room with a stone fireplace and tall windows to pines and golden hills.",
      ready: true,
    },
    "Memory care": {
      label: "AI image: older man and caregiver looking through a photo album on a sofa, garden door behind",
      fill: "#ECE7FC",
      file: "heritage-memory-care.webp",
      source: "ai",
      alt: "Illustrative concept of memory care: an older man points to a photo in an album as a caregiver listens beside him on the sofa, with family photos on a shelf and a glass door open to a garden path.",
      ready: true,
    },
    "Nursing care": {
      label: "AI image: nurse kneeling beside an older woman in an armchair, residential bedroom, garden window",
      fill: "#EAF6CF",
      file: "heritage-nursing.webp",
      source: "ai",
      alt: "Illustrative concept of nursing care: a nurse kneels beside an older woman in an armchair by a large window, holding her hand, in a bedroom with a quilted bed, wildflowers and a view of a garden and pines.",
      ready: true,
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
      // Stock photo. Source and license still to record (docs/14, 8.3).
      label: "Licensed stock with people: older couple boxing with gloves and pads in a gym",
      fill: "#EAF6FD",
      file: "heritage-fitness.webp",
      source: "stock",
      alt: "An older woman in boxing gloves smiles as she spars with an older man holding training pads in a brick-walled gym.",
      ready: true,
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
      // Stock photo, cropped from a 4000 × 6000 portrait. Source and license still to record (docs/14, 8.3).
      label: "Licensed stock with people: older couple on a porch with two dogs",
      fill: "#ECE7FC",
      file: "heritage-pets.webp",
      source: "stock",
      alt: "An older couple sitting on a porch with their two black dogs.",
      ready: true,
    },
  },
};

export function getPlaceImage(district: DistrictKey, placeName: string): PlaceImage | undefined {
  return placeImages[district]?.[placeName];
}

/**
 * The Plan's "A different kind of retirement" pillars (docs/14, 8.2, slots V1–V3). All three arrived
 * as AI images with people (owner decision to publish, Nov 13, 2026; see docs/09-open-items.md),
 * upscaled from 1264 × 848.
 */
export const visionImages = {
  home: {
    label: "AI image: single-storey cottage with a covered porch, an older couple at a small table, golden hills",
    fill: "#FFE6CC",
    file: "vision-home.webp",
    source: "ai",
    alt: "Illustrative concept of a single-storey cottage: an older couple laughs over coffee at a small table on the covered porch, with lavender and golden hills beyond.",
    ready: true,
  },
  care: {
    label: "AI image: older couple walking a level path toward a timber-and-stone building, benches, pines",
    fill: "#EAF6CF",
    file: "vision-care.webp",
    source: "ai",
    alt: "Illustrative concept of an older couple walking hand in hand along a level gravel path past benches toward a low timber-and-stone building, with pines and golden hills.",
    ready: true,
  },
  technology: {
    // Shows a robot with a face, which docs/14 §10 left out; the owner chose to publish it (Nov 13, 2026).
    label: "AI image: bright cottage living room, a resident with tea beside a care robot, a small shuttle outside",
    fill: "#EAF6FD",
    file: "vision-technology.webp",
    source: "ai",
    alt: "Illustrative concept of a bright cottage living room: an older woman with a cup of tea smiles at a helper robot, while a small shuttle waits outside the window.",
    ready: true,
  },
} satisfies Record<string, PlaceImage>;
