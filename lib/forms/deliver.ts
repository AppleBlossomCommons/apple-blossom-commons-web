/**
 * Where form submissions go (server only: imported by app/participate/actions.ts).
 *
 * docs/10-content-v2.md ("Forms"): every form sends to the two addresses below and stores the
 * submission. docs/07 says to ask the owner which email and storage service to use before
 * wiring one in, so delivery is NOT CONNECTED YET:
 * - In development, each submission is printed to the server log and appended to
 *   .data/form-submissions.jsonl (git-ignored), so the forms can be tried end to end.
 * - In production, `deliver` fails until a service is connected, and the form tells the
 *   visitor it couldn't be sent. It never pretends a message went out.
 *
 * To connect a service later, replace the production branch of `deliver` (and keep any key in
 * .env.local, never in code).
 */
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/** The addresses every form sends to (content pack, "Forms"). */
export const FORM_RECIPIENTS = ["andyhyeung@gmail.com", "appleblossomcommons@gmail.com"] as const;

export type Submission = {
  form: "feedback" | "update-list";
  receivedAt: string;
  fields: Record<string, string | string[] | boolean>;
};

export class DeliveryNotConfigured extends Error {}

export async function deliver(submission: Submission) {
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "form-submissions.jsonl"), JSON.stringify(submission) + "\n", "utf8");
    console.info(`[forms] ${submission.form} submission (dev only, not emailed to ${FORM_RECIPIENTS.join(", ")}):`, submission.fields);
    return;
  }
  throw new DeliveryNotConfigured("No email or storage service is connected for the forms yet.");
}

// Best-effort rate limit: at most 5 submissions per visitor per 10 minutes. It lives in server
// memory, so it resets when a server instance restarts; a shared store can replace it with the
// delivery service.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const recent = new Map<string, number[]>();

/** True when this visitor may submit again; records the attempt. */
export function allowSubmission(visitor: string) {
  const now = Date.now();
  const times = (recent.get(visitor) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= LIMIT) {
    recent.set(visitor, times);
    return false;
  }
  times.push(now);
  recent.set(visitor, times);
  return true;
}
