/**
 * Colors for image cards that carry white text (docs/04-design-direction.md, rule 3).
 *
 * White text needs a deep enough color behind it: 3:1 for large headlines and 4.5:1 for normal
 * text (WCAG AA). `whiteTextShade` finds the lightest, most saturated shade of a color that still
 * reaches a contrast target with white, so cards stay as bright as the rule allows. It keeps the
 * color's hue (in the OKLCH color space) and only lowers its lightness, trimming saturation just
 * enough to stay a real screen color.
 */

type Rgb = [number, number, number];

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const fromLinear = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function hexToRgb(hex: string): Rgb {
  const n = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255) as Rgb;
}

function rgbToHex(rgb: Rgb): string {
  return `#${rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0")).join("")}`;
}

/** sRGB (0–1) to OKLCH [lightness, chroma, hue in radians]. */
function toOklch([r, g, b]: Rgb): [number, number, number] {
  const [lr, lg, lb] = [r, g, b].map(toLinear);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(a, bb), Math.atan2(bb, a)];
}

/** OKLCH to sRGB (0–1), unclamped, so callers can tell when a color falls outside the screen gamut. */
function fromOklch(L: number, C: number, h: number): Rgb {
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(fromLinear) as Rgb;
}

const inGamut = (rgb: Rgb) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);

/** The color at lightness L and hue h with as much of the chroma C as the screen can show. */
function clipChroma(L: number, C: number, h: number): Rgb {
  if (inGamut(fromOklch(L, C, h))) return fromOklch(L, C, h);
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(fromOklch(L, mid, h))) lo = mid;
    else hi = mid;
  }
  return fromOklch(L, lo, h);
}

function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((v) => toLinear(Math.min(1, Math.max(0, v))));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast of white text on this color (WCAG formula). */
export function whiteContrast(hex: string): number {
  return 1.05 / (luminance(hexToRgb(hex)) + 0.05);
}

/**
 * The lightest shade of `hex`, same hue, on which white text reaches `contrast`.
 * `boost` raises the chroma first (2.2 = more than twice as saturated, trimmed to what the screen
 * can show) so the deep shade reads as a clean, vivid color rather than a greyed one.
 */
export function whiteTextShade(hex: string, contrast: number, boost = 2.2): string {
  const [L0, C0, h] = toOklch(hexToRgb(hex));
  const C = C0 * boost;
  let lo = 0;
  let hi = L0;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const rgb = clipChroma(mid, C, h);
    if (1.05 / (luminance(rgb) + 0.05) >= contrast) lo = mid;
    else hi = mid;
  }
  return rgbToHex(clipChroma(lo, C, h));
}

/** `hex` mixed with white; `amount` is the share of white (0–1). */
export function tint(hex: string, amount: number): string {
  return rgbToHex(hexToRgb(hex).map((v) => v + (1 - v) * amount) as Rgb);
}

/** Contrast targets, with a small margin over WCAG AA so the stripes and rounding never tip them under. */
export const LARGE_TEXT = 3.3;
export const BODY_TEXT = 4.7;

/**
 * The card color families. `color` is the light vibrant color (the same as the map); `deep` is the
 * starting point for the deep shades. Lime deepens from a slightly greener lime and orange from a
 * slightly redder one, because a deep yellow-green looks olive and a deep yellow-orange looks brown.
 */
export const CARD = {
  sky: { color: "#9ED8F5", deep: "#9ED8F5" },
  lime: { color: "#CDEB8B", deep: "#B5E39A" },
  orange: { color: "#FFC88F", deep: "#FFB08A" },
  pink: { color: "#FFC4DC", deep: "#FFC4DC" },
  lavender: { color: "#D6CBF7", deep: "#D6CBF7" },
} as const;

export type CardFamily = { color: string; deep: string };

/**
 * A top-to-bottom card gradient for white text: a light tint at the top, the light color, then the
 * large-text shade by the time the headline starts (`large`, % from the top) and the body-text
 * shade by the time the small text starts (`body`). `top` overrides the top color (for example a
 * sunrise pink over a sky-blue card). The direction is straight down so the stops line up with the
 * text exactly.
 */
export function whiteTextGradient(
  { color, deep }: CardFamily,
  { large = 50, body = 72, top, fromBottom = false }: { large?: number; body?: number; top?: string; fromBottom?: boolean } = {},
): string {
  const big = whiteTextShade(deep, LARGE_TEXT);
  const small = whiteTextShade(deep, BODY_TEXT);
  if (fromBottom) {
    // `large` and `body` are px up from the card's bottom edge, where the text is pinned, so the
    // stops follow the text at every card height. On a short card the browser moves a stop that
    // would land above the 18% color stop down to 18%, which only makes the card deeper, never lighter.
    return `linear-gradient(180deg, ${top ?? tint(color, 0.55)} 0%, ${color} 18%, ${big} calc(100% - ${large}px), ${small} calc(100% - ${body}px), ${small} 100%)`;
  }
  return `linear-gradient(180deg, ${top ?? tint(color, 0.55)} 0%, ${color} ${Math.round(large * 0.4)}%, ${big} ${large}%, ${small} ${body}%, ${small} 100%)`;
}

/**
 * The card family whose hue is closest to `hex`. District colors are light shades of these
 * families, so a district hero can find its deep shades from its color alone.
 */
export function nearestFamily(hex: string): CardFamily {
  const [, , h] = toOklch(hexToRgb(hex));
  let best: CardFamily = CARD.sky;
  let bestGap = Infinity;
  for (const family of Object.values(CARD)) {
    const [, , fh] = toOklch(hexToRgb(family.color));
    const gap = Math.abs(Math.atan2(Math.sin(h - fh), Math.cos(h - fh)));
    if (gap < bestGap) {
      bestGap = gap;
      best = family;
    }
  }
  return best;
}

/** A brighter, softer gradient for image areas with no text on them: tint, color, then a mid shade. */
export function softGradient({ color, deep }: CardFamily): string {
  return `linear-gradient(180deg, ${tint(color, 0.55)} 0%, ${color} 45%, ${whiteTextShade(deep, 1.9, 1.3)} 100%)`;
}
