import Link from "next/link";

/** Phase 0 stand-in for pages whose layout and copy are approved later (docs/08-build-plan.md). */
export function PagePlaceholder({ title, purpose }: { title: string; purpose: string }) {
  return (
    <section className="mx-auto max-w-[1360px] px-6 py-24 lg:px-10 lg:py-32">
      <h1 className="max-w-[18ch] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">{title}</h1>
      <p className="mt-6 max-w-[58ch] text-muted">{purpose}</p>
      <p className="mt-10 pt-5 font-mono text-[0.75rem] text-muted">
        This page is being prepared. <Link href="/" className="text-lake-deep">Return home</Link>
      </p>
    </section>
  );
}
