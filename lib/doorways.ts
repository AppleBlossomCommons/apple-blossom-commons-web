import type { Doorway } from "@/components/site/DoorwayCards";

/**
 * The two conversation doorways that end each page of The Plan (critique, Nov 20, 2026: every page
 * ends at Participate or Partner, per Product Principle 5). Same copy as the Home doorways, no photos.
 * Kept out of DoorwayCards.tsx because that is a client module, and server pages can't read its data.
 */
export const talkDoorways: Doorway[] = [
  {
    href: "/participate",
    title: "Have a say.",
    text: "Learn how the plan is reviewed and share your views.",
    cta: "How Can I Participate?",
    fill: "#DDF1FC",
  },
  {
    href: "/partners",
    title: "Build with us.",
    text: "Explore investment and development opportunities.",
    cta: "Partner with Us",
    fill: "#FFE1ED",
  },
];
