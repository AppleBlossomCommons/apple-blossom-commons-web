"use client";

import { buttonClass } from "@/components/site/buttons";
import { JumpLink } from "@/components/site/JumpLink";
import { FEEDBACK_TOPIC_EVENT } from "./FeedbackForm";

/**
 * "Get in touch" for community groups: glides to the feedback form with the topic set to
 * "Community group", then puts the cursor in the comments box.
 */
export function GetInTouch() {
  return (
    <JumpLink
      href="#feedback"
      onJump={() => window.dispatchEvent(new CustomEvent(FEEDBACK_TOPIC_EVENT, { detail: "Community group" }))}
      focusTarget={() => document.getElementById("fb-comments")}
      className={`mt-1 w-full sm:mt-2 sm:w-auto sm:self-start ${buttonClass("outline", "tall")}`}
    >
      Get in touch
    </JumpLink>
  );
}
