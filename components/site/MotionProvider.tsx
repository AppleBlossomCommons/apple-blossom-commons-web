"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide motion settings. reducedMotion="user" makes motion/react skip transform and
 * layout animation when the visitor has "reduce motion" turned on. Components that blur
 * or clip also check useReducedMotion() and switch those off themselves.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
