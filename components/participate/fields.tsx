import type { ReactNode } from "react";
import { HONEYPOT_FIELD } from "@/lib/forms/options";

/**
 * Form field styles from the handoff: 52px fields with a 1.5px Muted border (3:1 against the
 * ground), a hearth border and a gold ring on focus, and errors written out under the field.
 */
export const fieldClass =
  "w-full rounded-chip border-[1.5px] border-muted bg-[#FFFDF9] px-3.5 text-lg text-hearth outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-hearth focus-visible:shadow-[0_0_0_3px_var(--gold)] aria-[invalid=true]:border-rose";

export function Field({
  id,
  label,
  note,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  note?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {note && <span className="font-normal text-muted"> ({note})</span>}
      </label>
      {children}
      {error && (
        // Hearth text (rose is for large accents only); the rose marker and border flag it.
        <p id={`${id}-error`} className="flex items-start gap-2 text-base font-bold">
          <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 rounded-full bg-rose" />
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox({ name, value, label, defaultChecked }: { name: string; value?: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3">
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="m-0 size-[22px] shrink-0 accent-sage-deep" />
      <span>{label}</span>
    </label>
  );
}

/** Invisible to people and screen readers; bots tend to fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Company
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** The confirmation that replaces a form once it is sent. */
export function Sent({ children }: { children: ReactNode }) {
  return (
    <div role="status" tabIndex={-1} className="flex min-h-[260px] flex-col justify-center gap-4 outline-none sm:min-h-[360px]" data-sent>
      <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-lime text-[26px] font-bold text-hearth">
        ✓
      </span>
      <p className="max-w-[460px] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">{children}</p>
    </div>
  );
}
