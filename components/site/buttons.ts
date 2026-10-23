/**
 * Button looks (warm palette v1, docs/04), for use on <Link> and <button>. All fully rounded.
 * primary: gold fill, hearth text. secondary: 1.5px hearth outline, transparent.
 * onPhoto: the secondary button when it sits on a photo or video (white outline and text).
 */
const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold no-underline transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]";

const variants = {
  primary: "bg-gold text-hearth hover:bg-gold-hover hover:text-hearth",
  secondary: "border-[1.5px] border-hearth text-hearth hover:bg-sand hover:text-hearth",
  onPhoto: "border-[1.5px] border-white text-white hover:bg-white/10 hover:text-white",
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
