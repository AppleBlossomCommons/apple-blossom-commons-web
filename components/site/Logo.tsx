/**
 * TEMPORARY logo mark: the five-petal outline from the approved homepage mockup.
 * No logo exists yet (docs/01-project-brief.md). Replace the drawing here and it
 * changes everywhere the mark appears.
 */
export function Logo({
  size = 28,
  strokeWidth,
  petalAttr = false,
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  /** Marks each circle with data-petal so the Home loader can animate them one by one. */
  petalAttr?: boolean;
  className?: string;
}) {
  const petal = petalAttr ? { "data-petal": "", style: { transformBox: "fill-box", transformOrigin: "center" } as const } : {};
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" className={`shrink-0 text-sage-deep ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth ?? (size < 26 ? 1.7 : 1.6)}>
        <circle cx="14" cy="6.5" r="4" {...petal} />
        <circle cx="21.1" cy="11.7" r="4" {...petal} />
        <circle cx="18.4" cy="20.1" r="4" {...petal} />
        <circle cx="9.6" cy="20.1" r="4" {...petal} />
        <circle cx="6.9" cy="11.7" r="4" {...petal} />
      </g>
      <circle cx="14" cy="14" r="2.2" fill="currentColor" {...petal} />
    </svg>
  );
}
