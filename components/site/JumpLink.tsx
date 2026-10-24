"use client";

import type { ComponentProps } from "react";
import { jumpTo } from "@/lib/smooth-scroll";

/**
 * A link to a section on the same page (#id) that glides there instead of jumping
 * (lib/smooth-scroll.ts). New-tab and modified clicks behave as normal links.
 */
export function JumpLink({
  href,
  onJump,
  focusTarget,
  ...props
}: ComponentProps<"a"> & {
  href: `#${string}`;
  /** Runs as the glide starts. */
  onJump?: () => void;
  /** What gets focus on landing (the target section by default). */
  focusTarget?: () => HTMLElement | null;
}) {
  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onJump?.();
        void jumpTo(href, focusTarget);
      }}
    />
  );
}
