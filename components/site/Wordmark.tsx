import Link from "next/link";

/**
 * TEMPORARY wordmark. No logo exists yet (docs/01-project-brief.md);
 * this typographic placeholder in Source Serif 4 is replaced once one is approved.
 */
export function Wordmark({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <Link
      href="/"
      className={`font-serif text-[1.25rem] font-semibold leading-none tracking-[-0.01em] no-underline ${
        tone === "paper" ? "text-[#f5f3ed]" : "text-ink"
      }`}
    >
      Apple Blossom Commons
    </Link>
  );
}
