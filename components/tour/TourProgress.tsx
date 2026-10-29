"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { fmt } from "@/lib/tour-core";
import type { Landmark } from "@/lib/tours";

const pct = (x: number) => `${Math.max(0, Math.min(1, x)) * 100}%`;

/**
 * The clip's progress bar (docs/13 §7, §10): a keyboard slider (←/→ 5 seconds, PageUp/PageDown
 * 10%, Home/End) that also seeks on click and drag. Ticks mark the landmarks.
 */
export function TourProgress({
  time,
  duration,
  landmarks,
  onSeek,
}: {
  time: number;
  duration: number;
  landmarks: Landmark[];
  onSeek: (t: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const seekTo = (clientX: number) => {
    const r = railRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    onSeek(((clientX - r.left) / r.width) * duration);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) seekTo(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -duration / 10, PageUp: duration / 10 }[e.key];
    if (step !== undefined) onSeek(time + step);
    else if (e.key === "Home") onSeek(0);
    else if (e.key === "End") onSeek(duration);
    else return;
    e.preventDefault();
  };

  const at = duration > 0 ? time / duration : 0;

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Video position"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(Math.min(time, duration))}
      aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative h-11 min-w-0 flex-1 cursor-pointer touch-none select-none rounded-full"
    >
      <div ref={railRef} className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-line">
        <div className="absolute inset-y-0 left-0 rounded-full bg-hearth" style={{ width: pct(at) }} />
        {duration > 0 &&
          landmarks.map((l) => (
            <span
              key={`${l.t}-${l.label}`}
              aria-hidden="true"
              className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hearth/60"
              style={{ left: pct(l.t / duration) }}
            />
          ))}
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-hearth bg-linen"
          style={{ left: pct(at) }}
        />
      </div>
    </div>
  );
}
