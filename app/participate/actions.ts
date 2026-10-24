"use server";

import { headers } from "next/headers";
import { allowSubmission, deliver, DeliveryNotConfigured, type Submission } from "@/lib/forms/deliver";
import {
  FEEDBACK_TOPICS,
  HONEYPOT_FIELD,
  UPDATE_LIST_INTERESTS,
  UPDATE_LIST_ROLES,
  type FormState,
} from "@/lib/forms/options";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (data: FormData, name: string, max = 200) => String(data.get(name) ?? "").trim().slice(0, max);

/** One of the allowed choices, or the first one if something else came back. */
const pick = <T extends readonly string[]>(value: string, options: T): T[number] => ((options as readonly string[]).includes(value) ? value : options[0]);

async function visitorId() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/**
 * Shared checks for every form: the honeypot (a bot filled the hidden field: report success and
 * drop it), the rate limit, then delivery.
 */
async function send(data: FormData, submission: Submission, values: Record<string, string | string[]>): Promise<FormState> {
  if (text(data, HONEYPOT_FIELD)) return { status: "sent" };
  if (!allowSubmission(await visitorId())) {
    return { status: "failed", message: "You've sent a few messages in a short time. Please wait a few minutes and try again.", values };
  }
  try {
    await deliver(submission);
    return { status: "sent" };
  } catch (error) {
    if (!(error instanceof DeliveryNotConfigured)) console.error("[forms] delivery failed", error);
    return { status: "failed", message: "Sorry, we couldn't send this right now. Please try again later.", values };
  }
}

/** Feedback form (/participate#neighbors). Only the comments are required. */
export async function submitFeedback(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: text(data, "name", 120),
    email: text(data, "email", 200),
    topic: pick(text(data, "topic"), FEEDBACK_TOPICS),
    comments: text(data, "comments", 5000),
    updates: data.get("updates") ? "yes" : "",
  };
  const errors: Record<string, string> = {};
  if (!values.comments) errors.comments = "Please add your comments.";
  if (values.email && !EMAIL.test(values.email)) errors.email = "Please check the email address, for example name@example.com.";
  if (values.updates && !values.email) errors.email = "Add your email so we can send you updates.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  return send(
    data,
    {
      form: "feedback",
      receivedAt: new Date().toISOString(),
      fields: { ...values, updates: Boolean(values.updates) },
    },
    values,
  );
}

/** Update list form (/participate#update-list). Name and email are required. */
export async function joinUpdateList(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: text(data, "name", 120),
    email: text(data, "email", 200),
    role: pick(text(data, "role"), UPDATE_LIST_ROLES),
    interests: data.getAll("interests").map(String).filter((i) => (UPDATE_LIST_INTERESTS as readonly string[]).includes(i)),
  };
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please add your name.";
  if (!values.email) errors.email = "Please add your email.";
  else if (!EMAIL.test(values.email)) errors.email = "Please check the email address, for example name@example.com.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  return send(data, { form: "update-list", receivedAt: new Date().toISOString(), fields: values }, values);
}
