import type { ReactNode } from "react";

/**
 * One question in an FAQ accordion: a native <details> disclosure, so it works with the keyboard
 * and without JavaScript. The + turns into × when open (200ms; instant with reduced motion).
 * Used by the Participate FAQs and the Life Plan questions on The Plan.
 */
export function FaqItem({ question, children, open = false }: { question: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-3.5 py-3 text-lg font-bold leading-[1.35] sm:min-h-[68px] sm:gap-5 sm:text-xl [&::-webkit-details-marker]:hidden">
        {question}
        <span
          aria-hidden="true"
          className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-linen text-2xl font-normal transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none"
        >
          +
        </span>
      </summary>
      <p className="max-w-[820px] pb-5 sm:pb-6 sm:pr-16">{children}</p>
    </details>
  );
}
