import type { ComponentProps } from "react";

/**
 * TEMPORARY image area: one flat pale color with a label saying what goes there
 * (Phase 1 handoff, "Image areas are labeled placeholders"). Replace each one with the
 * licensed or generated image from the Imagery plan in docs/10-content-v2.md before launch.
 * The label is a note for reviewers, so screen readers skip it.
 */
export function PlaceholderImage({ fill, style, ...rest }: { fill: string } & ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      {...rest}
      style={{
        background: fill,
        ...style,
      }}
    />
  );
}

/** `inset` is the gap to the top-left corner in px: 16 by default, 14 on small tiles, 20 on the tour still. */
export function PlaceholderLabel({ inset = 16, className = "", style, ...rest }: { inset?: number } & ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{ left: inset, top: inset, maxWidth: `calc(100% - ${inset * 2}px)`, ...style }}
      className={`absolute w-fit rounded-[14px] bg-label px-3 py-1.5 text-[13px] font-medium leading-[1.35] text-hearth ${className}`}
    />
  );
}
