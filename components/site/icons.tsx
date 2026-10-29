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

export function ChevronLeft({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path d="M9 3 5 7l4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Play({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <path d="M6.5 4.2v11.6a.6.6 0 0 0 .9.5l9.2-5.8a.6.6 0 0 0 0-1L7.4 3.7a.6.6 0 0 0-.9.5Z" fill="currentColor" />
    </svg>
  );
}

export function Pause({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <rect x="5" y="4" width="3.5" height="12" rx="0.8" fill="currentColor" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="0.8" fill="currentColor" />
    </svg>
  );
}

export function Expand({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M3.5 7.5v-4h4M16.5 7.5v-4h-4M3.5 12.5v4h4M16.5 12.5v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Collapse({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M7.5 3.5v4h-4M12.5 3.5v4h4M7.5 16.5v-4h-4M12.5 16.5v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
