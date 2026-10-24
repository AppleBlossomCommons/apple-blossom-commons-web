"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitFeedback } from "@/app/participate/actions";
import { buttonClass } from "@/components/site/buttons";
import { FEEDBACK_TOPICS, PRIVACY_LINE, type FormState } from "@/lib/forms/options";
import { Checkbox, Field, fieldClass, Honeypot, Sent } from "./fields";

/** "Get in touch" (community groups) sends this event to preset the topic. */
export const FEEDBACK_TOPIC_EVENT = "abc:feedback-topic";

const initial: FormState = { status: "idle" };

/**
 * Feedback form (content pack, "Forms" 2). Only the comments are required. On an error the
 * first field with a problem takes focus; once sent, the confirmation replaces the form.
 */
export function FeedbackForm() {
  const [state, action, pending] = useActionState(submitFeedback, initial);
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState<string>(FEEDBACK_TOPICS[0]);

  // Preset the topic from "Get in touch".
  useEffect(() => {
    const onTopic = (e: Event) => setTopic((e as CustomEvent<string>).detail);
    window.addEventListener(FEEDBACK_TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(FEEDBACK_TOPIC_EVENT, onTopic);
  }, []);

  useEffect(() => {
    if (state.status === "invalid") form.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    if (state.status === "sent") done.current?.querySelector<HTMLElement>("[data-sent]")?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={done}>
        <Sent>Thank you for sharing your views. Every comment is read.</Sent>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" || state.status === "failed" ? state.values : {};
  const v = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");
  const invalid = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `fb-${name}-error` } : {});

  return (
    <form ref={form} action={action} aria-label="Feedback" noValidate className="relative flex flex-col gap-5 sm:gap-[22px]">
      <p className="text-[15px] text-muted sm:text-base">* Required</p>
      <div className="grid items-end gap-4 sm:grid-cols-2">
        <Field id="fb-name" label="Name" note="optional">
          <input id="fb-name" name="name" type="text" autoComplete="name" defaultValue={v("name")} className={`h-[52px] ${fieldClass}`} />
        </Field>
        <Field id="fb-email" label="Email" note="optional, needed for a reply" error={errors.email}>
          <input
            id="fb-email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            defaultValue={v("email")}
            className={`h-[52px] ${fieldClass}`}
            {...invalid("email")}
          />
        </Field>
      </div>
      <Field id="fb-topic" label="Topic">
        <select id="fb-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={`h-[52px] ${fieldClass}`}>
          {FEEDBACK_TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="fb-comments" label="Your comments" required error={errors.comments}>
        <textarea
          id="fb-comments"
          name="comments"
          required
          rows={6}
          defaultValue={v("comments")}
          className={`resize-y py-3 leading-normal ${fieldClass}`}
          {...invalid("comments")}
        />
      </Field>
      <Checkbox name="updates" label="Add me to the update list" defaultChecked={v("updates") === "yes"} />
      <Honeypot />
      {state.status === "failed" && (
        <p role="alert" className="font-bold">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className={`self-start disabled:opacity-60 ${buttonClass("primary", "lg")}`}>
        {pending ? "Sending…" : "Send feedback"}
      </button>
      <p className="text-[15px] text-muted sm:text-base">{PRIVACY_LINE}</p>
    </form>
  );
}
