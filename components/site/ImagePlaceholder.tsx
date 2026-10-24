/**
 * TEMPORARY image area: a shaded gradient with a label saying what goes there
 * (Phase 1 handoff, "Image areas are labeled placeholders"). Replace each one with the
 * licensed or generated image from the Imagery plan in docs/10-content-v2.md before launch.
 * The label is a note for reviewers, so screen readers skip it.
 */
export function PlaceholderImage({ gradient, className = "" }: { gradient: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: `repeating-linear-gradient(135deg, rgb(255 255 255 / 0.07) 0 2px, rgb(255 255 255 / 0) 2px 16px), ${gradient}`,
      }}
    />
  );
}

export function PlaceholderLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute left-4 top-4 max-w-[calc(100%-32px)] rounded-[14px] bg-label px-3 py-1.5 text-[13px] font-medium leading-[1.35] text-hearth ${className}`}
    >
      {children}
    </span>
  );
}
