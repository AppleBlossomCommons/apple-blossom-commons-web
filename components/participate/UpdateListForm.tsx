"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinUpdateList } from "@/app/participate/actions";
import { buttonClass } from "@/components/site/buttons";
import { PRIVACY_LINE, UPDATE_LIST_INTERESTS, UPDATE_LIST_ROLES, type FormState } from "@/lib/forms/options";
import { Checkbox, Field, fieldClass, Honeypot, Sent } from "./fields";

const initial: FormState = { status: "idle" };

/** Update list form (content pack, "Forms" 3). Name and email are required. */
export function UpdateListForm() {
  const [state, action, pending] = useActionState(joinUpdateList, initial);
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "invalid") form.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    if (state.status === "sent") done.current?.querySelector<HTMLElement>("[data-sent]")?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={done}>
        <Sent>You&apos;re on the list. We&apos;ll be in touch as plans take shape.</Sent>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" || state.status === "failed" ? state.values : {};
  const v = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");
  const chosen = Array.isArray(values.interests) ? values.interests : [];
  const invalid = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `up-${name}-error` } : {});

  return (
    <form ref={form} action={action} aria-label="Update list" noValidate className="relative flex flex-col gap-5 sm:gap-[22px]">
      <p className="text-[15px] text-muted sm:text-base">* Required</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="up-name" label="Name" required error={errors.name}>
          <input
            id="up-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v("name")}
            className={`h-[52px] ${fieldClass}`}
            {...invalid("name")}
          />
        </Field>
        <Field id="up-email" label="Email" required error={errors.email}>
          <input
            id="up-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            defaultValue={v("email")}
            className={`h-[52px] ${fieldClass}`}
            {...invalid("email")}
          />
        </Field>
      </div>
      <Field id="up-role" label="I'm interested as a…">
        <select id="up-role" name="role" defaultValue={v("role") || UPDATE_LIST_ROLES[0]} className={`h-[52px] ${fieldClass}`}>
          {UPDATE_LIST_ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Field>
      <fieldset className="flex flex-col gap-0.5">
        <legend className="mb-1.5 font-bold">
          Interested in <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="grid gap-x-4 sm:grid-cols-2">
          {UPDATE_LIST_INTERESTS.map((i) => (
            <Checkbox key={i} name="interests" value={i} label={i} defaultChecked={chosen.includes(i)} />
          ))}
        </div>
      </fieldset>
      <Honeypot />
      {state.status === "failed" && (
        <p role="alert" className="font-bold">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className={`self-start disabled:opacity-60 ${buttonClass("primary", "lg")}`}>
        {pending ? "Sending…" : "Join the update list"}
      </button>
      <p className="text-[15px] text-muted sm:text-base">{PRIVACY_LINE}</p>
    </form>
  );
}
