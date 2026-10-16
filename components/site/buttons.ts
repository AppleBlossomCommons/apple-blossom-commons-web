/**
 * Button looks from the approved homepage mockup, for use on <Link> and <button>.
 * primary: Orchard Green fill. secondary: outlined on paper. light: paper fill on basalt.
 */
const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[6px] font-semibold no-underline transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]";

const variants = {
  primary: "bg-green text-on-green hover:bg-green-hover hover:text-on-green",
  secondary: "border border-rule-strong text-ink hover:border-ink-3 hover:bg-surface hover:text-ink",
  light: "bg-on-basalt text-basalt hover:bg-white hover:text-basalt",
} as const;

const sizes = {
  /** Header button, 40px. */
  sm: "h-10 px-[18px] text-[0.9375rem]",
  /** Tour button, 48px. */
  md: "h-12 px-[22px]",
  /** Hero and CTA buttons, 50px on phones and 52px above. */
  lg: "h-[50px] px-6 sm:h-[52px]",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "lg") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
