import migration from "@/data/migration-65-69.json";

// Bars use the deep accents: the light lake and sage fall below 3:1 on linen.
const tones = { lake: "bg-lake-deep", green: "bg-sage-deep" } as const;

/** "−10.50%" / "+11.95%", with a true minus sign. */
function formatRate(v: number) {
  return `${v < 0 ? "−" : "+"}${Math.abs(v).toFixed(2)}%`;
}

/**
 * Diverging bar chart of net migration rates, drawn to scale from data/migration-65-69.json.
 * The largest bar fills 70% of its half of the track on desktop and 61% on phones, leaving
 * room for the value label. Values are visible text, so the bars themselves are aria-hidden.
 */
export function MigrationChart() {
  const rows = migration.rows;
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));

  return (
    <figure className="flex min-w-0 flex-col gap-3.5 sm:gap-[18px] sm:rounded-[8px] sm:bg-linen sm:p-7">
      <div className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-y-3.5 rounded-[8px] bg-linen px-3.5 py-[18px] [--fill:0.61] sm:order-2 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-y-[18px] sm:border-0 sm:bg-transparent sm:p-0 sm:[--fill:0.7]">
        {rows.map((r) => {
          const negative = r.value < 0;
          const width = `calc(50% * var(--fill) * ${Math.abs(r.value) / max})`;
          return (
            <div key={r.id} className="contents">
              <span className="text-[0.875rem] sm:text-[0.9375rem]">
                <span className="sm:hidden">{r.labelShort}</span>
                <span className="hidden sm:inline">{r.label}</span>
              </span>
              <div className="relative h-7 sm:h-[34px]">
                <div aria-hidden="true" className="absolute -bottom-1.5 -top-1.5 left-1/2 w-px bg-muted sm:-bottom-2 sm:-top-2" />
                <div
                  aria-hidden="true"
                  className={`absolute top-0 h-full ${tones[r.tone as keyof typeof tones]} ${
                    negative ? "right-1/2 sm:rounded-l-[3px]" : "left-1/2 sm:rounded-r-[3px]"
                  }`}
                  style={{ width }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 font-mono text-[0.75rem] font-medium tabular sm:text-[0.875rem] ${
                    negative ? "left-0 sm:left-auto sm:right-[calc(50%+8px+var(--w))]" : "right-0 sm:right-auto sm:left-[calc(50%+8px+var(--w))]"
                  }`}
                  style={{ ["--w" as string]: width }}
                >
                  {formatRate(r.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="font-mono text-[0.65625rem] font-medium leading-[1.5] text-muted sm:order-1 sm:font-sans sm:text-[0.9375rem] sm:font-semibold sm:text-hearth">
        <span className="hidden sm:inline">{migration.title}</span>
        <span className="sm:hidden">
          {migration.titleShort}. {migration.caveatShort}
        </span>
      </figcaption>
    </figure>
  );
}
