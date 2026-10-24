/**
 * Button looks for <Link> and <button>, all fully rounded (Phase 1 handoff, "Shape and spacing").
 * primary: gold fill, hearth text. secondary: 1.5px hearth outline, transparent.
 * linen: the light pill used on photos and in the hero ("Take the site tour").
 * onPhoto: an outline button on a photo or video (white outline and text).
 */
const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-bold no-underline transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]";

const variants = {
  primary: "bg-gold text-hearth hover:bg-gold-hover hover:text-hearth",
  secondary: "border-[1.5px] border-hearth text-hearth hover:bg-sand hover:text-hearth",
  linen: "bg-linen text-hearth hover:bg-sand hover:text-hearth",
  onPhoto: "border-[1.5px] border-white text-white hover:bg-white/10 hover:text-white",
} as const;

const sizes = {
  /** Header and chips, 44px. */
  sm: "h-11 px-[22px] text-[1.0625rem]",
  /** Secondary actions, 48px. */
  md: "h-12 px-[22px] text-[1.0625rem]",
  /** Hero and calls to action, 56px. */
  lg: "h-14 px-7 text-[1.125rem]",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "lg") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
