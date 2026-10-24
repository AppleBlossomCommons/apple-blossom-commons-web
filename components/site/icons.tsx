type IconProps = { className?: string };

export function ArrowRight({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DragHandle({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M7.5 5.5 3 10l4.5 4.5M12.5 5.5 17 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NorthArrow({ className = "size-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 3 16 19l-4-3-4 3 4-16Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M12 3v13l-4 3 4-16Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronRight({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
