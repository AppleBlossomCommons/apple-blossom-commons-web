import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage, PlaceholderLabel } from "@/components/site/ImagePlaceholder";
import { CONCEPT_NOTE, splitConcept, type Place } from "@/lib/districts";
import type { PlaceImage } from "@/lib/place-images";

/** A place's text. A trailing "(concept)" is shown as a muted word instead of in brackets (docs/11, 2.1). */
export function ConceptText({ text }: { text: string }) {
  const parts = splitConcept(text);
  return (
    <>
      {parts.text}
      {parts.concept && (
        <>
          {" "}
          <span className="text-muted">Concept</span>
        </>
      )}
    </>
  );
}

/** The concept note under every section that names masterplan places (docs/11, 1.9). */
export function ConceptNote({ className = "" }: { className?: string }) {
  return <p className={`max-w-[640px] text-base text-muted ${className}`}>{CONCEPT_NOTE}</p>;
}

/**
 * One named place: an optional image area, then the name and a line or two of text, then any
 * children (such as a link). Rendered as a list item, so wrap a group of them in a <ul>.
 */
export function PlaceCard({
  place,
  image,
  index = 0,
  className = "",
  children,
}: {
  place: Place;
  image?: PlaceImage;
  index?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal as="li" kind="card" index={index} className={`flex flex-col gap-2 ${image ? "" : "border-t border-line pt-5"} ${className}`}>
      {image && (
        <div className="relative mb-3 aspect-[3/2] overflow-hidden rounded-card">
          <PlaceholderImage fill={image.fill} className="absolute inset-0" />
          <PlaceholderLabel inset={14}>{image.label}</PlaceholderLabel>
        </div>
      )}
      <h3 className="text-[23px] leading-[1.1] tracking-[-0.015em] sm:text-[26px]">{place.name}</h3>
      <p className="max-w-[560px]">
        <ConceptText text={place.text} />
      </p>
      {children}
    </Reveal>
  );
}
