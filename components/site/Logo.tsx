/**
 * TEMPORARY logo mark: the five-petal outline from the approved homepage mockup.
 * No logo exists yet (docs/01-project-brief.md). Replace the drawing here and it
 * changes everywhere the mark appears.
 */
export function Logo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" className={`shrink-0 text-sage-deep ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth={size < 26 ? 1.7 : 1.6}>
        <circle cx="14" cy="6.5" r="4" />
        <circle cx="21.1" cy="11.7" r="4" />
        <circle cx="18.4" cy="20.1" r="4" />
        <circle cx="9.6" cy="20.1" r="4" />
        <circle cx="6.9" cy="11.7" r="4" />
      </g>
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
    </svg>
  );
}
